
'use strict';
const path = require('path');
const Generator = require('yeoman-generator');
const askName = require('inquirer-npm-name');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');
const https = require("https");
const fetch = require("node-fetch");
const opn = require('opn');
const firebaseTools = require('firebase-tools');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('foldername', { type: String, required: false });
    console.log("_.isUndefined(this.options.foldername", _.isUndefined(this.options.foldername), "this.determineAppname()", this.determineAppname())


    this.option('babel'); // This method adds support for a `--babel` flag


  }

  initializing() {
    if (_.isUndefined(this.options.foldername)) {
      this.options.foldername = this.determineAppname();
      this.firebaseSlug = `${this.options.foldername}-web`;
    } else {
      this.destinationRoot(this.options.foldername);
    }
    this.appname = this.options.foldername;
    this.log('folder name', this.options.foldername);
    mkdirp.sync(this.destinationPath(`${this.options.foldername}-web`));
    this.destinationRoot(`${this.options.foldername}-web`);

    let done = this.async();

    let self = this;

    let needFirebase = () => {
      this.prompt([{
        type    : 'confirm',
        name    : 'existingFirebase',
        message : 'Have you created an app in Firebase yet?'
      }]).then((answers) => {
        if (answers.existingFirebase) {
          firebaseTools.list()
            .then((data) => {
              return this.prompt([{
                type    : 'list',
                name    : 'currentFirebase',
                message : 'Choose the app from the following list:',
                choices : _.map(data, (firebase) => { return _.merge(firebase, {value: firebase}) })
              }])
            })
            .catch((err) => {
              console.log('firebaseTools.list error', err)
            })
            .then((answers) => {
              console.log("chose firebase: ", answers.currentFirebase);
              self.appname = answers.currentFirebase.name;
              self.firebaseSlug = answers.currentFirebase.id;
              console.log("self.destinationRoot()", self.destinationRoot());
              return firebaseTools.init('firestore', {cwd: self.destinationRoot()}).then((blah) => { return answers.currentFirebase });
            })
            .then((currentFirebase) => {
              console.log('currentFirebase', currentFirebase)
              return firebaseTools.use({project: currentFirebase.id}, {projectRoot: self.destinationRoot()});
            })
            .then(firebaseTools.setup.web)
            .then((setup) => {
              console.log('setup', setup, arguments)
              done(null);
            }).catch((err) => {
              console.log('firebaseTools.setup.web error', err)
            });
        } else {
          opn('https://console.firebase.google.com/', {wait:false}).then(() => {
            console.log("Create a firebase and return back here", answers.existingFirebase);
            needFirebase();
          })
        }
      });
    }

    needFirebase();

  }

  prompting() {
    console.log('prompting', arguments);
    return this.prompt([{
      type    : 'input',
      name    : 'appname',
      message : 'Your project name',
      default : this.appname, // Default to current folder name
      validate : (val) => {
        return _.isString(val);
      }
    },{
      type    : 'input',
      name    : 'firebaseSlug',
      message : 'Your firebase app slug',
      default : this.firebaseSlug,
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

  install() {
    this.yarnInstall([
      'bootstrap@^4.0.0-beta',
      'firebase@^4.6.2',
      'lodash@^4.17.4',
      'moment@^2.18.1',
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
    ]);
  }




};
