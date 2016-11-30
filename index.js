#!/usr/bin/env node
const { makeDir, createFile, capitalize } = require('./helpers.js');

const actions = {
  'help': help,
  'config': () => console.log('Ups :( Work in progress'),
  'g': generate,
  'generate': generate
}

const action = actions[process.argv[2]];

if (action) {
  action();
} else {
  throw 'error';
}

function help() {
  const message = `
  BO Angular Generator
  --------------------
  Commands:
  * help
  * config
  * g / generate
    ** component componentName
    ** service serviceName
    ** directive directiveName`;

  console.log(message);
}

function generate() {
  const actions = {
    'component': generateComponent,
    'directive': generateDirective,
    'service': generateService
  }

  const action = actions[process.argv[3]];
  const name = process.argv[4];

  if (!action) {
    help();
    throw 'Wrong action name';
  }

  if (!name) {
    help();
    throw `Enter ${action} name`
  }

  action(name);
}

function generateComponent(name) {
  const templates = {
    js: [
      `app.component('bo${capitalize(name)}', {`,
      `  styles: require('./${name}.scss'),`,
      `  template: require('./${name}.html'),`,
      `  bindings: { },`,
      `  controller: function($scope) {`,
      `    this.ngOnit = function() { };`,
      `  }`,
      `});`
    ].join('\n'),
    css: '',
    html: `<div>bo${capitalize(name)} works fine!</div>`
  };

  makeDir(name);

  createFile(`./${name}/${name}.js`, templates.js);
  createFile(`./${name}/${name}.scss`, templates.css);
  createFile(`./${name}/${name}.html`, templates.html);
}

function generateDirective(name) {
  const templates = {
    js: [
      `app.directive('bo${capitalize(name)}', () => {`,
      `  resctict: 'A',`,
      `  link: function($scope, $element, $attributes) {`,
      `    console.log('bo${capitalize(name)} works fine!');`,
      `  }`,
      `});`
    ].join('\n')
  };

  makeDir(name);

  createFile(`./${name}/${name}.js`, templates.js);
}

function generateService(name) {
  const templates = {
    js: [
      `app.service('${name}', function() {`,
      `  return {};`,
      `});`
    ].join('\n')
  };

  makeDir(name);

  createFile(`./${name}/${name}.js`, templates.js);
}
