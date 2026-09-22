const fs = require('fs');

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const funcs = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isFunc = /function\s+([a-zA-Z0-9_$]+)/.test(line) ||
                   /(const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(async\s*)?\([^)]*\)\s*=>/.test(line) ||
                   /app\.(get|post|put|delete|patch)\(/.test(line);

    if (isFunc && line.includes('{')) {
      let depth = 0;
      let start = i;
      let end = i;
      let body = [];
      for (let j = i; j < lines.length; j++) {
        const l = lines[j];
        for (let char of l) {
          if (char === '{') depth++;
          if (char === '}') depth--;
        }
        body.push(l);
        if (depth === 0) {
          end = j;
          break;
        }
      }

      const code = body.join('\n');
      const loc = end - start + 1;
      const branchMatches = (code.match(/\b(if|else\s+if|switch|case|while|for|catch)\b/g) || []).length;
      const opMatches = (code.match(/(\?\s*[^:]+:|&&|\|\|)/g) || []).length;
      const cc = branchMatches + opMatches + 1;

      let name = 'anonymous';
      const m1 = line.match(/function\s+([a-zA-Z0-9_$]+)/);
      const m2 = line.match(/(const|let|var)\s+([a-zA-Z0-9_$]+)\s*=/);
      const m3 = line.match(/app\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`]/);
      if (m1) name = m1[1];
      else if (m2) name = m2[2];
      else if (m3) name = `${m3[1].toUpperCase()} ${m3[2]}`;

      if (cc > 10 || loc > 50) {
        funcs.push({
          name,
          startLine: start + 1,
          endLine: end + 1,
          loc,
          cc
        });
      }
    }
  }
  return funcs;
}

const list = analyzeFile('edu-learn-project/backend/index.js');
console.log('Total violations in backend/index.js:', list.length);
list.forEach(f => {
  console.log(`[L${f.startLine}-L${f.endLine}] ${f.name} | CC: ${f.cc} | LOC: ${f.loc}`);
});
