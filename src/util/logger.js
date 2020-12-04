import { Signale } from 'signale';
import Figures from 'figures';

export default ({ stdout, stderr }) => new Signale({
  config: {
    displayTimestamp: true,
    underlineMessage: false,
    displayLabel: false,
  },
  disabled: false,
  interactive: false,
  scope: 'node-module-generator',
  stream: [stdout],
  types: {
    error: {
      badge: Figures.cross,
      color: 'red',
      label: '',
      stream: [stderr],
    },
    log: {
      badge: Figures.info,
      color: 'magenta',
      label: '',
      stream: [stdout],
    },
    success: {
      badge: Figures.tick,
      color: 'green',
      label: '',
      stream: [stdout],
    },
  },
});
