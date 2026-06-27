// import useWishlist from "@/hooks/useWishlist"
// import { useGetProductByIdArrQuery } from "@/store/api"
// import { useNavigate } from "react-router-dom"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Shopping from "./components/Shopping"
import useShopping from "@/store/shoppingStore"
import CheckOut from "./components/CheckOut"

export default function WishList() {
  const shoppingState = useShopping((state: any) => state.state)

  const changeState = useShopping((state: any) => state.changeState)

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
      <Tabs value={shoppingState || 0}>
        <TabsList variant="line">
          <TabsTrigger value={1} onClick={() => changeState(1)}>Shopping cart 1</TabsTrigger>
          <TabsTrigger value={2} onClick={() => changeState(2)}>Checkout details 2</TabsTrigger>
          <TabsTrigger value={3} onClick={() => changeState(3)}>Order complete 3</TabsTrigger>
        </TabsList>
      </Tabs>
      {
        shoppingState == 1 ? <Shopping /> : shoppingState == 2 ? <CheckOut/> : <p>Order complete</p>
      }
    </div>
  )
}
