const fs = require('fs');
const path = require('path');

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          if (!file.includes('node_modules') && !file.includes('.git')) {
            walk(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            if (!--pending) done(null, results);
          }
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
}

walk(__dirname, (err, files) => {
  files.filter(f => f.endsWith('.mjs') || f.endsWith('.js')).forEach(file => {
    const code = fs.readFileSync(file, 'utf-8');
    const imports = [
      ...code.matchAll(/import\s+.*?\s+from\s+['"](.*?)['"]/g),
      ...code.matchAll(/import\(['"](.*?)['"]\)/g)
    ];
    imports.forEach(match => {
      const imp = match[1];
      if (imp.endsWith('.json')) {
        const resolved = path.resolve(path.dirname(file), imp);
        if (!fs.existsSync(resolved)) {
          console.log('Stubbing:', resolved);
          fs.mkdirSync(path.dirname(resolved), { recursive: true });
          if (imp.includes('array') || imp.includes('list') || imp.includes('bays') || imp.includes('stations') || imp.includes('stops') || imp.includes('regions') || imp.includes('destinations') || imp.includes('consists')) {
            fs.writeFileSync(resolved, '[]');
          } else {
            fs.writeFileSync(resolved, '{}');
          }
        }
      }
    });
  });
});
