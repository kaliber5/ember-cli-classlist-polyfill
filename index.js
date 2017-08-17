/* eslint-env node */
'use strict';

const path = require('path');
const fastbootTransform = require('fastboot-transform');
const Funnel = require('broccoli-funnel');

function findHostShim() {
  let current = this;
  let app;
  do {
    app = current.app || app;
  } while (current.parent.parent && (current = current.parent));
  return app;
}

module.exports = {
  name: 'ember-cli-classlist-polyfill',

  included() {

    // polyfill `this.import` if required
    let _import = this.import || function(asset, options) {
      let app = findHostShim.call(this);
      app.import(asset, options);
    };

    _import.call(this, 'vendor/classlist-polyfill/index.js');
  },

  treeForVendor() {
    let modulePath = path.dirname(require.resolve('classlist-polyfill'));
    let vendorTree = new Funnel(modulePath, {
      destDir: 'classlist-polyfill'
    });

    return fastbootTransform(vendorTree);
  }
};
