import Fs from 'fs';

export default async (context, { githubUserName, moduleName } = {}) => {
  const { logger } = context;
  logger.log('Start update .releaserc.json');
  const rcData = JSON.parse(Fs.readFileSync('./.releaserc.json'));
  rcData.repositoryUrl = `https://github.com/${githubUserName}/${moduleName}`;
  Fs.writeFileSync('./.releaserc.json', JSON.stringify(rcData, null, 2));
  logger.success('Completed update .releaserc.json');
};
