import { remote } from 'webdriverio';
import  settingsLoader  from '../src/settingsLoader';
import 'chromedriver';


const mobileDriver = {

    async Driver() {
        return await this.mobileDriver;
    },

    async startDriver() {
        let androidOptions;
        let capabilities = settingsLoader.capabilities.androidCapabilities;
        capabilities.app = process.cwd() + "/" + capabilities.app;
        
        androidOptions = Object.assign(
            {
                port : 4723,
                hostname : '0.0.0.0',
                path : '/wd/hub',
                capabilities: settingsLoader.capabilities.androidCapabilities
            });
        this.mobileDriver = await remote(androidOptions);
    },

    async elementExist(By, locator) {
        try {
            await this.mobileDriver.findElement(By, locator);
            return true;
        } catch (error) {
            return false;
        }
    },

    async getElement(By, locator, timeout = 10000) {
        let el;
        await this.mobileDriver.waitUntil(async () => (this.elementExist(By, locator), {
            timeout: timeout,
            timeoutMsg: "Element not found after 10s"
        }));
        el = await this.mobileDriver.findElement(By, locator);
        return el;
    },

    async getAttribute(By, locator, select){
        let attr;
        let el = await this.getElement(By,locator);
        await this.mobileDriver.getElementAttribute(el.ELEMENT, select).then(async (attribute) => {attr = attribute});
        return attr;
    },

    async getChildElements(element, By, locator) {
        let els;
        await this.mobileDriver.findElementsFromElement(element.ELEMENT, By, locator).then((elements) => {els = elements;});
        return els;
    },

    async click(By, locator){
        let el = await this.getElement(By,locator);
        await this.mobileDriver.elementClick(el.ELEMENT);
    },

    async sendKeys(By, locator, text){
        let el = await this.getElement(By,locator);
        await this.mobileDriver.elementSendKeys(el.ELEMENT, text);
    },

    async getText(By, locator){
        return await this.getAttribute(By, locator,'text');
    },

    async getElementText(element) {
        let text;
        await this.mobileDriver.getElementAttribute(element,'text').then(async (attr) => {text = attr;});
        return text;
    },

    async stopDriver() {
        if(this.mobileDriver != undefined){await this.mobileDriver.deleteSession();}
     }
}
export { mobileDriver }
