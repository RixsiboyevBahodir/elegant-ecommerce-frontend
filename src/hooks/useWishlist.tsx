import { client } from "@/clinet/clinet"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function useWishlist() {

    const navigate = useNavigate()

    const [productId, setProducId] = useState('')


    const addWishlist = async (event: React.MouseEvent, productId: string) => {
        event.stopPropagation()

        setProducId(productId)

        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (!user._id) {
            alert('Avval login qiling')
            return navigate("/auth/login")
        }

        const wishlist = user.wishlist || []

        const exists = wishlist.some((w: any) => w._ref === productId)
        // if (exists) return alert("Bu wishlistada bor")
        if (exists) {
            const updatedWishlist = wishlist.filter((w: any) => w._ref !== productId)
            localStorage.setItem('user', JSON.stringify({ ...user, wishlist: updatedWishlist }))

            try {
                await client
                    .patch(user._id)
                    .unset([`wishlist[_ref == "${productId}"]`])
                    .commit()
            } catch (error) {
                alert("Xatolik yuz berdi")
            }
        } else {
            // Wishlistga qo'shish
            const newItem = { _ref: productId, _type: 'reference' }
            const updatedWishlist = [...wishlist, newItem]
            localStorage.setItem('user', JSON.stringify({ ...user, wishlist: updatedWishlist }))

            try {
                await client
                    .patch(user._id)
                    .setIfMissing({ wishlist: [] })
                    .append('wishlist', [newItem])
                    .commit()
            } catch (error) {
                alert("Xatolik yuz berdi")
            }

        }

        setProducId('')

    }
    return { addWishlist, productId }
}
