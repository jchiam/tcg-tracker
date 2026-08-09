import { test, expect } from '@playwright/test';

test('landing page loads with both game cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'The JonZone Card Zone' })).toBeVisible();
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

test('switcher swaps games and brand returns home', async ({ page }) => {
  await page.goto('/weiss-schwarz');
  await page.getByRole('button', { name: 'Switch Game' }).click();
  await page.getByRole('link', { name: /Gundam Card Game/ }).click();
  await expect(page).toHaveURL('/gundam');
  await expect(page.getByRole('heading', { name: 'Gundam Card Game' })).toBeVisible();

  await page.getByRole('link', { name: /The JonZone Card Zone/ }).click();
  await expect(page).toHaveURL('/');
});

test('switcher absent on landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /The JonZone Card Zone/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Switch Game' })).toHaveCount(0);
});
