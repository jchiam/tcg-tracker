import { test, expect } from '@playwright/test';

test('landing page loads with both game cards', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'The JonZone Card Zone' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Weiss Schwarz' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Gundam Card Game' })).toBeVisible();
});

test('signed-out landing page marks every card as requiring login', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Requires Login')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Sign In with Google' })).toBeVisible();
});

test('direct URL access shows the auth gate when signed out', async ({ page }) => {
  await page.goto('/weiss-schwarz');
  await expect(page.getByRole('heading', { name: 'Welcome to the Card Zone' })).toBeVisible();
  await page.goto('/gundam');
  await expect(page.getByRole('heading', { name: 'Welcome to the Card Zone' })).toBeVisible();
});

test('switcher swaps games and brand returns home', async ({ page }) => {
  await page.goto('/weiss-schwarz');
  await page.getByRole('button', { name: 'Switch Game' }).click();
  await page.getByRole('link', { name: /Gundam Card Game/ }).click();
  await expect(page).toHaveURL('/gundam');

  await page.getByRole('link', { name: /The JonZone Card Zone/ }).click();
  await expect(page).toHaveURL('/');
});

test('switcher absent on landing page', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /The JonZone Card Zone/ })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Switch Game' })).toHaveCount(0);
});
