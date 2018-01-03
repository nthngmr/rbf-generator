
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

    this.argument('foldername', { type: String, required: false });
    this.log('folder name', this.options.foldername);
    mkdirp.sync(this.destinationPath(`${this.options.foldername}-native`));
    this.destinationRoot(`${this.options.foldername}-native`);

    this.option('babel'); // This method adds support for a `--babel` flag
  }


  createReactNativeApp() {
    this.spawnCommandSync('create-react-native-app', ['.']);
  }

  copyFiles() {
    
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationPath(''),
      {
        globOptions: {
          ignore: [
            this.templatePath('firebase.js')
          ]
        }
      }
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
      '@expo/vector-icons@^6.2.2',
      'firebase@^4.6.2',
      'lodash@^4.17.4',
      'moment@^2.18.1',
      'native-base@^2.3.5',
      'query-string@^5.0.0',
      'react-native-clean-form',
      'react-native-vector-icons',
      'react-redux@^5.0.6',
      'redux@^3.7.2',
      'redux-form@^7.0.4',
      'redux-logger@^3.0.6',
      'redux-thunk@^2.2.0',
      'styled-components'
    ]); 
  }

  ejectTheme() {
    this.spawnCommandSync('node node_modules/native-base/ejectTheme.js', ['.']);
  }


};