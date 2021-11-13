import { fs } from 'file-system';
import { addAttach } from 'jest-html-reporters/helper.js';

const prefixImg = "data:image/gif;base64,";

function getName() {
  return Date.now().toString();
}

function addPrefixImg(base64) {
  return prefixImg.concat(base64);
}

async function pngToBase64(path) {
    const img = prefixImg.concat(fs.readFileSync(path, 'base64'));
    fs.unlink(path, ((err: any) => {
        if (err) console.log(err);
        else {
          console.log(`Deleted file ${path}`);
        }
      }));
    return img;
}

async function base64toPng(base64) {
  fs.writeFile(`${process.cwd()}/screenshots/${getName()}.png`, base64, 'base64', function(err) {
    if (err) throw err;
  });
}

async function takeScreenshot(driver,desc) {
  let screen = await driver.takeScreenshot();
  base64toPng(screen);
  await addAttach(addPrefixImg(screen), desc);
}

export { addPrefixImg, pngToBase64, base64toPng, takeScreenshot }