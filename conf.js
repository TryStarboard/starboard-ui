'use strict';

const convict = require('convict');

const conf = convict({
  env: {
    env: 'NODE_ENV',
    default: 'development',
    format: ['development', 'test', 'production'],
  },
  websocket: {
    host: {
      env: 'WEBSOCKET_HOST',
      default: 'http://localhost:10010',
    }
  },
  mixpanel: {
    token: {
      env: 'MIXPANEL_TOKEN',
      default: null,
      format(val) {
        if (conf.get('env') === 'production' && !val) {
          throw new Error('must be defined');
        }
      },
    }
  },
});

conf.validate({strict: true});

module.exports = conf;
