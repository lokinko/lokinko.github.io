import assert from 'node:assert/strict';
import test from 'node:test';

import {
  extractCitationCount,
  formatGithubAnnotation,
  getCurlArgs,
  getOutputPath,
  updateScholarCitations,
} from './update-scholar-citations.mjs';

test('getOutputPath converts file URLs to a usable local filesystem path', () => {
  const outputPath = getOutputPath();

  assert.match(outputPath, /public[\\/]+scholar\.json$/);
  assert.doesNotMatch(outputPath, /^[A-Z]:\\[A-Z]:\\/i);
});

test('extractCitationCount reads the Google Scholar meta citation count', () => {
  const html =
    '<meta name="description" content="OPPO Research Institute - Cited by 117 - Machine learning">';

  assert.equal(extractCitationCount(html), 117);
});

test('getCurlArgs disables Windows Schannel revocation checks', () => {
  const args = getCurlArgs('win32');

  assert.ok(args.includes('--ssl-no-revoke'));
});

test('getCurlArgs keeps the Scholar response body for diagnostics', () => {
  const args = getCurlArgs('linux');

  assert.equal(args.includes('--fail'), false);
});

test('getCurlArgs uses a browser-like user agent for Google Scholar', () => {
  const args = getCurlArgs('linux');
  const userAgent = args[args.indexOf('--user-agent') + 1];

  assert.match(userAgent, /Mozilla\/5\.0/);
  assert.match(userAgent, /Chrome\//);
});

test('formatGithubAnnotation escapes annotation control characters', () => {
  const annotation = formatGithubAnnotation('warning', 'Scholar failed', 'line 1\nline 2%');

  assert.equal(annotation, '::warning title=Scholar failed::line 1%0Aline 2%25');
});

test('updateScholarCitations fails when the Scholar profile cannot be fetched', async () => {
  await assert.rejects(
    updateScholarCitations({
      fetchProfileHtml: async () => {
        throw new Error('blocked by Scholar');
      },
      writeCitationData: async () => {
        throw new Error('should not write fallback data');
      },
      maxAttempts: 1,
    }),
    /blocked by Scholar/,
  );
});

test('updateScholarCitations retries blocked Scholar responses before writing data', async () => {
  let attempts = 0;
  let writtenData = null;

  const citations = await updateScholarCitations({
    fetchProfileHtml: async () => {
      attempts += 1;

      if (attempts < 3) {
        return '<html><head><title>Sorry</title></head><body>unusual traffic</body></html>';
      }

      return '<meta name="description" content="Xiangmou Qu - Cited by 129 - Machine learning">';
    },
    writeCitationData: async (data) => {
      writtenData = data;
    },
    now: () => new Date('2026-06-16T00:00:00Z'),
    retryDelayMs: 0,
    log: () => {},
  });

  assert.equal(attempts, 3);
  assert.equal(citations, 129);
  assert.equal(writtenData.citations, 129);
});

test('updateScholarCitations reports response diagnostics when parsing keeps failing', async () => {
  await assert.rejects(
    updateScholarCitations({
      fetchProfileHtml: async () =>
        '<html><head><title>Sorry</title></head><body>Our systems have detected unusual traffic from your computer network.</body></html>',
      writeCitationData: async () => {
        throw new Error('should not write fallback data');
      },
      maxAttempts: 1,
      retryDelayMs: 0,
    }),
    /title="Sorry".*unusual traffic/s,
  );
});
