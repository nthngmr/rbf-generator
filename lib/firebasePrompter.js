const opn = require('opn');
const firebaseTools = require('firebase-tools');
const _ = require('lodash');

const firebasePrompt = (self, done) => {
  self.prompt([{
    type    : 'confirm',
    name    : 'existingFirebase',
    message : 'Did you created a new project in the Firebase console yet?'
  }]).then((answers) => {
    if (answers.existingFirebase) {
      firebaseTools.list()
        .then((data) => {
          return self.prompt([{
            type    : 'list',
            name    : 'currentFirebase',
            message : 'Choose the app from the following list:',
            choices : _.map(data, (firebase) => { return _.merge(firebase, {value: firebase}) })
          }])
        })
        .then((answers) => {
          self.currentFirebase = answers.currentFirebase;
          self.currentFirebase.project = self.currentFirebase.id;
          self.appname = self.currentFirebase.name;
          self.firebaseSlug = self.currentFirebase.id;
          return firebaseTools.setup.web({project: self.currentFirebase.id})
        })
        .then((setup) => {
          self.currentFirebase = _.merge(self.currentFirebase, setup);
          done(null);
        }).catch((err) => {
          self.log(err)
        });
    } else {
      if (!self.saidNoAlready) {
        opn('https://console.firebase.google.com/', {wait:false}).then(() => {
            self.saidNoAlready = true;
            firebasePrompt(self, done);
        })
      } else {
        self.log("Thanks for wasting my time.")
        process.exit(1);
      }
    }
  });
}

module.exports = firebasePrompt;
