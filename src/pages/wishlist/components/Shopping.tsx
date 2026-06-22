import { urlFor } from "@/clinet/clinet"
import { useGetProductByIdArrQuery, } from "@/store/api"
import { useEffect, useState } from "react"
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Shopping() {

  const user = JSON.parse(localStorage.getItem("user")!)
  const array: string[] = user.wishlist?.map((item: any) => item._ref) ?? []
  const { data, isLoading } = useGetProductByIdArrQuery(array)

  const [shopCard, setShopCard] = useState<any>([])
  const [subtotal, setSubtotal] = useState<any>(0)

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
        <p className="text-[18px] font-medium">Cart summary</p>
        <RadioGroup defaultValue="plus" className="max-w-sm">
          <FieldLabel htmlFor="plus-plan">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Free shipping</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="plus" id="plus-plan" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="pro-plan">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Express shipping</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="pro" id="pro-plan" />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="enterprise-plan">
            <Field orientation="horizontal">
              <FieldContent>
                <FieldTitle>Pick Up</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="enterprise" id="enterprise-plan" />
            </Field>
          </FieldLabel>
        </RadioGroup>
        <p>{subtotal}</p>
      </div>
    </div>
  )
}
