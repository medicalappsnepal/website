import fs from 'fs';
import { parse } from 'node-html-parser';

const html = fs.readFileSync('decoded.html', 'utf8');
const root = parse(html);

const textElements = root.querySelectorAll('p, h1, h2, h3, li');
textElements.forEach(el => {
  const text = el.text.trim();
  if (text) console.log(text);
});
