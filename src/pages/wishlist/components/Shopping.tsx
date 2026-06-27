import { urlFor } from "@/clinet/clinet"
import { useGetProductByIdArrQuery, } from "@/store/api"
import { useEffect, useMemo, useState } from "react"
import {
  Field,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import useShopping from "@/store/shoppingStore"
export default function Shopping() {

  const user = JSON.parse(localStorage.getItem("user")!)
  const array: string[] = user.wishlist?.map((item: any) => item._ref) ?? []
  const { data, isLoading } = useGetProductByIdArrQuery(array)

  const shopping = useShopping((state: any) => state.shoppingAdd)
  const shoppingSubtotal = useShopping((state: any) => state.subtotal)
  const shoppingExpress = useShopping((state: any) => state.express)
  const shoppingShopCard = useShopping((state: any) => state.shopCard)

  const [shopCard, setShopCard] = useState<any>(shoppingShopCard)
  const [subtotal, setSubtotal] = useState<any>(shoppingSubtotal)
  const [express, setExpress] = useState<any>(shoppingExpress)
  const [total, setTotal] = useState<any>(subtotal)

  console.log(total)

  useEffect(() => {
    const newData = data?.map((item: any) => ({
      ...item, count: 1, subtotal: item.price
    }))
    setShopCard(newData)
  }, [data])

  useEffect(() => {
    setSubtotal(0)
    shopCard?.forEach((item: any) => {
      setSubtotal((p: any) => {
        const allSubtotal = +p + +item.subtotal
        return allSubtotal
      })
    })
  }, [shopCard])


  useMemo(() => {
    if (express === 'Express shipping') {
      setTotal(subtotal + subtotal * 0.09)
    }
    else if (express === 'Pick Up') {
      setTotal(subtotal - subtotal * 0.03)
    } else {
      setTotal(subtotal)
    }
  }, [express, subtotal])

  const increment = (id: any) => {
    const incData = shopCard?.map((item: any) => {
      if (item._id == id) {
        return { ...item, count: item.count += 1, subtotal: item.count * item.price }
      } return item
    })
    setShopCard(incData)
  }

  const decremen = (id: any) => {
    const dacData = shopCard?.map((item: any) => {
      if (item._id == id) {
        return { ...item, count: item.count > 1 ? item.count -= 1 : item.count, subtotal: item.count * item.price }
      } return item
    })
    setShopCard(dacData)
  }

  if (isLoading) return <p>Yuklanyapti...</p>
  if (!data?.length) return <p>Wishlist bo'sh</p>

  return (
    <div className="grid grid-cols-3 gap-10">
      <div className="overflow-x-auto col-span-2">
        <div className="hidden grid-cols-[4fr_2fr_1fr_1fr] gap-4 border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-500 md:grid">
          <div>Product</div>
          <div className="text-center">Quantity</div>
          <div className="text-right">Price</div>
          <div className="text-right">Subtotal</div>
        </div>

        {shopCard?.map((item: any) => (
          <div key={item._id} className="grid gap-4 border-b border-gray-200 px-4 py-4 last:border-b-0 md:grid-cols-[4fr_2fr_1fr_1fr] md:items-center">
            <div className="flex items-start gap-4">
              <img
                src={urlFor(item.thumbnail.asset._ref).toString()}
                alt={item.name}
                className="h-24 w-24 rounded-xl border object-cover"
              />
              <div>
                <div className="text-lg font-semibold text-gray-900">{item.name}</div>
                <p className="text-sm text-gray-500 mt-1">Color: {item.colors?.[0]}</p>
                <button className="mt-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black cursor-pointer">
                  <span>✕</span>
                  Remove
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-2 py-1">
                <button
                  className="h-8 w-8 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => decremen(item._id)} >−</button>
                <p>{item.count}</p>
                <button
                  className="h-8 w-8 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onClick={() => increment(item._id)}>+
                </button>
              </div>
            </div>

            <div className="text-right text-gray-900">
              <div className="text-sm text-gray-500 md:hidden">Price</div>
              <div className="text-base font-semibold">{item.price}</div>
            </div>

            <div className="text-right text-gray-900">
              <div className="text-sm text-gray-500 md:hidden">Subtotal</div>
              <div>{item.subtotal}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="border border-[#141718] rounded-md p-3">
        <p className="text-[18px] font-medium pb-2">Cart summary</p>
        <RadioGroup defaultValue="plus" className="max-w-sm">
          <FieldLabel htmlFor="plus-plan" onClick={() => setExpress("Free shipping")}>
            <Field orientation="horizontal">
              <RadioGroupItem value="plus" id="plus-plan" />
              <RadioGroup className="flex items-center justify-between">
                <FieldTitle>Free shipping</FieldTitle>
                <FieldTitle>$0.00</FieldTitle>
              </RadioGroup>
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="pro-plan" onClick={() => setExpress("Express shipping")}>
            <Field orientation="horizontal">
              <RadioGroupItem value="pro" id="pro-plan" />
              <RadioGroup className="flex items-center justify-between">
                <FieldTitle>Express shipping</FieldTitle>
                <FieldTitle>+9%</FieldTitle>
              </RadioGroup>
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="enterprise-plan" onClick={() => setExpress("Pick Up")}>
            <Field orientation="horizontal">
              <RadioGroupItem value="enterprise" id="enterprise-plan" />
              <RadioGroup className="flex items-center justify-between">
                <FieldTitle>Pick Up</FieldTitle>
                <FieldTitle>-3%</FieldTitle>
              </RadioGroup>
            </Field>
          </FieldLabel>
        </RadioGroup>
        <div className="pt-4">
          <div className="flex items-center justify-between border-b mb-5 pb-3 text-[14px]">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex items-center justify-between mb-5 pb-3">
            <p className="font-bold">Total</p>
            <p className="font-bold">${total}</p>
          </div>
          <button className="w-full bg-gray-800 text-white py-1.5 rounded-[9px] cursor-pointer hover:opacity-80 active:opacity-25 transition-all duration-100" onClick={() => shopping(subtotal, express, shopCard, 2)}>Checkout</button>
        </div>
      </div>
    </div >
  )
}
