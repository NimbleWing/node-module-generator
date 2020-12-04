import Fs from 'fs';
import Ejs from 'ejs';
import { startCase } from 'lodash';

export default async (context, {
  scopeName, githubUserName, moduleName, license,
} = {}) => {
  const { logger } = context;
  logger.log('Start update README.md');
  const template = await Fs.readFileSync('./README.md', 'utf8');
  let content;
  try {
    content = Ejs.render(template, {
      scopeName,
      githubUserName,
      moduleName,
      license,
      title: startCase(moduleName),
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }

  Fs.writeFileSync('./README.md', content);
  logger.success('Completed update README.md');
};
