// https://grok.com/chat/009060d2-e59e-4980-9b1b-cc74e35e0fe8
// https://grok.com/chat/7b5bf235-7c97-4fc9-ae92-f6d1bf94e256

import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const treeDataProvider = new TaskTreeDataProvider();
  vscode.window.registerTreeDataProvider("taskDrawer", treeDataProvider);

  // Refresh command for manual reload
  context.subscriptions.push(
    vscode.commands.registerCommand("taskDrawer.refresh", () => {
      treeDataProvider.refresh();
    })
  );

  // Command to run a task from the sidebar
  context.subscriptions.push(
    vscode.commands.registerCommand("taskDrawer.runTask", async (name: string, scopeUri: string) => {
      const folder = vscode.workspace.workspaceFolders?.find((f) => f.uri.toString() === scopeUri);
      if (!folder) {
        vscode.window.showErrorMessage(`Workspace folder not found: ${scopeUri}`);
        return;
      }
      const tasks = await vscode.tasks.fetchTasks();
      const workspaceTasks = tasks.filter((task) => task.source === "Workspace");
      const task = workspaceTasks.find((task) => task.name === name && task.scope === folder);
      if (task) {
        await vscode.tasks.executeTask(task);
      } else {
        vscode.window.showErrorMessage(`Task '${name}' not found in '${folder.name}'`);
      }
    })
  );

  // Command to list and run tasks from the command palette
  context.subscriptions.push(
    vscode.commands.registerCommand("taskDrawer.runTaskFromPalette", async () => {
      const tasks = await vscode.tasks.fetchTasks();
      const userTasks = tasks.filter((task) => task.source === "Workspace");
      const taskLabels = userTasks.map((task) => task.name);
      const selected = await vscode.window.showQuickPick(taskLabels, { placeHolder: "Select a task to run" });
      if (selected) {
        const task = userTasks.find((t) => t.name === selected);
        if (task) {
          await vscode.tasks.executeTask(task);
        }
      }
    })
  );

  // Watch for changes to tasks.json and refresh automatically
  const watcher = vscode.workspace.createFileSystemWatcher("**/.vscode/tasks.json");
  watcher.onDidChange(() => treeDataProvider.refresh());
  watcher.onDidCreate(() => treeDataProvider.refresh());
  watcher.onDidDelete(() => treeDataProvider.refresh());
  context.subscriptions.push(watcher);
}

class TaskTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  async getChildren(): Promise<vscode.TreeItem[]> {
    const tasks = await vscode.tasks.fetchTasks();
    const userTasks = tasks.filter((task) => task.source === "Workspace");
    return userTasks.map((task) => {
      const label = task.name;
      const item = new vscode.TreeItem(label);
      if (task.scope && typeof task.scope !== "number") {
        item.command = {
          command: "taskDrawer.runTask",
          title: "Run Task",
          arguments: [task.name, task.scope.uri.toString()],
        };
      }
      return item;
    });
  }

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }
}
