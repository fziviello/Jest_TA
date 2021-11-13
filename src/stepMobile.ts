export async function getList(mobileDriver, prop):Promise<string[]> {
    let getAppList = [];
     mobileDriver.getChildElements(await mobileDriver.getElement('id',prop.idUserList),'id',prop.idUserText).then(async (elements) =>{
      await elements.forEach( async (element) => {
        let id = element.ELEMENT;
        getAppList.push(await mobileDriver.getElementText(id));
      });
    })
    return getAppList;
  };