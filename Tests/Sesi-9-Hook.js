const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("Swag Labs Test", function () {
  let driver;

  // Setup sebelum semua test
  before(async function () {
    const options = new chrome.Options();
    options.addArguments("--incognito");
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver.get("https://www.saucedemo.com");

    // Tunggu sampai input username muncul
    await driver.wait(until.elementLocated(By.id("user-name")), 10000);

    // Verifikasi judul halaman
    const title = await driver.getTitle();
    assert.equal(title, "Swag Labs", "Title does not match");
    this.timeout(10000); // Set timeout for this test
    await driver.wait(until.titleIs("Swag Labs"), 5000);

    // Login process
    let inputUsername = await driver
      .findElement(By.id("user-name"))
      .sendKeys("standard_user");
    let inputPassword = await driver
      .findElement(By.id("password"))
      .sendKeys("secret_sauce");
    let loginButton = await driver.findElement(By.id("login-button")).click();

    // Verifikasi bahwa tombol keranjang belanja muncul
    let buttonCart = await driver.wait(
      until.elementLocated(By.className("shopping_cart_link")),
      5000
    );
    await buttonCart.isDisplayed();

    // Verifikasi bahwa logo aplikasi muncul
    let textAppLogo = await driver.findElement(By.className("app_logo"));
    let LogoText = await textAppLogo.getText();
    assert.equal(LogoText, "Swag Labs", "Logo text does not match");
  });

  // Setelah semua test selesai
  after(async function () {
    await driver.quit();
  });

  it("should log in web Swag Labs and sort products by price (low to high)", async function () {
    // Sort products by price (low to high)
    const dropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    await dropdown.sendKeys("Price (low to high)");
    await driver.sleep(10000); // opsional untuk melihat hasil sorting
  });

  it("should log in web Swag Labs and sort products by price (high to low)", async function () {
    // Sort products by price (high to low)
    const dropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    await dropdown.sendKeys("Price (high to low)");
    await driver.sleep(10000); // opsional untuk melihat hasil sorting
  });
});
