const path = require('path');
const fs = require('fs');

module.exports = function generate(plop) {
  plop.setGenerator('module', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in PascalCase (e.g. ErrorModal)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'app/src/components'),
        base: '.blueprints/module',
        templateFiles: '.blueprints/module/**/**',
      },
    ],
  });
  plop.setGenerator('feature', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in camelCase (e.g. myFeature)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'app/src/features'),
        base: '.blueprints/feature',
        templateFiles: '.blueprints/feature/**/**',
      },
    ],
  });

  plop.setActionType('addToDbFile', function (answers, config, plop) {
    const targetPath = path.join(__dirname, 'api/src/db.ts');
    let content = fs.readFileSync(targetPath, 'utf8');
    content = content.replace(
      /( *)(\/\/ APPEND)/,
      `$1require('./collections/${answers.name}')\n$1$2`
    );
    fs.writeFileSync(targetPath, content);
  });

  plop.setActionType('addToResolversFile', function (answers, config, plop) {
    const targetPath = path.join(__dirname, 'api/src/resolvers/index.ts');
    let content = fs.readFileSync(targetPath, 'utf8');
    content = content.replace(
      /( *)(\/\/ APPEND)/,
      `$1require('./${answers.name}').resolvers,\n$1$2`
    );
    fs.writeFileSync(targetPath, content);
  });

  plop.setGenerator('collection', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in PascalCase (e.g. SolutionVote)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'api/src/collections'),
        base: '.blueprints/collection',
        templateFiles: '.blueprints/collection/**/**',
      },
      {
        type: 'addToDbFile',
      },
    ],
  });

  plop.setGenerator('resolver', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'choose feature name in PascalCase (e.g. SolutionVote)',
        basePath: '.',
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(__dirname, 'api/src/resolvers'),
        base: '.blueprints/resolver',
        templateFiles: '.blueprints/resolver/**/**',
      },
      {
        type: 'addToResolversFile',
      },
    ],
  });
};
