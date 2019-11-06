import * as vscode from 'vscode';

/**
 * The ID for the builtin VS Code 'typescript-language-features' extension.
 */
export const id = 'vscode.typescript-language-features';


export async function activate(context: vscode.ExtensionContext): Promise<void> {
	console.log('"async" verification extension is activating...');
	// Get the extension based on ID.
	const extension = vscode.extensions.getExtension(id);
	let disposable: vscode.Disposable[] = [];
	if (!extension) {
		disposable.push(
			vscode.commands.registerCommand('extension.verify-async', () => {
				// If the extension does not exist, display an error message.
				vscode.window.showInformationMessage(`ext "${id}" could not be found.`);
			})
		);
	} else {
		// Activate the builtin extension.
		await extension.activate();
		// Register the command which displays information regarding the extension.
		disposable.push(
			vscode.commands.registerCommand('extension.verify-async', () => {
				// Display information regarding the extension. The extension should be active since we `activated` it previously.
				vscode.window.showInformationMessage(`ext "${extension.id}" is ${extension.isActive ? 'active' : 'inactive'}.`);
			})
		);
	}
	context.subscriptions.push(...disposable);
}
export async function deactivate(): Promise<void> { }
