import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.*Home.*/);
  await expect(page.locator('h1')).toBeVisible();
});

test('navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('nav a[href="/about"]');
  await expect(page).toHaveURL(/.*about.*/);
});

test('contact page loads', async ({ page }) => {
  await page.goto('/kontakt');
  await expect(page.locator('form')).toBeVisible();
}); 