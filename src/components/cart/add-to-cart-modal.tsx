'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import type { CartItem } from '@/components/cart/cart-utils'

export default function AddToCartModal() {
  const {
    isCartManagementModalOpen,
    cartManagementModalData,
    closeCartManagementModal,
    addItem
  } = useCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  if (!cartManagementModalData) return null

  const { artworkTitle, artworkImagePath, eCommData } = cartManagementModalData
  const sizeOptions = Object.entries(eCommData).filter(([_, data]) => data) as [string, { size: string; price: number; priceId: string }][]

  const handleAddToCart = async () => {
    if (!selectedSize) return

    setIsAdding(true)

    try {
      const sizeData = eCommData[selectedSize as keyof typeof eCommData]
      if (!sizeData) return

      const cartItem: Omit<CartItem, 'id' | 'quantity'> = {
        title: artworkTitle,
        size: sizeData.size,
        price: sizeData.price,
        priceId: sizeData.priceId,
        imagePath: artworkImagePath
      }

      addItem(cartItem)

      // Reset and close
      setSelectedSize(null)
      closeCartManagementModal()
    } catch (error) {
      console.error('Failed to add item to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Dialog open={isCartManagementModalOpen} onOpenChange={closeCartManagementModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <h3 className="font-medium text-lg">{artworkTitle}</h3>
            <p className="text-sm text-muted-foreground">Choose your preferred print size</p>
          </div>

          <div className="space-y-3">
            {sizeOptions.map(([sizeKey, sizeData]) => (
              <button
                key={sizeKey}
                onClick={() => setSelectedSize(sizeKey)}
                className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                  selectedSize === sizeKey
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium capitalize">{sizeKey}</div>
                    <div className="text-sm text-muted-foreground">{sizeData.size}</div>
                  </div>
                  <div className="text-lg font-semibold border border-border rounded px-2 py-1">
                    ${sizeData.price}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={closeCartManagementModal}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize || isAdding}
              className="flex-1"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}