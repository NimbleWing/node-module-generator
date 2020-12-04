import DownloadGithubRepo from 'download-github-repo';

export default async (destination) => new Promise((resolve, reject) => {
  DownloadGithubRepo('NimbleWing/node-module-template#main', destination, (err) => {
    if (err) {
      return reject(err);
    }
    return resolve();
  });
});
