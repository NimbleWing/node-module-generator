import Figlet from 'figlet';
import Chalk from 'chalk';
import Pkg from '../package.json';
import loadTemplate from './util/loadTemplate';
import {
  logWithSpinner,
  stopSpinner,
  failSpinner,
} from './util/spinner';

console.log(Chalk.yellow.bold(Figlet.textSync(Pkg.name.split('/')[1])));
console.log(Chalk.yellow.bold(`version: ${Pkg.version}`));

(async () => {
  try {
    logWithSpinner('Loading template');
    await loadTemplate('./');
    stopSpinner();
  } catch (error) {
    failSpinner('Load template failed');
    console.log(error);
  }
})();
