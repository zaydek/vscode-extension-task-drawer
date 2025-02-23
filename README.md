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

And finally, this is the task I originally built this extension to support:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "dev:stylex",
      "type": "shell",
      "command": "make compile-stylex-dev",
      "problemMatcher": [],
      "group": {
        "kind": "build"
      },
      "presentation": {
        "reveal": "always",
        "group": "dev-group"
      }
    },
    {
      "label": "dev:bun",
      "type": "shell",
      "command": "make compile-bun-dev",
      "problemMatcher": [],
      "group": {
        "kind": "build"
      },
      "presentation": {
        "reveal": "always",
        "group": "dev-group"
      }
    },
    {
      "label": "dev",
      "dependsOn": ["dev:stylex", "dev:bun"],
      "group": {
        "kind": "build",
        "isDefault": true
      }
    },
    {
      "label": "prod",
      "type": "shell",
      "command": "make compile-bun-prod",
      "problemMatcher": [],
      "group": {
        "kind": "build"
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    },
    {
      "label": "prod-serve",
      "type": "shell",
      "command": "make compile-bun-prod-serve",
      "problemMatcher": [],
      "group": {
        "kind": "build"
      },
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ]
}
```

<img width="307" alt="Screenshot 2025-02-23 at 5 15 57 AM" src="https://github.com/user-attachments/assets/8b6d72a6-ef20-48da-bf17-9184b373ca35" />

This should give you an idea of when and why this extension can be useful.

[You can learn more about VS Code Tasks here](https://code.visualstudio.com/docs/editor/tasks).

## Features

This extension refreshes automatically when you save your `.vscode/tasks.json` file, specifically on file save. If for any reason you want to manually refresh the extension, you can invoke the `Task Drawer: Refresh` command from the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`).

You can run tasks by clicking on them in the Explorer View. This extension does not automatically invoke tasks; it simply provides a UI for you to run them yourself. Note that VS Code does support many behaviors for tasks. [You can learn more about them here](https://code.visualstudio.com/docs/editor/tasks#_run-behavior).

You can also invoke tasks from the Command Palette (`Cmd+Shift+P` or `Ctrl+Shift+P`). Search for `Task Drawer: Run Task…` and then clicking into the task you want to run.

This extension should be compatible with all VS Code forks, such as Cursor, Windsurf, etc. Feel free to [open an issue](https://github.com/zaydek/vscode-extension-task-drawer/issues) if you encounter any problems.

## Contributing

This extension is open source; contributions and forking are welcome. [The repo is here](https://github.com/zaydek/vscode-extension-task-drawer).

## License

Licensed as [MIT](https://github.com/zaydek/vscode-extension-task-drawer/blob/main/LICENSE).
