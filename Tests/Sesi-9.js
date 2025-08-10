const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("Google Search Test", function () {
  let driver;

  it('should open Google and search for "Selenium WebDriver"', async function () {
    const options = new chrome.Options();

    options.addArguments("--incognito");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver.get("https://www.saucedemo.com");
  });

  it("should log in web Swag Labs", async function () {
    this.timeout(10000); // Set timeout for this test
    await driver.wait(until.titleIs("Swag Labs"), 5000);

    let inputUsername = await driver
      .findElement(By.id("user-name"))
      .sendKeys("standard_user");
    let inputPassword = await driver
      .findElement(By.id("password"))
      .sendKeys("secret_sauce");
    let loginButton = await driver.findElement(By.id("login-button")).click();

    let buttonCart = await driver.wait(
      until.elementLocated(By.className("shopping_cart_link")),
      5000
    );
    await buttonCart.isDisplayed();

    let textAppLogo = await driver.findElement(By.className("app_logo"));
    let LogoText = await textAppLogo.getText();
    assert.equal(LogoText, "Swag Labs", "Logo text does not match");
  });

  it("should sort products by price (low to high)", async function () {
    const dropdown = await driver.findElement(
      By.className("product_sort_container")
    );
    await dropdown.sendKeys("Price (low to high)");
  });

  // Tambahkan cleanup untuk menutup driver
  //   after(async function () {
  //     if (driver) {
  //       await driver.quit();
  //     }
  //   });
});
