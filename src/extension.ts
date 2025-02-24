import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const provider = new DeadCodeTreeProvider();
  vscode.window.registerTreeDataProvider("deadCodeHunter", provider);

  vscode.languages.onDidChangeDiagnostics(() => provider.refresh());

  context.subscriptions.push(
    vscode.commands.registerCommand("deadCodeHunter.clearList", () =>
      provider.clearList()
    )
  );

  console.log("Dead Code Hunter activated!");
}

export function deactivate() {}

class DeadCodeTreeProvider implements vscode.TreeDataProvider<TreeItem> {
  private _onDidChangeTreeData: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData: vscode.Event<void> =
    this._onDidChangeTreeData.event;

  private errorFiles: Set<vscode.Uri> = new Set();
  private warningFiles: Set<vscode.Uri> = new Set();
  private deadCodeFiles: Set<vscode.Uri> = new Set(); // Tracking dead code files

  refresh(): void {
    this.errorFiles.clear();
    this.warningFiles.clear();
    this.deadCodeFiles.clear(); // Reset dead code files

    vscode.workspace.textDocuments.forEach((doc) => {
      const diagnostics = vscode.languages.getDiagnostics(doc.uri);

      // Check for errors and warnings
      diagnostics.forEach((d) => {
        if (d.severity === vscode.DiagnosticSeverity.Error) {
          this.errorFiles.add(doc.uri);
        }
        if (d.severity === vscode.DiagnosticSeverity.Warning) {
          this.warningFiles.add(doc.uri);
        }

        // Check for unused variables/functions (greyed out code)
        if (d.message.includes("is declared but")) {
          // Heuristic to find unused code
          this.deadCodeFiles.add(doc.uri); // Add to dead code set
        }
      });
    });

    this._onDidChangeTreeData.fire();
  }

  clearList(): void {
    this.errorFiles.clear();
    this.warningFiles.clear();
    this.deadCodeFiles.clear(); // Clear dead code files
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: TreeItem): TreeItem[] {
    if (!element) {
      return [
        new TreeItem(
          "Dead Code",
          vscode.TreeItemCollapsibleState.Expanded,
          "deadCode"
        ),
        new TreeItem(
          "Errors",
          vscode.TreeItemCollapsibleState.Expanded,
          "error"
        ),
        new TreeItem(
          "Warnings",
          vscode.TreeItemCollapsibleState.Expanded,
          "warning"
        ),
        new ClearButton(),
      ];
    }

    if (element.contextValue === "error") {
      return Array.from(this.errorFiles).map(
        (uri) =>
          new TreeItem(
            uri.fsPath,
            vscode.TreeItemCollapsibleState.None,
            "error",
            uri
          )
      );
    } else if (element.contextValue === "warning") {
      return Array.from(this.warningFiles).map(
        (uri) =>
          new TreeItem(
            uri.fsPath,
            vscode.TreeItemCollapsibleState.None,
            "warning",
            uri
          )
      );
    } else if (element.contextValue === "deadCode") {
      return Array.from(this.deadCodeFiles).map(
        (uri) =>
          new TreeItem(
            uri.fsPath,
            vscode.TreeItemCollapsibleState.None,
            "deadCode",
            uri
          )
      );
    }

    return [];
  }
}

class TreeItem extends vscode.TreeItem {
  constructor(
    label: string,
    collapsibleState: vscode.TreeItemCollapsibleState,
    public contextValue: string,
    uri?: vscode.Uri
  ) {
    super(label, collapsibleState);
    if (uri) {
      this.command = {
        command: "vscode.open",
        title: "Open File",
        arguments: [uri],
      };
    }

    // Set the icon for each section (errors, warnings, dead code)
    if (contextValue === "error") {
      this.iconPath = new vscode.ThemeIcon(
        "error",
        new vscode.ThemeColor("errorForeground")
      );
    } else if (contextValue === "warning") {
      this.iconPath = new vscode.ThemeIcon(
        "warning",
        new vscode.ThemeColor("warningForeground")
      );
    } else if (contextValue === "deadCode") {
      this.iconPath = new vscode.ThemeIcon(
        "warning",
        new vscode.ThemeColor("debugIcon.foreground")
      ); // Dead code color
    }
  }
}

class ClearButton extends vscode.TreeItem {
  contextValue: string;

  constructor() {
    super("Clear List", vscode.TreeItemCollapsibleState.None);
    this.command = { command: "deadCodeHunter.clearList", title: "Clear List" };
    this.iconPath = new vscode.ThemeIcon("trash");
    this.contextValue = "clearButton";
  }
}
