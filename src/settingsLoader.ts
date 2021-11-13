import { fs } from 'file-system';
import { Options } from "selenium-webdriver/chrome.js";

const resourcesPath = `${process.cwd()}/resources`;
const mobilePath = `${resourcesPath}/mobile`;
const webPath = `${resourcesPath}/web`;

const settings = {  
  capabilities : {
    androidCapabilities : JSON.parse(fs.readFileSync(`${mobilePath}/android.capabilities.json`).toString())
  },

  properties : {
    webProperties : JSON.parse(fs.readFileSync(`${webPath}/prop.web.json`).toString()),
    androidProperties :  JSON.parse(fs.readFileSync(`${mobilePath}/prop.android.json`).toString())
  },

  loadChromeOptions(file) {
    let options = {}; 
    try {
      options = JSON.parse(fs.readFileSync(`${webPath}/${file}`).toString());
    }
    catch(error){
        console.error('File not found!');
    }
    let chromeOptions = new Options();
    for (var key in options){
      if(options[key]){chromeOptions.addArguments(key);}
    }
    return chromeOptions;
  }
}

export default settings;