const fs = require('fs');

module.exports = {
  makeDir: function(path) {
    try {
      fs.mkdirSync(path)
    } catch(e) {
      throw e;
    }
  },

  createFile: function(name, inner) {
    fs.writeFile(name, inner, function(err) {
      if (err) {
        return console.log(err);
      }
    });
  },

  capitalize: function(s) {
    return s && s[0].toUpperCase() + s.slice(1);
  }
}
