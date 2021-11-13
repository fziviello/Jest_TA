import { mobileDriver } from '../src/mobileDriver';
import  settingsLoader  from '../src/settingsLoader';
import { getList }  from '../src/stepMobile';
import { assert } from 'console';
import { takeScreenshot } from '../src/reportManager';

describe('MOBILE test', () => {
  const prop = settingsLoader.properties.androidProperties;
  let driver;
  beforeAll(async () => {
    await mobileDriver.startDriver();
    driver = await mobileDriver.Driver();
  });

  beforeEach(async () => {});

  test('login error', async function () {
    await takeScreenshot(driver, "Test Started");
    await mobileDriver.sendKeys('id',prop.idUsername, 'wrong');
    await mobileDriver.sendKeys('id',prop.idPassword, 'wrong');
    await mobileDriver.click('id',prop.idBtnLogin);
    assert(await mobileDriver.getText('id',prop.idErrorMessage) == 'Credenziali errate');
    await takeScreenshot(driver, "Login Failed");
    await mobileDriver.click('id',prop.idConfirm);
    await takeScreenshot(driver, "Test Finished");
  }); 

  test('login success', async function () {
    await mobileDriver.sendKeys('id',prop.idUsername, 'admin');
    await mobileDriver.sendKeys('id',prop.idPassword, 'admin');
    await mobileDriver.click('id',prop.idBtnLogin);
    assert(await mobileDriver.getText('id',prop.idWelcomeText) == 'Benvenuto: admin');
    await takeScreenshot(driver, "Login Succesful");
  }); 

  test('Add Contact', async function () {
    let userList =[];
    let getAppList = [];

    getAppList = await getList(mobileDriver,prop);

    await mobileDriver.click('id',prop.idAddUser);
    await mobileDriver.sendKeys('id',prop.idEditName,"Raffaello");
    await mobileDriver.click('id',prop.idConfirmAdd);

    getAppList.push("Raffaello");

    userList = await getList(mobileDriver,prop);

    await mobileDriver.click('id',prop.idBtnElimina);
    await mobileDriver.click('id',prop.idConfirm);
    
    expect(getAppList).toEqual(userList);

  })

  afterEach(async () => {});

  afterAll(async () => {await mobileDriver.stopDriver();});

});

