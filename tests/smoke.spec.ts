import { test, expect } from '@playwright/test';

test('landing page loads with both game cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'TCG Tracker' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Weiss Schwarz' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Gundam Card Game' })).toBeVisible();
});

test('card click navigates to Weiss Schwarz', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Weiss Schwarz/ }).click();
  await expect(page).toHaveURL('/weiss-schwarz');
  await expect(page.getByRole('heading', { name: 'Weiss Schwarz' })).toBeVisible();
});

test('card click navigates to Gundam Card Game', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Gundam Card Game/ }).click();
  await expect(page).toHaveURL('/gundam');
  await expect(page.getByRole('heading', { name: 'Gundam Card Game' })).toBeVisible();
});

test('direct URL access renders game pages', async ({ page }) => {
  await page.goto('/weiss-schwarz');
  await expect(page.getByRole('heading', { name: 'Weiss Schwarz' })).toBeVisible();
  await page.goto('/gundam');
  await expect(page.getByRole('heading', { name: 'Gundam Card Game' })).toBeVisible();
});
