# Task Drawer

A lightweight VS Code extension that adds a "Tasks" sidebar to the Explorer, displaying all tasks defined in your `.vscode/tasks.json` file. It integrates with VS Code’s task schema, providing a simple UI to view your custom tasks, with automatic updates when the file changes.

## Features

- Displays all tasks from `.vscode/tasks.json` in a "Tasks" sidebar.
- Auto-refreshes the sidebar when you edit `tasks.json`.
- Offers a "Task Sidebar: Refresh" command for manual updates.

## Installation

1. Install the extension from the VS Code Marketplace (or sideload a `.vsix` file).
2. Add a `.vscode/tasks.json` file to your workspace with your tasks.

## Example `tasks.json`

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build",
      "type": "shell",
      "command": "echo Building project..."
    },
    {
      "label": "Test",
      "type": "shell",
      "command": "echo Running tests..."
    }
  ]
}
```

## Usage

- Open the Explorer sidebar in VS Code.
- Find the "Tasks" section—it lists all tasks from `.vscode/tasks.json`.
- Edit `tasks.json` to add or modify tasks; the sidebar updates automatically.
- Use `Ctrl+Shift+P` > "Task Sidebar: Refresh" to manually reload if needed.

## Notes

- This is a display-only UI—run tasks via `Terminal > Run Task...` in VS Code.
- Only tasks from `.vscode/tasks.json` are shown (not auto-detected tasks from extensions).

## Contributing

Fork and submit PRs on [GitHub](#) (replace with your repo link).

## License

MIT
