const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

const root = __dirname;
const base = 'https://www.autosocorrocafe.com.br';
const slugs = ['', 'guincho-24-horas', 'reboque-pesado', 'reboque-extra-pesado', 'reboque-mega-pesado', 'destombamento', 'reboque-de-veiculos'];
const titles = new Set();
const descriptions = new Set();

for (const slug of slugs) {
  const pathname = slug ? `${slug}/index.html` : 'index.html';
  const html = readFileSync(join(root, pathname), 'utf8');
  const url = `${base}/${slug ? `${slug}/` : ''}`;
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const schema = html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)?.[1];
  if (html.includes('CafÃ©') || html.includes('TimÃ³teo') || html.includes('\uFFFD')) throw new Error(`Encoding error: ${pathname}`);
  if (!title || titles.has(title)) throw new Error(`Missing or duplicate title: ${pathname}`);
  if (!description || descriptions.has(description)) throw new Error(`Missing or duplicate description: ${pathname}`);
  if (canonical !== url) throw new Error(`Incorrect canonical: ${pathname}`);
  if ((html.match(/<h1\b/g) || []).length !== 1) throw new Error(`Expected one H1: ${pathname}`);
  if (!schema) throw new Error(`Missing schema: ${pathname}`);
  const graph = JSON.parse(schema)['@graph'];
  const company = graph.find(item => item['@id'] === `${base}/#empresa`);
  if (company?.['@type'] !== 'LocalBusiness' || company.address?.addressLocality !== 'Timóteo' || company.telephone?.length !== 3 || company.openingHoursSpecification?.dayOfWeek?.length !== 7) {
    throw new Error(`Incomplete confirmed business details: ${pathname}`);
  }
  titles.add(title);
  descriptions.add(description);

  if (slug) {
    const service = graph.find(item => item['@type'] === 'Service');
    const breadcrumb = graph.find(item => item['@type'] === 'BreadcrumbList');
    if (service?.provider?.['@id'] !== `${base}/#empresa` || breadcrumb?.itemListElement?.[1]?.item !== url) {
      throw new Error(`Broken service entity or breadcrumb: ${pathname}`);
    }
  }
  for (const match of html.matchAll(/https:\/\/wa\.me\/5531997856734\?text=([^"\s<]+)/g)) {
    const message = decodeURIComponent(match[1]);
    if (message.includes('\u00C3') || message.includes('\uFFFD')) throw new Error(`Broken WhatsApp message encoding: ${pathname}`);
  }

  for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
    const target = match[1].split(/[?#]/)[0];
    if (!target || target === '/') continue;
    const file = join(root, target, target.endsWith('/') ? 'index.html' : '');
    if (!existsSync(file)) throw new Error(`Broken local reference ${target} in ${pathname}`);
  }
}

const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const homeHtml = readFileSync(join(root, 'index.html'), 'utf8');
if (!homeHtml.includes('GUINCHO EM<br><em>TIMÓTEO') || !homeHtml.includes('id="atendimento-timoteo"')) {
  throw new Error('The home does not emphasize guincho em Timóteo');
}
for (const slug of slugs) {
  const url = `${base}/${slug ? `${slug}/` : ''}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) throw new Error(`Missing sitemap URL: ${url}`);
  if (slug && !homeHtml.includes(`href="/${slug}/"`)) throw new Error(`Service link missing from home: ${slug}`);
}
console.log(`Verified ${slugs.length} pages: unique metadata, canonicals, H1, JSON-LD relationships, WhatsApp encoding, local links and sitemap.`);
