import  * as seleniumWD  from 'selenium-webdriver';
import { until } from 'selenium-webdriver' ;
import 'chromedriver';

let element, elements;

const webDriver =  {
    element : seleniumWD.WebElement,
    webDriver: seleniumWD.WebDriver,

    async getDriver() {
        return await this.webDriver;
    },

    async startDriver(chromeOptions) {
        this.webDriver = await new seleniumWD.Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
        await this.webDriver.manage().setTimeouts( { implicit: 12000 } )
    },

    async stopDriver() {
        if(this.webDriver != undefined) {
            await this.webDriver.quit();
        }
        await console.log("CLOSED")
    },

    
    async waitForElement(By, timeout) {
        try{
            this.webDriver.wait(until.elementLocated(By), timeout, `Timed out after ${timeout/100} seconds`, 500).then(() =>{
                return true;
            });
        } catch(e) {
            return false;
        }
    },

    async getElement(By) {
        element = await this.webDriver.findElement(By);
        return element;
    },

   async getElements(By) {
        elements = await this.webDriver.findElements(By);
        return elements;
    },

    async sendKeys(By, text){
        let el = await this.getElement(By);
        await el.sendKeys(text);
    },

    async click(By){
        let el = await this.getElement(By);
        await el.click();
    }

}

export { webDriver }