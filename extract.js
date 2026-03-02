import fs from 'fs';

const html = fs.readFileSync('pp.html', 'utf8');
const match = html.match(/&lt;html.*?&lt;\/html&gt;/is);
if (match) {
  const decoded = match[0]
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  fs.writeFileSync('decoded.html', decoded);
  console.log('Decoded HTML saved to decoded.html');
} else {
  console.log('No encoded HTML found');
  // Let's try another regex
  const match2 = html.match(/\\u003c.*?\\u003e/g);
  if (match2) {
    console.log('Found unicode encoded HTML');
  }
}
