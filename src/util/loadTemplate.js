import DownloadGithubRepo from 'download-github-repo';

async function loadTemplate($dest) {
  return new Promise(($resolve, $reject) => {
    DownloadGithubRepo('NimbleWing/node-module-template#main', $dest, ($err) => {
      if ($err) {
        $reject($err);
      }
      $resolve();
    });
  });
}
export default loadTemplate;
