const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const loadPlugins = (directory) => {
    const plugins = [];
    let pluginFileCount = 0;
    const loadFiles = (dir) => {
        const entries = fs.readdirSync(dir);
        entries.forEach(entry => {
            const entryPath = path.join(dir, entry);
            if (fs.lstatSync(entryPath).isDirectory()) {
                loadFiles(entryPath);
            } else if (entryPath.endsWith('.js')) {
                try {
                    delete require.cache[require.resolve(entryPath)];
                    const plugin = require(entryPath);
                    plugin.filePath = entryPath;
                    plugins.push(plugin);
                    pluginFileCount++;
                    console.log(chalk.bgHex('#ADD8E6').hex('#333').bold(` Loaded Plugin: ${path.basename(entryPath)} `));
                } catch (error) {
                    console.log(chalk.bgHex("#e74c3c").bold(` Error loading plugin at ${entryPath}:`, error ));
                }
            }
        });
    };
    const resolvedDirectory = path.resolve(directory);
    if (fs.existsSync(resolvedDirectory) && fs.lstatSync(resolvedDirectory).isDirectory()) {
        loadFiles(resolvedDirectory);
    } else {
        console.log(chalk.bgHex("#e74c3c").bold(` Invalid directory: ${resolvedDirectory}` ));
    }
    return { plugins, pluginFileCount };
};

const { plugins, pluginFileCount } = loadPlugins(path.join(process.cwd(), 'plugins'));
console.log(chalk.bgHex('#90EE90').hex('#333').bold(' All Cases and Plugins loaded-! '));

module.exports = { plugins, pluginFileCount };
