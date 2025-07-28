import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.*Nettup.*/);
  await expect(page.locator('main h1').first()).toBeVisible();
  await expect(page.locator('main h1').first()).toContainText('Nettsider som');
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('nav a[href="/pakker"]');
  await expect(page).toHaveURL(/.*pakker.*/);
});

test('contact page loads and form is functional', async ({ page }) => {
  await page.goto('/kontakt');

  // Check page title and main heading
  await expect(page).toHaveTitle(/.*Ta kontakt.*/);
  await expect(page.locator('h1').first()).toContainText('Ta kontakt');

  // Check that the contact form is visible
  await expect(page.locator('#contact-form')).toBeVisible();

  // Check that required form fields are present
  await expect(page.locator('#name')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#company')).toBeVisible();
  await expect(page.locator('#message')).toBeVisible();
  await expect(page.locator('#consent')).toBeVisible();

  // Check that submit button is present
  await expect(page.locator('button[type="submit"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toContainText(
    'Send melding'
  );
});

test('packages page loads', async ({ page }) => {
  await page.goto('/pakker');
  await expect(page.locator('main h1').first()).toBeVisible();
  await expect(page.locator('main h1').first()).toContainText('Pakker');
});
