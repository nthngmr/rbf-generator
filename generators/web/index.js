
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
    opts.force = true;
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.conflicter.force = true;

    this.argument('foldername', { type: String, required: false });

    this.option('babel'); // This method adds support for a `--babel` flag
  }

  initializing() {

    if (_.isUndefined(this.options.foldername)) {
      this.options.foldername = this.determineAppname();
      this.appname = this.options.foldername;
    }

    this.currentFirebase = this.options.currentFirebase;

    if (this.config.get('firebase')) {
      this.currentFirebase = this.config.get('firebase');
    }
    if (this.currentFirebase) {
      this.appname = this.currentFirebase.name;
    } else {
      let done = this.async();
      firebasePrompter(this, done);
    }

    mkdirp.sync(this.destinationPath(`${this.options.foldername}-web`));
    this.destinationRoot(`${this.options.foldername}-web`);


  }

  prompting() {
    this.config.set('firebase', this.currentFirebase);
    if (!this.appname) {
      return this.prompt([{
        type    : 'input',
        name    : 'appname',
        message : 'Your project name',
        default : this.appname, // Default to current folder name
        validate : (val) => {
          return _.isString(val);
        }
      }
      ]).then((answers) => {
        _.each(answers, (answer, key) => { this[key] = answer });
        this.config.set('appname', this.appname);
      });
    }

  }

  createReactApp() {
    this.spawnCommandSync('create-react-app', ['.']);
  }

  writing() {

    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationPath(''),
      {
        globOptions: {
          ignore: [
            this.templatePath('public/index.html'),
            this.templatePath('.firebaserc'),
            this.templatePath('src/page/index-page/IndexPage.js'),
            this.templatePath('src/page/auth-page/AuthPage.js'),
            this.templatePath('src/components/MainNav.js'),
            this.templatePath('firebase.js')
          ]
        }
      }
    );


    this.fs.copyTpl(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html'),
      { appname: this.appname, googleFont: this.googleFont }
    );
    this.fs.copyTpl(
      this.templatePath('src/index.css'),
      this.destinationPath('src/index.css'),
      { googleFont: this.googleFont }
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/index-page/IndexPage.js'),
      this.destinationPath('src/pages/index-page/IndexPage.js'),
      { appname: this.appname }
    );
    this.fs.copyTpl(
      this.templatePath('src/pages/auth-page/AuthPage.js'),
      this.destinationPath('src/pages/auth-page/AuthPage.js'),
      { appname: this.appname }
    );
    this.fs.copyTpl(
      this.templatePath('.firebaserc'),
      this.destinationPath('.firebaserc'),
      { firebaseSlug: this.firebaseSlug }
    );
    this.fs.copyTpl(
      this.templatePath('src/components/MainNav.js'),
      this.destinationPath('src/components/MainNav.js'),
      { appname: this.appname }
    );
    this.fs.copyTpl(
      this.templatePath('src/firebase.js'),
      this.destinationPath('src/firebase.js'),
      {
        firebaseSlug: this.currentFirebase.projectId,
        firebaseApiKey: this.currentFirebase.apiKey,
        firebaseMessagingSenderId: this.currentFirebase.messagingSenderId
      }
    );
  }

  install() {
    this.yarnInstall([
      'bootstrap@^4.0.0-beta',
      'firebase@^4.8.2',
      'lodash@^4.17.4',
      'moment@^2.18.1',
      '@nothingmore/auth@^1.0.4',
      'query-string@^5.0.0',
      'react@^16.1.1',
      'react-dom@^16.1.1',
      'react-redux@^5.0.6',
      'react-router@^4.2.0',
      'react-router-dom@^4.2.2',
      'react-scripts',
      'react-transition-group@^1.1.2',
      'reactstrap@next',
      'redux@^3.7.2',
      'redux-form@^7.0.4',
      'redux-logger@^3.0.6',
      'redux-thunk@^2.2.0'
    ]).then(() => {
      this.spawnCommandSync('yarn', ['start']);
    })
  }


};
