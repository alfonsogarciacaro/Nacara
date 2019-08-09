const path = require("path");
const runScript = require("fable-splitter/dist/run").default;

let nodemonStarted = false;

module.exports = {
    entry: path.join(__dirname, "./Docs.fsproj"),
    outDir: path.join(__dirname, "./../dist"),
    babel: {
        plugins: ["@babel/plugin-transform-modules-commonjs"],
    },
    onCompiled() {
        if (!nodemonStarted) {
            const isWatch = process.argv.indexOf("--watch") !== -1 || process.argv.indexOf("-w") !== -1;
            if (isWatch) {
                nodemonStarted = true;
                runScript("./node_modules/.bin/nodemon", ["cli.js"])
            }
        }
    }
};
