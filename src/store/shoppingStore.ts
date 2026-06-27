import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useShopping = create(
    persist((set) => ({
        subtotal: 0,
        express: 'Free shipping',
        shopCard: [],
        state: 1,
        shoppingAdd: (subtotal: any, express: any, shopCard: any, state: any) => set({ subtotal, express, shopCard, state }),
        changeState: (state: any) => set({ state })
    }), { name: 'shopping' }))

export default useShopping