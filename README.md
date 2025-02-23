# Task Drawer

This is a lightweight VS Code extension that creates an Explorer View (a small, resizable panel in the sidebar) that corresponds to your `.vscode/tasks.json` file.

If you use a `package.json` or a `Makefile`, this is a useful way to provide a UI layer for common tasks that you run in your project. This is especially useful if you need to orchestrate multiple tasks together. Alternatively, you could use something like `concurrently` (from NPM), but sometimes it's hard to decipher logs from multiple commands, so why not keep the terminals separate? That's why I made this for myself.

Note that this is not specific to any programming language or environment. It can be generally used with any project that exposes a `.vscode/tasks.json` file.

## Installation

- Install the extension from the [Marketplace](https://marketplace.visualstudio.com/items?itemName=zaydek.task-drawer) or by searching for "Task Drawer" in the Extensions sidebar.
- Add a `.vscode/tasks.json` file to your workspace with your tasks. If you don't see the Explorer View immediately, invoke `Extensions: Refresh` from the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`).

Here's an example of a simple `.vscode/tasks.json` file:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🚀 Build",
      "type": "shell",
      "command": "echo Building project..."
    },
    {
      "label": "✅ Test",
      "type": "shell",
      "command": "echo Running tests..."
    }
  ]
}
```

<img width="307" alt="Screenshot 2025-02-23 at 4 33 35 AM" src="https://github.com/user-attachments/assets/fbeedf64-008f-4c3b-8049-af130921798c" />

And here's a more complex example that strings together multiple tasks:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "🚀 Build",
      "type": "shell",
      "command": "echo Building project..."
    },
    {
      "label": "✅ Test",
      "type": "shell",
      "command": "echo Running tests..."
    },
    {
      "label": "🔧 Build and Test",
      "dependsOn": ["🚀 Build", "✅ Test"]
    }
  ]
}
```

<img width="307" alt="Screenshot 2025-02-23 at 4 34 05 AM" src="https://github.com/user-attachments/assets/16b281ed-81fc-4fc8-92d5-ce8baaab536a" />

[You can learn more about tasks here](https://code.visualstudio.com/docs/editor/tasks).

## Features

This extension refreshes automatically when you save your `.vscode/tasks.json` file, specifically on file save. If for any reason you want to manually refresh the extension, you can invoke the `Task Sidebar: Refresh` command from the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`).

This extension should be compatible with all VS Code forks, such as Cursor, Windsurf, etc. Feel free to [open an issue](https://github.com/zaydek/vscode-extension-task-drawer/issues) if you encounter any problems.

## Running Tasks

Simply click on a task in the Task Drawer to run it.

Note that tasks support many behaviors. [Here's a snippet from the official documentation](https://code.visualstudio.com/docs/editor/tasks#_run-behavior):

> You can specify a task's run behaviors using the `runOptions` property:
>
> - **reevaluateOnRerun:** Controls how variables are evaluated when a task is executed through the Rerun Last Task command. The default is `true`, meaning that variables will be reevaluated when a task is rerun. When set to `false`, the resolved variable values from the previous run of the task will be used.
>
> - **runOn:** Specifies when a task is run.
> - `default` - The task will only be run when executed through the Run Task command.
> - `folderOpen` - The task will be run when the containing folder is opened. The first time you open a folder that contains a task with `folderOpen`, you will be asked if you want to allow tasks to run automatically in that folder. You can change your decision later using the Manage Automatic Tasks command and selecting between Allow Automatic Tasks and Disallow Automatic Tasks.
>
> - **instanceLimit** - The number of instances of the task that are allowed to run simultaneously. The default value is `1`.

[You can learn more about tasks here](https://code.visualstudio.com/docs/editor/tasks).

This extension simply provides a UI layer on top of your tasks. It does not have any magical powers or side effects.

## Contributing

This extension is open source; contributions and forking are welcome. [The repo is here](https://github.com/zaydek/vscode-extension-task-drawer).

## License

[Licensed as MIT open source](https://github.com/zaydek/vscode-extension-task-drawer/blob/main/LICENSE).

```

```

```

```
