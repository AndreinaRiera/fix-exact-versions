# 📦 fix-exact-versions

A simple yet powerful Node.js tool to lock the exact versions of dependencies in your `package.json` based on the versions found in your `package-lock.json`. This ensures that your project always uses the exact same versions of packages, preventing future compatibility issues.

> [!IMPORTANT]
> This is a global tool, remember to install it globally with `npm install -g fix-exact-versions`.

---

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Use Cases & Benefits](#use-cases--benefits)

---

## Installation

To get started with **fix-exact-versions**, you’ll first need to install it globally via npm. Here’s how you can do that:

### Step 1: Install globally

```bash
npm install -g fix-exact-versions
```

Once installed, you can use the fix-exact-versions command from anywhere in your terminal.

### Step 2: Verify Installation

To verify that the tool was installed correctly, simply run the following command:

```bash
fix-exact-versions --version
```

If you see the version number printed in the terminal, you're good to go!

# Usage

Using fix-exact-versions is incredibly simple. You can either provide a path to your project, or the tool will prompt you to enter one.

## Command-line Usage:

```bash
fix-exact-versions [project-path]
```

Where [project-path] is the path to your Node.js project.

- If no path is provided, the tool will ask you to input it.

## Example:

Run the command in your terminal:

```bash
fix-exact-versions /path/to/your/project
```

The tool will automatically:

- Open your package.json
- Fetch the exact versions from package-lock.json
- Update the versions in package.json to match those in package-lock.json
- Print a success message upon completion.

# Use Cases & Benefits

## Prevent Version Incompatibility

By locking the exact versions of your dependencies, fix-exact-versions ensures that your project behaves the same way on every machine. This eliminates the common issues of dependencies breaking or behaving differently due to slight version changes.

## Easier Collaboration

When multiple developers work on the same project, fix-exact-versions ensures that everyone is using the same dependency versions. This results in fewer issues when running the project locally or deploying it.

## Cleaner Dependency Management

Managing dependencies can get tricky, especially with large projects. fix-exact-versions helps keep your package.json clean and consistent with the versions you’re actually using, making your project more reliable and easier to maintain.

## No More "It Works on My Machine"

Have you ever encountered the frustrating "it works on my machine" problem? By aligning the versions between package.json and package-lock.json, this tool guarantees that everyone’s working with the same dependency versions, reducing these types of issues significantly.

# Conclusion

With fix-exact-versions, you’ll never have to worry about mismatched versions again. It’s a simple, efficient, and reliable tool to streamline your development workflow and keep your projects stable.

🎉 Thank you for preventing future version incompatibility issues! <3 Great job!

License
MIT © [Andreina Riera](https://www.linkedin.com/in/andreinariera/)
