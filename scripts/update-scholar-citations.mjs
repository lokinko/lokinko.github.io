import { execFile } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const profileUrl = 'https://scholar.google.com/citations?user=kzBPdVgAAAAJ&hl=en';
const outputUrl = new URL('../public/scholar.json', import.meta.url);
const scriptPath = fileURLToPath(import.meta.url);
const execFileAsync = promisify(execFile);
const requestHeaders = {
  'accept-language': 'en-US,en;q=0.9',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
};
const fallback = {
  citations: 104,
  source: 'Google Scholar',
  profileUrl,
  updatedAt: '2026-04-27T13:46:08Z',
};

export function getOutputPath() {
  return fileURLToPath(outputUrl);
}

export function extractCitationCount(html) {
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

export function getCurlArgs(platform = process.platform) {
  return [
    '--silent',
    '--show-error',
    '--location',
    '--max-time',
    '20',
    ...(platform === 'win32' ? ['--ssl-no-revoke'] : []),
    '--user-agent',
    requestHeaders['user-agent'],
    '--header',
    `Accept-Language: ${requestHeaders['accept-language']}`,
    profileUrl,
  ];
}

export function formatGithubAnnotation(level, title, message) {
  const escapedMessage = String(message)
    .replaceAll('%', '%25')
    .replaceAll('\r', '%0D')
    .replaceAll('\n', '%0A');

  return `::${level} title=${title}::${escapedMessage}`;
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(getOutputPath(), 'utf8'));
  } catch {
    return null;
  }
}

async function writeCitationData(data) {
  const outputPath = getOutputPath();

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`);
}

async function fetchProfileWithCurl() {
  const { stdout } = await execFileAsync(
    'curl',
    getCurlArgs(),
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
    console.warn(formatGithubAnnotation('warning', 'Google Scholar update failed', error.message));
    console.warn(`Keeping existing Scholar citation data: ${error.message}`);
  }
}

if (process.argv[1] === scriptPath) {
  await main();
}
