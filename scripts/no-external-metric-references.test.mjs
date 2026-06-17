import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const filesToCheck = [
  '.github/workflows/deploy.yml',
  'package.json',
  'src/App.tsx',
  'src/data.ts',
  'src/styles.css',
];

const removedFiles = [
  'public/scholar.json',
  'scripts/update-scholar-citations.mjs',
  'scripts/update-scholar-citations.test.mjs',
];

test('site source no longer depends on the removed external metric source', async () => {
  const removedSource = ['sch', 'olar'].join('');
  const removedMetric = ['cit', 'ation'].join('');
  const removedActionClass = ['hero-action-with-', 'metric'].join('');
  const removedPillClass = ['action-', 'metric'].join('');
  const forbiddenPatterns = [
    new RegExp(['Google ', removedSource].join(''), 'i'),
    new RegExp(removedSource, 'i'),
    new RegExp(removedMetric, 'i'),
    new RegExp(['update:', removedSource].join(''), 'i'),
    new RegExp([removedSource, '\\.json'].join(''), 'i'),
    new RegExp(removedActionClass, 'i'),
    new RegExp(removedPillClass, 'i'),
  ];

  for (const file of filesToCheck) {
    const content = await readFile(file, 'utf8');

    for (const pattern of forbiddenPatterns) {
      assert.doesNotMatch(content, pattern, `${file} still contains ${pattern}`);
    }
  }
});

test('removed external metric files are not present', async () => {
  for (const file of removedFiles) {
    await assert.rejects(access(file), { code: 'ENOENT' }, `${file} should be deleted`);
  }
});
