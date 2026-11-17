const { cpSync, mkdirSync } = require('fs');

mkdirSync('public', { recursive: true });
for (const file of ['index.html', 'style.css', 'script.js', 'logo.png', 'whatsapp.svg', 'whatsapplogo.png', 'robots.txt', 'sitemap.xml', 'site.webmanifest']) {
  cpSync(file, `public/${file}`);
}
cpSync('assets', 'public/assets', { recursive: true });
for (const slug of ['guincho-24-horas', 'reboque-pesado', 'reboque-extra-pesado', 'reboque-mega-pesado', 'destombamento', 'reboque-de-veiculos']) {
  cpSync(slug, `public/${slug}`, { recursive: true });
}
