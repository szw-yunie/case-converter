// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { toBlankCase, toKebabCase, toLowerCamelCase, toUnderScoreCase, toUpperCamelCase } from './NameUtil';

let countConvert = 0;
let countUpperOrLower = 0;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is act·ivated
	// console.log('Congratulations, your extension "case-converter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposableConvert = vscode.commands.registerCommand('case-converter.convert', () => {
		const activeTextEditor = vscode.window.activeTextEditor;
		if (!activeTextEditor) { return; }

		activeTextEditor.edit(editBuilder => {
			countConvert++;

			const start = activeTextEditor.selection.start;
			const end = activeTextEditor.selection.end;
			const selectionRange = new vscode.Range(start, end);
			const raw = activeTextEditor.document.getText(selectionRange);

			vscode.window.showInformationMessage('raw: ' + raw);

			let text = '';
			switch (countConvert) {
				case 1:
					text = toUpperCamelCase(raw);
					break;
				case 2:
					text = toLowerCamelCase(raw);
					break;
				case 3:
					text = toUnderScoreCase(raw);
					break;
				case 4:
					text = toKebabCase(raw);
					break;
				case 5:
					text = toBlankCase(raw);
					countConvert = 0;
					break;
				default:
					break;
			}

			editBuilder.replace(selectionRange, text);
		});
	});

	let disposableUpperOrLower = vscode.commands.registerCommand('case-converter.upperOrLower', () => {
		const activeTextEditor = vscode.window.activeTextEditor;
		if (!activeTextEditor) { return; }

		activeTextEditor.edit(editBuilder => {
			countUpperOrLower++;

			const start = activeTextEditor.selection.start;
			const end = activeTextEditor.selection.end;
			const selectionRange = new vscode.Range(start, end);
			const raw = activeTextEditor.document.getText(selectionRange);

			vscode.window.showInformationMessage('raw: ' + raw);

			let text = '';
			switch (countUpperOrLower) {
				case 1:
					text = raw.toUpperCase();
					break;
				case 2:
					text = raw.toLowerCase();
					countUpperOrLower = 0;
					break;
				default:
					break;
			}
			editBuilder.replace(selectionRange, text);
		});
	});

	context.subscriptions.push(disposableConvert);
	context.subscriptions.push(disposableUpperOrLower);
}

// this method is called when your extension is deactivated
export function deactivate() { }
