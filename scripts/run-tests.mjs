import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const playwrightCli = require.resolve('@playwright/test/cli');
const allureCli = require.resolve('allure-commandline/bin/allure');
const resultsDir = 'allure-results';

rmSync(resultsDir, { recursive: true, force: true });
mkdirSync(resultsDir, { recursive: true });

const testRun = spawnSync(process.execPath, [playwrightCli, 'test', ...process.argv.slice(2)], {
  stdio: 'inherit',
});

if (testRun.error) {
  console.error('Failed to start Playwright:', testRun.error.message);
}

const reportRun = spawnSync(
  process.execPath,
  [allureCli, 'generate', resultsDir, '--clean', '-o', 'allure-report'],
  { stdio: 'inherit' },
);

if (reportRun.error) {
  console.error('Failed to generate the Allure report:', reportRun.error.message);
}

process.exitCode =
  testRun.status === 0 && !testRun.error ? (reportRun.status ?? 1) : (testRun.status ?? 1);
