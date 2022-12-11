import { test, expect } from '@playwright/test'

test('End to end test av Employees', async ({ page }) => {
  // Gå til riktig side.
  await page.goto('/employees')

  //Teste at det er riktig side man kommer til med overskriften.
  await expect(page.locator('h1')).toContainText('Alle ansatte')

  //Forvente at siden har en liste med 15 ansatte
  await expect(page.locator('#employees li')).toHaveCount(15)

  // Teste at knappen til en ansatt fungerer.
  await page.click('text=se ansatt')

  // Teste at knappen går til riktig link, en ansatt.
  await expect(page).toHaveURL('/employees/1')

  //Teste at det er riktig side man kommer til med overskriften og riktig navn
  await expect(page.locator('h1')).toContainText('Lunsjlisten til Trude')
})
