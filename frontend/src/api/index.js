const files = require.context('.', false, /\.js$/)
const apiModules = {}
files.keys().forEach((key) => {
  if (key === './index.js') {
    return
  }
  apiModules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
export default apiModules
