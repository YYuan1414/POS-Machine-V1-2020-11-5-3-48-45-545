import { LOADIPHLPAPI } from 'dns'
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
    items = getEachItemSaleInformation(items)
    return items
  }

  function getEachItemQuantity(tags: string[]): Tag[] {
    let index=0
    let tagIndex=0
    let itemQuantity=0
    let originalItemQuantity:number
    //判断 row==0
    for (let row=0;row<tags.length;row++){
      if (isNaN(+(tags[row].split('-')[1])))
      {
        originalItemQuantity=0
      }
      else
      {
        originalItemQuantity=+(tags[row].split('-')[1])
      }
      if (tags[row].split('-')[0]===tags[index])
      {
        (originalItemQuantity===0)? itemQuantity++: itemQuantity+=originalItemQuantity
      }
      else
      {
        (originalItemQuantity===0)? itemQuantity=1: itemQuantity=originalItemQuantity
        tagIndex++
        index = row
      }
      tag[tagIndex]={
        barcode: tags[row].split('-')[0],
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
        barcode: item[0].barcode,
        name: item[0].name,
        price: item[0].price,
        unit: item[0].unit,
        quantity: tag[itemsNumber].quantity,
        isSaleItem: false,
      }
    }
    return items
  }



  function getEachItemSaleInformation(items: Item[]): Item[] {
    const saleItems=loadPromotions()[0].barcodes
    const row=0
    for (let saleItemsNumber=0;saleItemsNumber<saleItems.length;saleItemsNumber++){

      for(let itemsNumber=0;itemsNumber<items.length;itemsNumber++){
        if (items[itemsNumber].barcode===saleItems[saleItemsNumber])
        {
          items[itemsNumber].isSaleItem=true
        }

      }
    }
    return items
  }

  function generateReceipt(items: Item[]): string{
    receipt = '***<store earning no money>Receipt ***\n'
    let totalPrice=0
    let discountedPrice=0
    for (let itemsNumber=0;itemsNumber<items.length;itemsNumber++)
    {
      let itemDiscountedPrice=0
      if (items[itemsNumber].isSaleItem===true)
      {
        itemDiscountedPrice=Math.floor(items[itemsNumber].quantity/3)*items[itemsNumber].price
        discountedPrice+=Math.floor(items[itemsNumber].quantity/3)*items[itemsNumber].price
      }
      receipt+=`Name：${items[itemsNumber].name}，Quantity：${items[itemsNumber].quantity} ${items[itemsNumber].unit}s，Unit：${items[itemsNumber].price.toFixed(2)}(yuan)，Subtotal：${(items[itemsNumber].price * items[itemsNumber].quantity-itemDiscountedPrice).toFixed(2)}(yuan)\n`
      totalPrice +=(items[itemsNumber].price * items[itemsNumber].quantity)
    }
    receipt+='----------------------\n'+`Total：${(totalPrice-discountedPrice).toFixed(2)}(yuan)\nDiscounted prices：${discountedPrice.toFixed(2)}(yuan)\n**********************`
    return receipt
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
  barcode:string,
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
