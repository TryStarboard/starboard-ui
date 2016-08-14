/*global MIXPANEL_TOKEN*/

import mixpanel from 'mixpanel-browser'

let mix

if (MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN) // Token is defined in webpack.config
  mix = mixpanel
} else {
  mix = new Proxy({}, {
    get(target, property, receiver) {
      return function (...args) {
        console.log(`---> calling "${property}" on mixpanel with arguments:\n${JSON.stringify(args, null, 4)}`)
      }
    }
  })
}

export {mix as default}
