const { cpSync, mkdirSync } = require('fs');

mkdirSync('public', { recursive: true });
for (const file of ['index.html', 'style.css', 'script.js', 'logo.png', 'robots.txt', 'sitemap.xml', 'site.webmanifest']) {
  cpSync(file, `public/${file}`);
}
cpSync('assets', 'public/assets', { recursive: true });
