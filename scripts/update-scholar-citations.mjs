import { execFile } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
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

export async function updateScholarCitations({
  fetchProfileHtml: fetchHtml = fetchProfileHtml,
  writeCitationData: writeData = writeCitationData,
  now = () => new Date(),
} = {}) {
  const citations = extractCitationCount(await fetchHtml());

  if (typeof citations !== 'number' || Number.isNaN(citations)) {
    throw new Error('Could not find a citation count in the Scholar profile');
  }

  await writeData({
    citations,
    source: 'Google Scholar',
    profileUrl,
    updatedAt: now().toISOString(),
  });

  return citations;
}

async function main() {
  try {
    const citations = await updateScholarCitations();
    console.log(`Updated Google Scholar citations: ${citations}`);
  } catch (error) {
    console.error(formatGithubAnnotation('error', 'Google Scholar update failed', error.message));
    console.error(`Google Scholar update failed: ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] === scriptPath) {
  await main();
}
