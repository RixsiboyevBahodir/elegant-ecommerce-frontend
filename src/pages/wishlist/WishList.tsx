// import useWishlist from "@/hooks/useWishlist"
// import { useGetProductByIdArrQuery } from "@/store/api"
// import { useNavigate } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import Shopping from "./components/Shopping"

export default function WishList() {
  const [tabsValue, setTabsValue] = useState("Shopping cart")

  // const navigate = useNavigate()
  // const productPage = (id: string) => {
  //   navigate(`/products/${id}`)
  // }

  const user = JSON.parse(localStorage.getItem("user")!)
  const array = user.wishlist?.map((item: any) => item._ref)

  // const wishlist = user.wishlist

  // const { addWishlist, productId } = useWishlist()

  // const { data } = useGetProductByIdArrQuery(array)

  if (array?.length === 0) return <p>Wishlist bo'sh</p>

  return (
    <div>
      <Tabs value={tabsValue}>
        <TabsList variant="line">
          <TabsTrigger value="Shopping cart" onClick={() => setTabsValue("Shopping cart")}>Shopping cart 1</TabsTrigger>
          <TabsTrigger value="Checkout details" onClick={() => setTabsValue("Checkout details")}>Checkout details 2</TabsTrigger>
          <TabsTrigger value="Order complete" onClick={() => setTabsValue("Order complete")}>Order complete 3</TabsTrigger>
        </TabsList>
      </Tabs>
      {
        tabsValue == 'Shopping cart' ? <Shopping /> : tabsValue == "Checkout details" ? <p>Checkout details</p> : <p>Order complete</p>
      }
    </div>
  )
}
