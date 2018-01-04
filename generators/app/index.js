
'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const askName = require('inquirer-npm-name');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const https = require("https");
const fetch = require("node-fetch");
const firebasePrompter = require('./../../lib/firebasePrompter');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('foldername', { type: String, required: false });
    if (_.isUndefined(this.options.foldername)) {
      this.options.foldername = this.determineAppname();
    }

    this.option('babel'); // This method adds support for a `--babel` flag
  }

  prompting() {
    return this.prompt([{
      type    : 'list',
      name    : 'appType',
      message : 'What type of app do you want to generate?',
      default : 'web', // Default to current folder name
      choices : [{name: 'Web App', value: 'web'}, {name: 'Native App', value: 'native'}]
    }
    ]).then((answers) => {
      _.each(answers, (answer, key) => { this[key] = answer });
    });

    let done = this.async();
    try {
      firebasePrompter(this, done);
    } catch(e) {
      this.log(e);
    }
  }



  createApp() {
    this.composeWith(require.resolve(`./../${this.appType}`), {arguments: [this.options.foldername], currentFirebase: this.currentFirebase});
  }

  
};
