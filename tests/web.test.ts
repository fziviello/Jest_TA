import { By, Key } from 'selenium-webdriver';
import { webDriver } from '../src/webDriver';
import  settingsLoader from '../src/settingsLoader';
import { takeScreenshot } from '../src/reportManager'

describe('WEB test', () => {
  let driver;
  const prop = settingsLoader.properties.webProperties;

  beforeAll(async () => {
      await webDriver.startDriver(settingsLoader.loadChromeOptions('chromeOptions.json'));
      driver = await webDriver.getDriver();
      await driver.get(prop.basePath);
    });

  beforeEach(async () => {} );
  
  test('closeCookie', async () => {
      (await webDriver.getElement(By.id((prop.popUpID)))).click();
    });
  test('login', async () => {
      await webDriver.click(By.xpath(prop.btnSigIn));
      await webDriver.sendKeys(By.tagName(prop.inputEmail), prop.email);
      await webDriver.click(By.css(prop.nextBtn));
      await webDriver.sendKeys(By.xpath(prop.inputPsw), prop.psw);
      await webDriver.click(By.xpath(prop.nextBtn2));
      await takeScreenshot(driver,"End Test Screenshot");
    });

  test('search', async () => {
    await driver.get(prop.basePath);
      (await webDriver.getElement(By.css(prop.searchBar))).sendKeys('Fabio Ziviello', Key.ENTER);
    });

  test('listResult', async () => {
    await webDriver.getElements(By.tagName('h3')).then(async (elements) => {
      if(elements != null){
        for await (const element of elements) {
          await element.getText().then(async (title) => {
            console.log(title); 
          });
        }
      }
      else{
        fail("Errore lettura Titoli");
      }
    });
    
    await webDriver.getElements(By.tagName("cite")).then(async (elements) => {
      if(elements != null){
        for await (const element of elements) {
           await element.getText().then(async (url) => {
              console.log(url.replace(" › ","/")); 
          });
        }
      }
      else{
        fail("Errore lettura link");
      }
    });
  });
  afterEach(async () => {
  });

  afterAll(async () => {
     await webDriver.stopDriver();
    });
});