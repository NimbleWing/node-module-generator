import Inquirer from 'inquirer';
import Questions from './questions';

export default async () => {
  const answers = await Inquirer.prompt(Questions);
  return answers;
};
