import { execFile } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { promisify } from 'node:util';

const profileUrl = 'https://scholar.google.com/citations?user=kzBPdVgAAAAJ&hl=en';
const outputUrl = new URL('../public/scholar.json', import.meta.url);
const execFileAsync = promisify(execFile);
const requestHeaders = {
  'accept-language': 'en-US,en;q=0.9',
  'user-agent': 'Mozilla/5.0 (compatible; lokinko.github.io citation updater; +https://lokinko.github.io)',
};
const fallback = {
  citations: 104,
  source: 'Google Scholar',
  profileUrl,
  updatedAt: '2026-04-27T13:46:08Z',
};

function extractCitationCount(html) {
  const decoded = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&');
  const metaMatch = decoded.match(/Cited by\s+([\d,]+)/i);

  if (metaMatch) {
    return Number(metaMatch[1].replaceAll(',', ''));
  }

  const tableMatch = decoded.match(/<td class="gsc_rsb_std">([\d,]+)<\/td>/i);

  if (tableMatch) {
    return Number(tableMatch[1].replaceAll(',', ''));
  }

  return null;
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(outputUrl, 'utf8'));
  } catch {
    return null;
  }
}

async function writeCitationData(data) {
  await mkdir(dirname(outputUrl.pathname), { recursive: true });
  await writeFile(outputUrl, `${JSON.stringify(data, null, 2)}\n`);
}

async function fetchProfileWithCurl() {
  const { stdout } = await execFileAsync(
    'curl',
    [
      '--fail',
      '--silent',
      '--show-error',
      '--location',
      '--max-time',
      '20',
      '--user-agent',
      requestHeaders['user-agent'],
      '--header',
      `Accept-Language: ${requestHeaders['accept-language']}`,
      profileUrl,
    ],
    { maxBuffer: 5 * 1024 * 1024 },
  );

  return stdout;
}

async function fetchProfileHtml() {
  try {
    const response = await fetch(profileUrl, { headers: requestHeaders });

    if (!response.ok) {
      throw new Error(`Google Scholar returned ${response.status}`);
    }

    return response.text();
  } catch (error) {
    console.warn(`Node fetch failed, retrying with curl: ${error.message}`);
    return fetchProfileWithCurl();
  }
}

async function main() {
  const existing = await readExisting();

  try {
    const citations = extractCitationCount(await fetchProfileHtml());

    if (typeof citations !== 'number' || Number.isNaN(citations)) {
      throw new Error('Could not find a citation count in the Scholar profile');
    }

    await writeCitationData({
      citations,
      source: 'Google Scholar',
      profileUrl,
      updatedAt: new Date().toISOString(),
    });
    console.log(`Updated Google Scholar citations: ${citations}`);
  } catch (error) {
    const data = existing ?? fallback;
    await writeCitationData(data);
    console.warn(`Keeping existing Scholar citation data: ${error.message}`);
  }
}

await main();
