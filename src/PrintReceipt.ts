import { loadAllItems, loadPromotions } from './Dependencies'

export function printReceipt(tags: string[]): string {

  let items: Item[]=[]
  let receipt: string
  let tag: Tag[]=[]
  items = getItemsInformation(tags)
  receipt = generateReceipt(items)
  return receipt

  function getItemsInformation(tags: string[]): Item[] {
    tag = getEachItemQuantity(tags)
    items = getEachItemInformation(tag)
    items = getEachItemSaleInformation(tags)
    return items
  }

  function getEachItemQuantity(tags: string[]): Tag[] {
    let index=0
    let tagIndex=0
    let itemQuantity=0
    //判断 row==0
    for (let row=0;row<tags.length;row++){
      if (tags[row]===tags[index])
      {
        itemQuantity++
      }
      else
      {
        itemQuantity=1
        tagIndex++
        index++
      }
      tag[tagIndex]={
        barcode: tags[row],
        quantity: itemQuantity,
      }
    }
    return tag
  }


  function getEachItemInformation(tag: Tag[]): Item[] {
    const allItems = loadAllItems()
    for (let itemsNumber=0;itemsNumber<tag.length;itemsNumber++){
      const item = allItems.filter(item => item.barcode === tag[itemsNumber].barcode)
      items[itemsNumber] = {
        name: item[0].name,
        price: item[0].price,
        unit: item[0].unit,
        quantity: tag[itemsNumber].quantity,
        isSaleItem: false,
      }
    }
    return items
  }



  function getEachItemSaleInformation(tags: string[]): Item[] {
    return items
  }

  function generateReceipt(items: Item[]): string {
    receipt = "***<store earning no money>Receipt ***\n"
      + generateItemsReceiptWithoutDiscountprice(items)
      + `Discounted prices：0(yuan)\n`
      + `**********************`
    return receipt
  }

  function generateItemsReceiptWithoutDiscountprice(items: Item[]): string{
    let partOfReceipt=''
    let totalPrice=0
    for (let itemsNumber=0;itemsNumber<items.length;itemsNumber++)
    {
      partOfReceipt+=`Name：${items[itemsNumber].name}，Quantity：${items[itemsNumber].quantity} ${items[itemsNumber].unit}s，Unit：${items[itemsNumber].price.toFixed(2)}(yuan)，Subtotal：${(items[itemsNumber].price * items[itemsNumber].quantity).toFixed(2)}(yuan)\n`
      totalPrice +=(items[itemsNumber].price * items[itemsNumber].quantity)
    }
    partOfReceipt+=`----------------------\n`+`Total：${(totalPrice).toFixed(2)}(yuan)\n`
    return partOfReceipt
  }



  /* return `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************` */
}



interface Item {
  name: string,
  unit: string,
  price: number,
  quantity: number,
  isSaleItem: boolean,
}

interface Tag {
  barcode: string,
  quantity: number,
}
