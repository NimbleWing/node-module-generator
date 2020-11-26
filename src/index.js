import Figlet from 'figlet';
import Chalk from 'chalk';
import Inquirer from 'inquirer';
import Fs from 'fs';
import Pkg from '../package.json';
import loadTemplate from './util/loadTemplate';
import {
  logWithSpinner,
  stopSpinner,
  failSpinner,
} from './util/spinner';

console.log(Chalk.yellow.bold(Figlet.textSync(Pkg.name.split('/')[1])));
console.log(Chalk.yellow.bold(`version: ${Pkg.version}`));
async function rewritePackageFile($githubName, $moduleName) {
  const pkgData = JSON.parse(Fs.readFileSync('./package.json'));
  pkgData.name = $moduleName;
  delete pkgData.bin;
  pkgData.repository = {
    type: 'git',
    url: `git+https://github.com/${$githubName}/${$moduleName}.git`,
  };
  pkgData.author = `${$githubName} (http://github.com/${$githubName})`;
  pkgData.bugs = {
    url: `https://github.com/${$githubName}/${$moduleName}/issues`,
  };
  pkgData.homepage = `https://github.com/${$githubName}/${$moduleName}#readme`;
  Fs.writeFileSync('./package.json', JSON.stringify(pkgData, null, 2));
}
(async () => {
  try {
    const questions = [
      {
        type: 'input',
        name: 'githubName',
        message: 'What\'s your github name',
      },
      {
        type: 'input',
        name: 'nodeModuleName',
        message: 'What\'s your node module name',
      },
    ];
    const answers = await Inquirer.prompt(questions);
    logWithSpinner('Loading template');
    await loadTemplate('./');
    stopSpinner();
    await rewritePackageFile(answers.githubName, answers.nodeModuleName);
  } catch (error) {
    failSpinner('Load template failed');
    console.log(error);
  }
})();
