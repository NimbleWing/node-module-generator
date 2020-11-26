import Ora from 'ora';
import Chalk from 'chalk';

const spinner = Ora();
let lastMsg = null;
let isPaused = false;
function logWithSpinner($symbol, $msg) {
  let symbol = $symbol;
  let msg = $msg;
  if (!msg) {
    msg = symbol;
    symbol = Chalk.green('✔');
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  }
  spinner.text = `  ${msg}`;
  lastMsg = {
    symbol: `${symbol}  `,
    text: msg,
  };
  spinner.start();
}
function stopSpinner($persist) {
  if (!spinner.isSpinning) {
    return;
  }
  if (lastMsg && $persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
}
function pauseSpinner() {
  if (spinner.isSpinning) {
    spinner.stop();
    isPaused = true;
  }
}
function resumeSpinner() {
  if (isPaused) {
    spinner.start();
    isPaused = false;
  }
}
function failSpinner($text) {
  spinner.fail($text);
}
export {
  logWithSpinner,
  stopSpinner,
  pauseSpinner,
  resumeSpinner,
  failSpinner,
};
