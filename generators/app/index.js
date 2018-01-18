
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

const CHOICES = [{name: 'Web App', value: 'web'}, {name: 'Native App', value: 'native'}];

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    opts.force = true;
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.conflicter.force = true;

    console.log("this.config.getAll()", this.config.getAll());

    this.argument('foldername', { type: String, required: false });
    console.log("0 this.options.foldername", this.options.foldername, "this.determineAppname()", this.determineAppname());
    if (_.isUndefined(this.options.foldername)) {
      this.options.foldername = this.determineAppname();
      console.log("1 this.options.foldername", this.options.foldername, "this.determineAppname()", this.determineAppname());
    } else {
      this.destinationRoot(this.options.foldername);
    }



    console.log("1.5 this.options.foldername", this.options.foldername, "this.determineAppname()", this.determineAppname());

    this.config.set('foldername', this.options.foldername);

    this.option('babel'); // This method adds support for a `--babel` flag
  }

  prompting() {
    let filteredChoices = _.filter(CHOICES, (choice) => {
      return !this.config.get(choice.value);
    })
    if (_.isEmpty(filteredChoices)) process.exit(1);
    return this.prompt([{
      type    : 'list',
      name    : 'appType',
      message : 'What type of app do you want to generate?',
      default : filteredChoices[0].value, // Default to current folder name
      choices : filteredChoices
    }
    ]).then((answers) => {
      _.each(answers, (answer, key) => { this[key] = answer });
    });


  }

  configuring() {

    if (this.config.get('firebase')) {
      this.currentFirebase = this.config.get('firebase');
    } else {
      let done = this.async();
      try {
        firebasePrompter(this, done);
      } catch(e) {
        this.log(e);
      }
    }
  }



  createApp() {

    this.composeWith(require.resolve(`./../${this.appType}`), {arguments: [this.options.foldername, '--force'], currentFirebase: this.currentFirebase});
  }

  writing() {

    this.config.set('firebase', this.currentFirebase);
    this.config.set(this.appType, true);
  }


};
