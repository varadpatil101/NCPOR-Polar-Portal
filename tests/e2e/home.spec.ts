import { expect, test } from "@playwright/test";
test("homepage provides working discovery routes", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Where polar knowledge comes alive/i })).toBeVisible();
  await page.getByRole("link", { name: /Explore polar world/i }).click();
  await expect(page).toHaveURL(/\/explore$/);
  await expect(page.getByText(/Accessible list alternative/i)).toBeVisible();
});

test("archive search updates the shareable discovery URL", async ({ page }) => {
  await page.goto("/archive");
  await page.getByRole("searchbox", { name: "Search the knowledge archive" }).fill("Aurora");
  await expect(page).toHaveURL(/\/archive\?q=Aurora$/);
  await expect(page.getByRole("region", { name: "Archive results" })).toContainText("1 records found for “Aurora”");
});
