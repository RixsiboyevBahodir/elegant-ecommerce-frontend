import { client } from "@/clinet/clinet"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function useFavourite() {

    const navigate = useNavigate()

    const [productId, setProducId] = useState('')

    const addFavourite = async (event: React.MouseEvent, productId: string) => {
        event.stopPropagation()

        setProducId(productId)

        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (!user._id) {
            alert('Avval login qiling')
            return navigate("/auth/login")
        }

        const favourite = user.favourite || []

        const exists = favourite.some((w: any) => w._ref === productId)
        if (exists) {
            // Favouritedan olib tashlash
            const updatedFavourite = favourite.filter((w: any) => w._ref !== productId)
            localStorage.setItem('user', JSON.stringify({ ...user, favourite: updatedFavourite }))

            try {
                await client
                    .patch(user._id)
                    .unset([`favourite[_ref == "${productId}"]`])
                    .commit()
            } catch (error) {
                alert("Xatolik yuz berdi")
            }
        } else {
            // Favouritega qo'shish
            const newItem = { _ref: productId, _type: 'reference' }
            const updatedFavourite = [...favourite, newItem]
            localStorage.setItem('user', JSON.stringify({ ...user, favourite: updatedFavourite }))

            try {
                await client
                    .patch(user._id)
                    .setIfMissing({ favourite: [] })
                    .append('favourite', [newItem])
                    .commit()
            } catch (error) {
                alert("Xatolik yuz berdi")
            }
        }
        setProducId('')
    }
    return { addFavourite, productId }
}
