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
  private readonly _onDidChangeTreeData: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();
  readonly onDidChangeTreeData: vscode.Event<void> =
    this._onDidChangeTreeData.event;

  private readonly errorFiles: Set<vscode.Uri> = new Set();
  private readonly warningFiles: Set<vscode.Uri> = new Set();
  private readonly deadCodeFiles: Set<vscode.Uri> = new Set();

  refresh(): void {
    this.errorFiles.clear();
    this.warningFiles.clear();
    this.deadCodeFiles.clear();

    vscode.workspace.textDocuments.forEach((doc) => {
      const diagnostics = vscode.languages.getDiagnostics(doc.uri);


      diagnostics.forEach((d) => {
        if (d.severity === vscode.DiagnosticSeverity.Error) {
          this.errorFiles.add(doc.uri);
        }
        if (d.severity === vscode.DiagnosticSeverity.Warning) {
          this.warningFiles.add(doc.uri);
        }
        if (d.message.includes("is declared but")) {
          this.deadCodeFiles.add(doc.uri);
        }
      });
    });

    this._onDidChangeTreeData.fire();
  }

  clearList(): void {
    this.errorFiles.clear();
    this.warningFiles.clear();
    this.deadCodeFiles.clear();
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

    if (contextValue === "error") {
      this.iconPath = new vscode.ThemeIcon(
        "error",
        new vscode.ThemeColor("errorForeground")
      );
    } else if (contextValue === "warning") {
      this.iconPath = new vscode.ThemeIcon(
        "warning",
        new vscode.ThemeColor("editorWarning.foreground")
      );
    } else if (contextValue === "deadCode") {
      this.iconPath = new vscode.ThemeIcon(
        "warning",
        new vscode.ThemeColor("debugIcon.foreground")
      );
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
