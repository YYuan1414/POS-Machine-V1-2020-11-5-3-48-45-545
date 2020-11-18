import { printReceipt } from '../src/PrintReceipt'

describe('printReceipt', () => {
  /* it('should print receipt with promotion when print receipt', () => {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ]

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)
Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)
----------------------
Total：58.50(yuan)
Discounted prices：7.50(yuan)
**********************` */

  it('should print receipt with promotion when print receipt', () => {
    const tags = [
      'ITEM000001'
    ]

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：1 bottles，Unit：3.00(yuan)，Subtotal：3.00(yuan)
----------------------
Total：3.00(yuan)
Discounted prices：0(yuan)
**********************`

    expect(printReceipt(tags)).toEqual(expectText)
  })

  it('should print receipt with promotion when print receipt for numbers of item', () => {
    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000005',
    ]

    const expectText = `***<store earning no money>Receipt ***
Name：Sprite，Quantity：4 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)
Name：Instant Noodles，Quantity：1 bags，Unit：4.50(yuan)，Subtotal：4.50(yuan)
----------------------
Total：16.50(yuan)
Discounted prices：0(yuan)
**********************`

    expect(printReceipt(tags)).toEqual(expectText)
  })

})
