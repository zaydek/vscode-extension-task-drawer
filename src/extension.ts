// https://grok.com/chat/009060d2-e59e-4980-9b1b-cc74e35e0fe8

import * as vscode from "vscode";

// Shows tasks from tasks.json in a sidebar with auto-refresh on file change.
export function activate(context: vscode.ExtensionContext) {
  const treeDataProvider = new TaskTreeDataProvider();
  vscode.window.registerTreeDataProvider("taskDrawer", treeDataProvider);

  // Refresh command for manual reload.
  context.subscriptions.push(
    vscode.commands.registerCommand("taskDrawer.refresh", () => {
      treeDataProvider.refresh();
    })
  );

  // Watch for changes to tasks.json and refresh automatically.
  const watcher = vscode.workspace.createFileSystemWatcher("**/.vscode/tasks.json");
  watcher.onDidChange(() => treeDataProvider.refresh());
  watcher.onDidCreate(() => treeDataProvider.refresh());
  watcher.onDidDelete(() => treeDataProvider.refresh());
  context.subscriptions.push(watcher);
}

// Supplies task data for the sidebar.
class TaskTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  // Gets tasks from tasks.json, filters for workspace tasks.
  async getChildren(): Promise<vscode.TreeItem[]> {
    const tasks = await vscode.tasks.fetchTasks();
    const userTasks = tasks.filter((task) => task.source === "Workspace");
    return userTasks.map((task) => new vscode.TreeItem(task.name));
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
