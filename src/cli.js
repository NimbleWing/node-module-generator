import { argv } from 'process';
import Debug from 'debug';
import Yargs from 'yargs';
import Init from '.';

export default async () => {
  const cli = Yargs.command('$0', 'Run node module generating', (yargs) => {
    yargs.demandCommand(0, 0).usage(`Run node module generating
    Usage:
    node-module-generator [options]`);
  })
    .option('debug', { describe: 'Output debugging information', type: 'boolean', group: 'Options' })
    .option('h', { alias: 'help', group: 'Options' })
    .option('v', { alias: 'version', group: 'Options' })
    .strict(false)
    .exitProcess(false);
  try {
    const { help, version, ...options } = cli.parse(argv.slice(2));
    if (Boolean(help) || Boolean(version)) {
      return 0;
    }
    if (options.debug) {
      Debug.enable('node-module-generator:*');
    }
    await Init();
    return 0;
  } catch (error) {
    return 1;
  }
};
