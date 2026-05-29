import assert from 'node:assert/strict';
import test from 'node:test';

import { extractCitationCount, getCurlArgs, getOutputPath } from './update-scholar-citations.mjs';

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

test('getCurlArgs uses a browser-like user agent for Google Scholar', () => {
  const args = getCurlArgs('linux');
  const userAgent = args[args.indexOf('--user-agent') + 1];

  assert.match(userAgent, /Mozilla\/5\.0/);
  assert.match(userAgent, /Chrome\//);
});
