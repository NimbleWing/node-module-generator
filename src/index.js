import Pkg from '../package.json';
import Logger from './util/logger';
import AskQuestions from './askQuestions';
import loadTemplate from './fetures/template';
import updateReadme from './fetures/readme';
import updateReleaseConfig from './fetures/release';
import updatePackage from './fetures/package';
import {
  logWithSpinner,
  stopSpinner,
} from './util/spinner';

async function run(context) {
  const { logger } = context;
  const answers = await AskQuestions();
  logWithSpinner('Loading template');
  await loadTemplate('./');
  stopSpinner();
  logger.success('Download template successfully!');
  await updateReadme(context, answers);
  await updateReleaseConfig(context, answers);
  await updatePackage(context, answers);
}

export default async (
  {
    cwd = process.cwd, env = process.env, stdout, stderr,
  } = {},
) => {
  const context = {
    cwd,
    env,
    stdout: stdout || process.stdout,
    stderr: stderr || process.stderr,
  };
  context.logger = Logger(context);
  context.logger.log(`Running ${Pkg.name} version ${Pkg.version}`);
  await run(context);
};
