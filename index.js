/* eslint-env node */
'use strict';

const path = require('path');
const fastbootTransform = require('fastboot-transform');
const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-classlist-polyfill',

  included(app) {

    // @todo add support for older ember-cli
    this.import('vendor/classlist-polyfill/index.js');
  },

  treeForVendor() {
    let modulePath = path.dirname(require.resolve('classlist-polyfill'));
    let vendorTree = new Funnel(modulePath, {
      destDir: 'classlist-polyfill'
    });

    return fastbootTransform(vendorTree);
  }
};
