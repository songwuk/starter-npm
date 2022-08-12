#! /usr/bin/env node

import * as fs from 'node:fs'
import { Command } from 'commander'
import inquirer from 'inquirer';

!(async () => {
  const data =  await fs.readFileSync('./package.json', 'utf8')
  const version = JSON.parse(data).version
  const name = JSON.parse(data).name
  const description = JSON.parse(data).description
  const program = new Command();
  program
  .name(name)
  .description(description)
  .version(version);
  program.command('init')
  .description('Split a string into substrings and display as an array')
  .option('example', 'display just the first substring')
  .action((_str, _options) => {
      inquirer
      .prompt([
        /* Pass your questions in here */
        {
          type: 'list',
          name: 'theme',
          message: 'what project do you want to create?',
          choices: [
            'vue-ts',
            'react-ts',
          ],
        },
      ])
      .then((answers) => {
        // Use user feedback for... whatever!!
        console.log(JSON.stringify(answers, null, ' '));
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
  });
  program.parse();

})()