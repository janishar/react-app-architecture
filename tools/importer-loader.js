module.exports = function (source) {
  if (!this.query.functionName)
    throw new Error('Provide the functionName in options for this loader');

  const regex = new RegExp(`${this.query.functionName}\\((.*)\\)`, 'g');

  const results = [];
  let match = null;

  if (regex.global) {
    while ((match = regex.exec(source))) {
      results.push(match);
    }
  } else {
    if ((match = regex.exec(source))) {
      results.push(match);
    }
  }

  const entries = results.map((result) => result[1].trim());
  const filtered = entries.filter(
    (entry) =>
      (entry.startsWith('"') && entry.endsWith('"')) ||
      (entry.startsWith("'") && entry.endsWith("'")) ||
      (entry.startsWith('`') && entry.endsWith('`')),
  );
  const transformed = filtered.map((entry) => `import ${entry};`);
  const output = transformed.join('\r\n');

  return output + '\n' + source;
};
