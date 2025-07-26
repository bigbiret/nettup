import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.*Nettup.*/);
  await expect(page.locator('main h1').first()).toBeVisible();
  await expect(page.locator('main h1').first()).toContainText(
    'Vi lager nettsider som'
  );
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('nav a[href="/om-oss"]');
  await expect(page).toHaveURL(/.*om-oss.*/);
});

test('contact page loads', async ({ page }) => {
  await page.goto('/kontakt');
  await expect(page.locator('main form').first()).toBeVisible();
  await expect(page.locator('main h1').first()).toContainText('Kontakt oss');
});

test('services page loads', async ({ page }) => {
  await page.goto('/tjenester');
  await expect(page.locator('main h1').first()).toBeVisible();
  await expect(page.locator('main h1').first()).toContainText('Våre tjenester');
});

test('packages page loads', async ({ page }) => {
  await page.goto('/pakker');
  await expect(page.locator('main h1').first()).toBeVisible();
  await expect(page.locator('main h1').first()).toContainText('Pakker');
});
