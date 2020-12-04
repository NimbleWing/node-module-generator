import askScope from './npm';
import askGithubUserName from './github';
import askMoudleName from './module';
import askLicense from './license';

const questions = [
  askScope,
  askGithubUserName,
  askMoudleName,
  askLicense,
];
export default questions;
