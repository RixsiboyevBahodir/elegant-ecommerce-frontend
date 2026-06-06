import { urlFor } from "@/clinet/clinet"
import useWishlist from "@/hooks/useWishlist"
import { useGetProductByIdArrQuery } from "@/store/api"
import { TbShoppingBagCheck, TbShoppingBagPlus } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

export default function WishList() {

  const navigate = useNavigate()
  const productPage = (id: string) => {
    navigate(`/products/${id}`)
  }

  const user = JSON.parse(localStorage.getItem("user")!)
  const array = user.wishlist?.map((item: any) => item._ref)

  const wishlist = user.wishlist

  const { addWishlist, productId } = useWishlist()

  const { data } = useGetProductByIdArrQuery(array)

  if (array?.length === 0) return <p>Wishlist bo'sh</p>

  return (
    <div>
      <div className=" grid grid-cols-4 gap-4">
        {
          data?.length ? data?.map(item => {
            return (<div key={item._id} onClick={() => productPage(item._id)} className="relative cursor-pointer border bg-gray-100 rounded-2xl p-3">
              <img src={urlFor(item.thumbnail.asset._ref).toString()} alt="" className="bg-white p-2 rounded-2xl border" />
              <div className="p-3">
                <p>{item.name}</p>
                <p>{item.info}</p>
                <p>{item.price}$</p>
                <div>
                  <button className="flex justify-center bg-amber-500 p-2 rounded-lg items-center gap-3 font-semibold border w-full cursor-pointer" onClick={(e) => addWishlist(e, item._id)}>
                    {wishlist.some((wish: any) => wish._ref === item._id) ? (
                      <>
                        <TbShoppingBagCheck /> Added
                      </>
                    ) : (
                      <>
                        <TbShoppingBagPlus className="text-xl" />
                        {productId == item._id ? "Loading..." : "Add to Cart"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>)
          }) : <p>Loading...</p>
        }
      </div>
    </div>
  )
}
