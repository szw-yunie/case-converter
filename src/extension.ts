// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { toBlankCase, toKebabCase, toLowerCamelCase, toUnderScoreCase, toUpperCamelCase } from './NameUtil';

let caseIndex = 0;
const cases: ((s: string) => string)[] = [
	toLowerCamelCase,
	toUpperCamelCase,
	toUnderScoreCase,
	toKebabCase,
	toBlankCase
];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is act·ivated
	// console.log('Congratulations, your extension "case-converter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposableConvert = vscode.commands.registerCommand('case-converter.convert',
		function convert() {
			const activeTextEditor = vscode.window.activeTextEditor;
			if (!activeTextEditor) { return; }

			activeTextEditor.edit(editBuilder => {
				const selection = activeTextEditor.selection;
				const document = activeTextEditor.document;

				let selectionRange: vscode.Range;

				// Auto select word range at the position of the cursor when the user doesn't select any word range.
				if (selection.isEmpty) {
					selectionRange = document.getWordRangeAtPosition(
						selection.active
					) as vscode.Range;
					activeTextEditor.selection = new vscode.Selection(selectionRange.start, selectionRange.end);
				} else
					selectionRange = new vscode.Range(selection.start, selection.end);

				const raw = document.getText(selectionRange);
				let text = raw;
				let count = 0;
				// Find next case which make text different from the raw.
				do {

					if (count === cases.length) {
						vscode.window.showInformationMessage(`Can not convert'` + raw + `'! It may be use a nonstandard nomenclature.`);
						return;
					}

					text = cases[caseIndex](raw);
					caseIndex = (caseIndex + 1) % cases.length;

					count++;
				} while (text === raw);

				editBuilder.replace(selectionRange, text);
			});
		});

	let disposableUpperOrLower = vscode.commands.registerCommand('case-converter.upperOrLower',
		function upperOrLower() {
			const activeTextEditor = vscode.window.activeTextEditor;
			if (!activeTextEditor) { return; }

			activeTextEditor.edit(editBuilder => {
				const selection = activeTextEditor.selection;
				const document = activeTextEditor.document;

				let selectionRange: vscode.Range;
				// Auto select word range at the position of the cursor when the user doesn't select any word range.
				if (selection.isEmpty) {
					selectionRange = document.getWordRangeAtPosition(
						selection.active
					) as vscode.Range;
					activeTextEditor.selection = new vscode.Selection(selectionRange.start, selectionRange.end);
				} else
					selectionRange = new vscode.Range(selection.start, selection.end);

				const raw = document.getText(selectionRange);
				let text = raw.toUpperCase();
				if (text === raw) {
					text = raw.toLowerCase();
				}

				editBuilder.replace(selectionRange, text);
			});
		});

	context.subscriptions.push(disposableConvert);
	context.subscriptions.push(disposableUpperOrLower);
}

// this method is called when your extension is deactivated
export function deactivate() { }
