
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

    this.argument('page', { type: String, required: true });

  }




  writing() {

    let page = this.options.page[0].toUpperCase() + this.options.page.substring(1))
   
    this.fs.copyTpl(
      this.templatePath('page.js'),
      this.destinationPath(`src/pages/${page.toLowerCase()}-page/${page}Page.js`),
      { page }
    );
    this.fs.copyTpl(
      this.templatePath('styles.css'),
      this.destinationPath(`src/pages/${page.toLowerCase()}-page/${page}Page.css`),
      { page }
    );
    this.fs.copyTpl(
      this.templatePath('styles.css'),
      this.destinationPath(`src/pages/${page.toLowerCase()}-page/${page}PageContainer.js`),
      { page }
    );
  }


};