#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { createInterface } from "readline";

function fixExactVersions(projectPath) {
	if (!existsSync(projectPath)) {
		console.error(`The path "${projectPath}" does not exist. Exiting...`);
		process.exit(1);
	}

	const packageJsonPath = join(projectPath, "package.json");
	const packageLockJsonPath = join(projectPath, "package-lock.json");

	// Check if both files exist
	if (!existsSync(packageJsonPath) || !existsSync(packageLockJsonPath)) {
		console.error(
			'Error: "package.json" or "package-lock.json" files not found in the provided path.'
		);
		process.exit(1);
	}

	// Read and parse both files
	const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
	const packageLockJson = JSON.parse(readFileSync(packageLockJsonPath, "utf8"));

	// Update the exact versions
	const updateDependencies = (dependencies) => {
		if (!dependencies) return;

		for (const dep in dependencies) {
			const packageLockConfigOject = packageLockJson?.dependencies?.[dep];

			if (packageLockConfigOject && packageLockConfigOject?.version) {
				if (dependencies[dep] !== packageLockConfigOject.version) {
					dependencies[dep] = packageLockJson.dependencies[dep].version;
					console.log(`Updated "${dep}" to "${dependencies[dep]}".`);
				}
			} else {
				console.warn(`Warning: "${dep}" not found in package-lock.json.`);
			}
		}
	};

	updateDependencies(packageJson.dependencies);
	updateDependencies(packageJson.devDependencies);

	// Save the updated package.json
	writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), "utf8");

	console.log("The package.json file has been updated with exact versions.");
	console.log(
		"Thank you for preventing future version incompatibility issues! <3 Great job!"
	);
}

function promptForPath() {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	rl.question("Please enter the project path: ", (inputPath) => {
		if (!inputPath) {
			console.log("No path provided. Exiting...");
			process.exit(0);
		}

		const projectPath = resolve(inputPath.trim());

		fixExactVersions(projectPath);
		rl.close();
	});
}

const args = process.argv.slice(2);

if (args.length === 0) {
	promptForPath();
} else {
	const projectPath = resolve(args[0]);
	fixExactVersions(projectPath);
}
