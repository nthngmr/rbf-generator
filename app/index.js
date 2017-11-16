
'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const askName = require('inquirer-npm-name');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const https = require("https");
const fetch = require("node-fetch");


module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('foldername', { type: String, required: true });
    this.log('folder name', this.options.foldername);
    this.destinationRoot(this.options.foldername);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag
  }

  fetchBootswatchThemes() {

    return fetch("https://bootswatch.com/api/3.json")
      .then((res) => {
        return res.json();
    }).then((data) => {
        this.bootswatchThemes = _.concat(['None'], _.map(data.themes, (theme) => {
          return theme.name;
        }));
        return Promise.resolve();
    });

  }

  initialQuestions() {
    return this.prompt([{
      type    : 'input',
      name    : 'appname',
      message : 'Your project name',
      default : this.options.foldername // Default to current folder name
    },{
      type    : 'input',
      name    : 'firebaseSlug',
      message : 'Your firebase app slug',
      default : `${this.options.foldername}-web`,
      validate : (val) => {
        return _.isString(val);
      } 
    },{
      type    : 'input',
      name    : 'firebaseApiKey',
      message : 'Your firebase API key for this app (required)',
      validate : (val) => {
        return (_.isString(val) && !_.isEmpty(val)) || "Seriously, the app won't work without this";
      } 
    },{
      type    : 'input',
      name    : 'firebaseMessagingSenderId',
      message : 'Your firebase messaging sender ID for this app (required)',
      validate : (val) => {
        return (_.isString(val) && !_.isEmpty(val)) || "yeah, it won't work without this either";
      } 
    },{
      type    : 'list',
      name    : 'bootswatchTheme',
      message : 'Choose a bootswatch theme',
      choices : this.bootswatchThemes
    }
    // ,{
    //   type    : 'input',
    //   name    : 'googleFont',
    //   message : 'Specify a google font family',
    //   default : 'Nunito'
    // }
    ]).then((answers) => {
      _.each(answers, (answer, key) => { this[key] = answer });
    });
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

    let cssImport = this.bootswatchTheme.name === 'None' ? 'bootstrap/dist/css/bootstrap.css' : `bootswatch/${this.bootswatchTheme.name}/bootstrap.css`
    
    this.fs.copyTpl(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html'),
      { appname: this.appname, googleFont: this.googleFont, cssImport }
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
      this.templatePath('src/components/MainNav.js'),
      this.destinationPath('src/components/MainNav.js'),
      { appname: this.appname }
    );
    this.fs.copyTpl(
      this.templatePath('.firebaserc'),
      this.destinationPath('.firebaserc'),
      { firebaseSlug: this.firebaseSlug }
    );
    this.fs.copyTpl(
      this.templatePath('src/firebase.js'),
      this.destinationPath('src/firebase.js'),
      { 
        firebaseSlug: this.firebaseSlug,
        firebaseApiKey: this.firebaseApiKey,
        firebaseMessagingSenderId: this.firebaseMessagingSenderId
      }
    );
  }

  

  installDeps() {
    this.yarnInstall([
      'bootstrap@4.0.0-alpha.6',
      'thomaspark/bootswatch#v4.0.0-alpha.6',
      'firebase@4.3.1',
      'lodash@4.17.4',
      'moment@2.18.1',
      'react@^15.6.2',
      'query-string@5.0.0',
      'react-dom@^15.6.1',
      'react-redux@5.0.6',
      'react-router@4.2.0',
      'react-router-dom@4.2.2',
      'react-scripts',
      'react-transition-group@^1.1.2',
      'reactstrap@4.8.0',
      'redux@3.7.2',
      'redux-form@7.0.4',
      'redux-logger@3.0.6',
      'redux-thunk@2.2.0'
    ]);
  }


};