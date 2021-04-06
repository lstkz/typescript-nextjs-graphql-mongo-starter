const path = require('path');
const fs = require('fs');

module.exports = function generate(plop) {
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
    const dbFilePath = path.join(__dirname, 'api/src/db.ts');
    let dbFile = fs.readFileSync(dbFilePath, 'utf8');
    dbFile = dbFile.replace(
      / *\/\/ APPEND/,
      `    require('./collections/${answers.name}')\n$&`
    );
    console.log(dbFile);
    fs.writeFileSync(dbFilePath, dbFile);
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
};
