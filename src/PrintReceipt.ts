import { loadAllItems, loadPromotions } from './Dependencies'

export function printReceipt(tags: string[]): string {

  let items: Item
  let receipt: string
  let tag: Tag
  items = getItemsInformation(tags)
  receipt = generateReceipt(items)
  return receipt

  function getItemsInformation(tags: string[]): Item {
    tag = getEachItemQuantity(tags)
    items = getEachItemInformation(tags, tag)
    items = getEachItemSaleInformation(tags)
    return items
  }

  function getEachItemQuantity(tags: string[]): Tag {
    console.log(tags[0])
    tag = {
      barcode: tags[0],
      quantity: 1,
    }
    tag.barcode = tags[0]
    tag.quantity = 1
    return tag
  }

  function getEachItemInformation(tags: string[], tag: Tag): Item {
    const allItems = loadAllItems()
    const item = allItems.filter(item => item.barcode === tags[0])
    items = {
      name: item[0].name,
      price: item[0].price,
      unit: item[0].unit,
      quantity: tag.quantity,
      isSaleItem: false,
    }
    return items
  }



  function getEachItemSaleInformation(tags: string[]): Item {
    return items
  }

  function generateReceipt(items: Item): string {
    receipt = "***<store earning no money>Receipt ***\n"
      + `Name：${items.name}，Quantity：${items.quantity} bottles，`
      + `Unit：${items.price.toFixed(2)}(yuan)，`
      + `Subtotal：${(items.price * tag.quantity).toFixed(2)}(yuan)\n`
      + `----------------------\n`
      + `Total：${(items.price * tag.quantity).toFixed(2)}(yuan)\n`
      + `Discounted prices：0(yuan)\n`
      + `**********************`
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
