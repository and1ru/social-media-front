# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> E2E Login >> should login successfully
- Location: e2e\login.spec.ts:5:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel('Email')
    - waiting for "http://127.0.0.1:5173/login" navigation to finish...
    - navigated to "http://127.0.0.1:5173/login"

```

# Page snapshot

```yaml
- generic [ref=f2e3]:
  - generic [ref=f2e4]: "[plugin:vite:import-analysis] Failed to resolve import \"../../cutomHooks/useLogOut/useLogOut\" from \"src/components/LogOutButton/LogOutButton.tsx\". Does the file exist?"
  - generic [ref=f2e5]: LogOutButton.tsx:2:26
  - generic [ref=f2e6]: "1 | import { c as _c } from \"react/compiler-runtime\"; 2 | import { useNavigate } from \"react-router-dom\"; 3 | import { useLogOut } from \"../../cutomHooks/useLogOut/useLogOut\"; | ^ 4 | import { useLanguajeContext } from \"../../context/languaje/LanguajeContext\"; 5 | import { es, en } from \"../../laguaje\";"
  - generic [ref=f2e7]: at TransformPluginContext._formatLog (file:///C:/Users/juanh/Downloads/social-media/social-media-front/node_modules/vite/dist/node/chunks/node.js:30602:39) at TransformPluginContext.error (file:///C:/Users/juanh/Downloads/social-media/social-media-front/node_modules/vite/dist/node/chunks/node.js:30599:14) at normalizeUrl (file:///C:/Users/juanh/Downloads/social-media/social-media-front/node_modules/vite/dist/node/chunks/node.js:27842:18) at async file:///C:/Users/juanh/Downloads/social-media/social-media-front/node_modules/vite/dist/node/chunks/node.js:27905:30 at async Promise.all (index 2) at async TransformPluginContext.transform (file:///C:/Users/juanh/Downloads/social-media/social-media-front/node_modules/vite/dist/node/chunks/node.js:27873:4) at async EnvironmentPluginContainer.transform (file:///C:/Users/juanh/Downloads/social-media/social-media-front/node_modules/vite/dist/node/chunks/node.js:30387:14) at async loadAndTransform (file:///C:/Users/juanh/Downloads/social-media/social-media-front/node_modules/vite/dist/node/chunks/node.js:24646:26)
  - generic [ref=f2e8]:
    - text: Click outside, press Esc key, or fix the code to dismiss.You can also disable this overlay by setting
    - code [ref=f2e9]: server.hmr.overlay
    - text: to
    - code [ref=f2e10]: "false"
    - text: in
    - code [ref=f2e11]: vite.config.ts
    - text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('E2E Login', () => {
  4  | 
  5  |   test('should login successfully', async ({ page }) => {
  6  | 
  7  |     // 1. Entrar a la página de login
  8  |     await page.goto('/login');
  9  | 
  10 |     // 2. Introducir el correo
  11 |     await page
  12 |       .getByLabel('Email')
> 13 |       .fill('qa@example.com');
     |        ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  14 | 
  15 |     // 3. Introducir la contraseña
  16 |     await page
  17 |       .getByLabel('Password')
  18 |       .fill('Password123');
  19 | 
  20 |     // 4. Hacer clic en iniciar sesión
  21 |     await page
  22 |       .getByRole('button', { name: 'Iniciar sesión' })
  23 |       .click();
  24 | 
  25 |     // 5. Comprobar que fuimos redirigidos
  26 |     await expect(page).toHaveURL(/\/dashboard/);
  27 | 
  28 |     // 6. Comprobar que el dashboard está visible
  29 |     await expect(
  30 |       page.getByRole('heading', { name: 'Dashboard' })
  31 |     ).toBeVisible();
  32 | 
  33 |   });
  34 | 
  35 | });
```