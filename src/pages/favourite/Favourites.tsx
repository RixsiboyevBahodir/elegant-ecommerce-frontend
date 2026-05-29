import { urlFor } from "@/clinet/clinet"
import useFavourite from "@/hooks/useFavourite"
import useWishlist from "@/hooks/useWishlist"
import { useGetProductByIdArrQuery } from "@/store/api"
import { FaHeart } from "react-icons/fa"
import { SlHeart } from "react-icons/sl"
import { TbShoppingBagCheck, TbShoppingBagPlus } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

export default function Favourites() {

  const navigate = useNavigate()
  const productPage = (id: string) => {
    navigate(`/products/${id}`)
  }

  const { addWishlist, productId } = useWishlist()
  const { addFavourite, productId: favouriteId } = useFavourite()


  const user = JSON.parse(localStorage.getItem("user")!)
  const array = user.favourite?.map((item: any) => item._ref)
  const { data, isLoading } = useGetProductByIdArrQuery(array)
  const favourites = user.favourite
  const wishlist = user.wishlist

  if (array?.length === 0) return <p>Favourites bo'sh</p>

  return (
    <div>
      <div className=" grid grid-cols-4 gap-4">
        {
          data?.length ? data?.map(item => {
            return (<div key={item._id} onClick={() => productPage(item._id)} className="relative cursor-pointer border bg-gray-100 rounded-2xl p-3">
              <img src={urlFor(item.thumbnail.asset._ref).toString()} alt="" className="bg-white p-2 rounded-2xl border" />
              <span className="absolute top-2 right-2 p-2 bg-white border rounded-full" onClick={(e) => addFavourite(e, item._id)}>
                {favourites.some((fav: any) => fav._ref === item._id) ? <FaHeart className="text-xl text-red-500" /> : <SlHeart className="text-xl text-gray-500" />}
              </span>
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
