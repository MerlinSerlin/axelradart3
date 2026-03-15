'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { cartUtils, type Cart, type CartItem } from '../components/cart/cart-utils'
import type { ECommData } from '@/data/art-data'

interface CartContextType {
  cart: Cart
  isCartOpen: boolean
  isCartManagementModalOpen: boolean
  cartManagementModalData: {
    artworkTitle: string
    artworkImagePath: string
    eCommData: ECommData
  } | null
  openCart: () => void
  closeCart: () => void
  openCartManagementModal: (artworkTitle: string, artworkImagePath: string, eCommData: ECommData) => void
  closeCartManagementModal: () => void
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getItemCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCartManagementModalOpen, setIsCartManagementModalOpen] = useState(false)
  const [cartManagementModalData, setCartManagementModalData] = useState<{
    artworkTitle: string
    artworkImagePath: string
    eCommData: ECommData
  } | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    setCart(cartUtils.getCart())
  }, [])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const openCartManagementModal = (artworkTitle: string, artworkImagePath: string, eCommData: ECommData) => {
    setCartManagementModalData({ artworkTitle, artworkImagePath, eCommData })
    setIsCartManagementModalOpen(true)
  }

  const closeCartManagementModal = () => {
    setIsCartManagementModalOpen(false)
    setCartManagementModalData(null)
  }

  const addItem = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    const updatedCart = cartUtils.addItem(item)
    setCart(updatedCart)
  }

  const removeItem = (itemId: string) => {
    const updatedCart = cartUtils.removeItem(itemId)
    setCart(updatedCart)
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    const updatedCart = cartUtils.updateQuantity(itemId, quantity)
    setCart(updatedCart)
  }

  const clearCart = () => {
    const updatedCart = cartUtils.clearCart()
    setCart(updatedCart)
  }

  const getItemCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        isCartManagementModalOpen,
        cartManagementModalData,
        openCart,
        closeCart,
        openCartManagementModal,
        closeCartManagementModal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}