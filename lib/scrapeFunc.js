const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

class ScraperManager {
    constructor(directory) {
        this.directory = path.resolve(directory);
        this.scrapers = {};
    }

    async load() {
        try {
            Object.keys(require.cache).forEach(filePath => {
                if (filePath.startsWith(this.directory)) {
                    delete require.cache[filePath];
                }
            });

            const files = fs.readdirSync(this.directory).filter(file => file.endsWith('.js'));
            this.scrapers = {};
            for (const file of files) {
                const filePath = path.join(this.directory, file);
                const scraperName = path.basename(file, '.js');
                try {
                    const scraperModule = require(filePath);

                    this.scrapers[scraperName] = this.wrapScraper(scraperModule, scraperName);
                } catch (error) {
                    console.log(chalk.bgHex("#e74c3c").bold(` Error loading scraper: ${scraperName}\n${error} `));
                }
            }
        } catch (error) {
            console.error('Error loading scrapers:', error);
        }
    }

    wrapScraper(scraperModule, scraperName) {
        if (typeof scraperModule === 'function') {
            return new Proxy(
                {},
                {
                    get: (target, prop) => {
                        if (prop === 'toJSON' || prop === 'inspect') {
                            return () => ({ [scraperName]: {} });
                        }

                        if (prop === scraperName) {
                            return async (...args) => {
                                return await scraperModule(...args);
                            };
                        }

                        return undefined;
                    },
                }
            );
        }

        return new Proxy(
            {},
            {
                get: (target, prop) => {
                    if (prop === 'toJSON' || prop === 'inspect') {
                        return () =>
                            Object.keys(scraperModule).reduce((acc, key) => {
                                acc[key] = {};
                                return acc;
                            }, {});
                    }

                    if (scraperModule[prop] && typeof scraperModule[prop] === 'function') {
                        return async (...args) => {
                            return await scraperModule[prop](...args);
                        };
                    }

                    return undefined;
                },
            }
        );
    }

    list() {
        return this.scrapers;
    }

    async watch() {
        fs.watch(this.directory, async (eventType, filename) => {
            if (filename && filename.endsWith('.js')) {
                console.log(chalk.bgHex('#FFFF99').hex('#333').bold(` Detected change in ${filename}, reloading scrapers... `));
                await this.load();
            }
        });
    }
}

global.scrape = new ScraperManager(path.join(process.cwd(), '/lib/scrape'));

(async () => {
    await scrape.load();
    await scrape.watch();

    setInterval(async () => {
        await scrape.load();
    }, 2000);
})();
