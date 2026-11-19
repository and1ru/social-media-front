import { test, expect } from '@playwright/test';

test.describe('E2E Login', () => {

  test('should login successfully', async ({ page }) => {

    // 1. Entrar a la página de login
    await page.goto('/login');

    // 2. Introducir el correo
    await page
      .getByLabel('Email')
      .fill('qa@example.com');

    // 3. Introducir la contraseña
    await page
      .getByLabel('Password')
      .fill('Password123');

    // 4. Hacer clic en iniciar sesión
    await page
      .getByRole('button', { name: 'Iniciar sesión' })
      .click();

    // 5. Comprobar que fuimos redirigidos
    await expect(page).toHaveURL(/\/dashboard/);

    // 6. Comprobar que el dashboard está visible
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

  });

});