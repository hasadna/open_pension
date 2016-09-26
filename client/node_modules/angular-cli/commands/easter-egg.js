"use strict";
var Command = require('ember-cli/lib/models/command');
var stringUtils = require('ember-cli-string-utils');
var chalk = require('chalk');
function pickOne(of) {
    return of[Math.floor(Math.random() * of.length)];
}
function default_1(name) {
    return Command.extend({
        name: name,
        works: 'insideProject',
        run: function (commandOptions, rawArgs) {
            this[stringUtils.camelize(this.name)](commandOptions, rawArgs);
            return Promise.resolve();
        },
        makeThisAwesome: function () {
            var phrase = pickOne([
                "You're on it, there's nothing for me to do!",
                "Let's take a look... nope, it's all good!",
                "You're doing fine.",
                "You're already doing great.",
                "Nothing to do; already awesome. Exiting.",
                "Error 418: As Awesome As Can Get."
            ]);
            console.log(chalk.green(phrase));
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
;
//# sourceMappingURL=/Users/hans/Sources/angular-cli/packages/angular-cli/angular-cli/commands/easter-egg.js.map