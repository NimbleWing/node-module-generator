import Fs from 'fs';

export default async (context, { githubUserName, moduleName, scopeName } = {}) => {
  const { logger } = context;
  logger.log('Start update package.json');
  const pkgData = JSON.parse(Fs.readFileSync('./package.json'));
  pkgData.name = `${scopeName}/${moduleName}`;
  delete pkgData.bin;
  pkgData.repository = {
    type: 'git',
    url: `git+https://github.com/${githubUserName}/${moduleName}.git`,
  };
  pkgData.author = `${githubUserName} (http://github.com/${githubUserName})`;
  pkgData.bugs = {
    url: `https://github.com/${githubUserName}/${moduleName}/issues`,
  };
  pkgData.homepage = `https://github.com/${githubUserName}/${moduleName}#readme`;
  Fs.writeFileSync('./package.json', JSON.stringify(pkgData, null, 2));
  logger.success('Completed update package.json');
};
