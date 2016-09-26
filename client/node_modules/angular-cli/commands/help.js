"use strict";
var fs = require('fs');
var path = require('path');
var Command = require('ember-cli/lib/models/command');
var stringUtils = require('ember-cli-string-utils');
var lookupCommand = require('ember-cli/lib/cli/lookup-command');
var commandsToIgnore = [
    'help',
    'easter-egg',
    'completion',
    'github-pages-deploy'
];
var HelpCommand = Command.extend({
    name: 'help',
    description: 'Shows help for the CLI',
    works: 'everywhere',
    availableOptions: [],
    run: function (commandOptions) {
        var _this = this;
        var commandFiles = fs.readdirSync(__dirname)
            .filter(function (file) { return file.match(/\.js$/); })
            .map(function (file) { return path.parse(file).name; })
            .map(function (file) { return file.toLowerCase(); });
        commandFiles = commandFiles.filter(function (file) {
            return commandsToIgnore.indexOf(file) < 0;
        });
        var commandMap = commandFiles.reduce(function (acc, curr) {
            var classifiedName = stringUtils.classify(curr);
            var defaultImport = require("./" + curr).default;
            acc[classifiedName] = defaultImport;
            return acc;
        }, {});
        commandFiles.forEach(function (cmd) {
            var Command = lookupCommand(commandMap, cmd);
            var command = new Command({
                ui: _this.ui,
                project: _this.project,
                commands: _this.commands,
                tasks: _this.tasks
            });
            _this.ui.writeLine(command.printBasicHelp(commandOptions));
        });
    }
});
HelpCommand.overrideCore = true;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HelpCommand;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/angular-cli/commands/help.js.map