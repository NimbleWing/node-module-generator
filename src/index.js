import Figlet from 'figlet';
import Chalk from 'chalk';
import Pkg from '../package.json';


console.log(Chalk.yellow.bold(Figlet.textSync(Pkg.name.split('/')[1])));
console.log(Chalk.yellow.bold(`version: ${Pkg.version}`));

