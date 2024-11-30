#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import ora from "ora";
import path from "path";
import readline from "readline";

const printDivider = () => {
	console.log(chalk.gray("-".repeat(50)));
};

function fixExactVersions(projectPath) {
	const spinner = ora(chalk.yellow("Checking project files...")).start();

	if (!fs.existsSync(projectPath)) {
		spinner.fail(
			chalk.red(`The path "${projectPath}" does not exist. Exiting...`)
		);
		process.exit(1);
	}

	const packageJsonPath = path.join(projectPath, "package.json");
	const packageLockJsonPath = path.join(projectPath, "package-lock.json");

	if (!fs.existsSync(packageJsonPath) || !fs.existsSync(packageLockJsonPath)) {
		spinner.fail(
			chalk.red(
				'Error: "package.json" or "package-lock.json" files not found in the provided path.'
			)
		);
		process.exit(1);
	}

	// Read and parse both files
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
	const packageLockJson = JSON.parse(
		fs.readFileSync(packageLockJsonPath, "utf8")
	);

	// Update the exact versions
	const updateDependencies = (dependencies) => {
		if (!dependencies) return;

		for (const dep in dependencies) {
			const packageLockConfigObject =
				packageLockJson?.dependencies?.[dep] ||
				packageLockJson?.packages?.[`node_modules/${dep}`];

			if (packageLockConfigObject && packageLockConfigObject?.version) {
				if (dependencies[dep] !== packageLockConfigObject.version) {
					const newVersion = packageLockConfigObject.version;

					console.log(
						chalk.green(
							`Updated "${dep}" - "${dependencies[dep]}" to "${newVersion}".`
						)
					);
					dependencies[dep] = newVersion;
				}
			} else {
				console.warn(
					chalk.yellow(`Warning: "${dep}" not found in package-lock.json.`)
				);
			}
		}
	};

	updateDependencies(packageJson.dependencies);
	updateDependencies(packageJson.devDependencies);

	// Save the updated package.json
	fs.writeFileSync(
		packageJsonPath,
		JSON.stringify(packageJson, null, 2),
		"utf8"
	);

	spinner.succeed(
		chalk.green("The package.json file has been updated with exact versions.")
	);
	printDivider();
	console.log(
		chalk.blue(
			"Thank you for preventing future version incompatibility issues! <3 Great job!"
		)
	);
	printDivider();
}

function promptForPath() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question(
		chalk.blue(
			"Please enter the project path (leave empty to use the current directory): "
		),
		(inputPath) => {
			// If no inputPath is provided, use the current working directory (cwd)
			const projectPath = path.resolve(inputPath.trim() || process.cwd());
			fixExactVersions(projectPath);
			rl.close();
		}
	);
}

const args = process.argv.slice(2);

if (args.length === 0) {
	printDivider();
	promptForPath();
} else {
	const projectPath = path.resolve(args[0]);
	fixExactVersions(projectPath);
}
