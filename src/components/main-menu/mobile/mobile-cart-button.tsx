"use client"

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";

export function MobileCartButton() {
  const { openCart, getItemCount, isCartOpen } = useCart();
  const itemCount = getItemCount();

  if (isCartOpen) return null;

  return (
    <Button
      variant="default"
      size="icon"
      onClick={openCart}
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 h-12 w-12 rounded-full shadow-lg"
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
}
