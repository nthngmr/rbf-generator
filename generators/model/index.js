
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
  constructor(args, opts) {
    super(args, opts);
  }


  initialQuestions() {
    return this.prompt([{
      type    : 'input',
      name    : 'modelSingular',
      message : 'Model name (singular)',
      validate : (val) => {
        return _.isString(val);
      }
    },{
      type    : 'input',
      name    : 'modelPlural',
      message : 'Model name (plural)',
      validate : (val) => {
        return _.isString(val);
      }
    }]).then((answers) => {
      _.each(answers, (answer, key) => { this[key] = answer });
    });
  }


  writing() {
   
    this.fs.copyTpl(
      this.templatePath('actions.js'),
      this.destinationPath(`src/actions/${this.modelPlural}.js`),
      { modelSingular: this.modelSingular, modelPlural: this.modelPlural }
    );
    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(`src/reducers/${this.modelPlural}.js`),
      { modelSingular: this.modelSingular, modelPlural: this.modelPlural }
    );
  }


};