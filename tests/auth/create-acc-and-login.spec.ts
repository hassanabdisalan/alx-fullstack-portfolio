import { faker } from "@faker-js/faker";
import { test, expect } from "@playwright/test";

test("initial page load", async ({ page }) => {
  await page.goto("/");
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Flowbiz CRM/);
  // expect to be navigated to /logibn
  // await a 10 second delay
  await page.waitForTimeout(3000);
  await expect(page).toHaveURL(/signin/);
});

test("signup-flow", async ({ page }) => {
  await page.goto("/");

  const testFirstName = faker.person.firstName();
  const testLastName = faker.person.lastName();
  const testEmail = `${testFirstName.toLowerCase()}-${testLastName.toLowerCase()}@test-email.com`;
  const testPassword = testEmail;

  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByRole("textbox", { name: "First name" }).fill(testFirstName);
  await page.getByRole("textbox", { name: "Last name" }).fill(testLastName);
  await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
  await page
    .getByRole("textbox", { name: "Password", exact: true })
    .fill(testPassword);
  await page
    .getByRole("textbox", { name: "Confirm password" })
    .fill(testPassword);
  await page.getByRole("checkbox", { name: "I agree to the Terms of" }).click();
  await page.getByRole("button", { name: "Create account" }).click();

  await page.goto("/signin");

  await page.getByRole("textbox", { name: "Email" }).fill(testEmail);
  await page.getByRole("textbox", { name: "Password" }).fill(testPassword);
  await page.getByRole("checkbox", { name: "Remember me" }).click();
  await page.getByRole("button", { name: "Sign in", exact: true }).click();

  const createBusinessForm = await page.getByTestId("business-form");

  const businessNameInput =
    await createBusinessForm.locator('input[name="name"]');
  console.log(" business name   == ", await businessNameInput.isVisible());
  // console.log(" business name   == ",await createBusinessForm.getByRole('textbox', { name: 'name' }).textContent());
  // await createBusinessForm.getByLabel('Business Name').fill('Test Business Corp');
  // await createBusinessForm.getByLabel('Business Email' ).fill(`business-${testEmail}`);
  // await createBusinessForm.getByLabel('Business Phone Number' ).fill('+1234567890');
  // await createBusinessForm.getByLabel('Business Location' ).fill('New York, NY');
  // await page.locator('[data-test="business-form"]').getByRole('button', { name: 'Save' }).click();

  // await page.getByRole("textbox", { name: "Business Name" }).fill('Test Business Corp')
  // await page.getByRole("textbox", { name: "Business Email" }).fill(`business-${testEmail}`)
  // await page.getByRole("textbox", { name: "Business Phone Number" }).fill("+1234567890");
  // await page.getByRole("textbox", { name: "Business Location" }).fill('New York, NY');
  // await page.getByRole('button', { name: 'Save' }).click();

  // await page.getByRole('link', { name: 'Settings' }).click();
  // await page.getByRole('textbox', { name: 'Confirm Email' }).fill(testEmail);

  // await page.getByRole('button', { name: 'DELETE' }).click();

  // await page.getByRole('link', { name: 'Sign up' }).click();
  // await page.getByRole('textbox', { name: 'First name' }).click();
  // await page.getByRole('textbox', { name: 'First name' }).fill('email-test-1@email.com');
  // await page.getByRole('textbox', { name: 'Last name' }).click();
  // await page.getByRole('textbox', { name: 'Last name' }).fill('email-test-1@email.com');
  // await page.getByRole('textbox', { name: 'Email' }).click();
  // await page.getByRole('textbox', { name: 'Email' }).fill('email-test-1@email.com');
  // await page.getByRole('textbox', { name: 'Password', exact: true }).click();
  // await page.getByRole('textbox', { name: 'Password', exact: true }).fill('email-test-1@email.com');
  // await page.getByRole('textbox', { name: 'Confirm password' }).click();
  // await page.getByRole('textbox', { name: 'Confirm password' }).fill('email-test-1@email.com');
  // await page.locator('div').filter({ hasText: /^I agree to the Terms of Service and Privacy Policy$/ }).first().click();
  // await page.getByRole('button', { name: 'Create account' }).click();
  // await page.getByRole('textbox', { name: 'Email' }).click();
  // await page.getByRole('textbox', { name: 'Email' }).fill('email-test-1@email.com');
  // await page.getByRole('textbox', { name: 'Password' }).click();
  // await page.getByRole('textbox', { name: 'Password' }).fill('email-test-1@email.com');
  // await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  // await page.getByRole('textbox', { name: 'Business Name' }).click();
  // await page.getByRole('textbox', { name: 'Business Email' }).click();
  // await page.getByRole('textbox', { name: 'Business Phone Number' }).click();
  // await page.getByRole('textbox', { name: 'Business Location' }).click();
});
