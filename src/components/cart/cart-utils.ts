export interface CartItem {
  id: string; // unique identifier for cart item
  title: string;
  size: string;
  price: number;
  priceId: string;
  imagePath: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

const CART_STORAGE_KEY = 'artCart';

export const cartUtils = {
  // Get cart from localStorage
  getCart(): Cart {
    if (typeof window === 'undefined') return { items: [], total: 0 };

    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return { items: [], total: 0 };

      const cart = JSON.parse(stored) as Cart;
      return {
        items: cart.items || [],
        total: this.calculateTotal(cart.items || [])
      };
    } catch {
      return { items: [], total: 0 };
    }
  },

  // Save cart to localStorage
  saveCart(cart: Cart): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  },

  // Add item to cart
  addItem(item: Omit<CartItem, 'id' | 'quantity'>): Cart {
    const cart = this.getCart();
    const existingItemIndex = cart.items.findIndex(
      cartItem => cartItem.title === item.title && cartItem.size === item.size
    );

    if (existingItemIndex > -1) {
      // Item already exists, increase quantity
      cart.items[existingItemIndex].quantity += 1;
    } else {
      // New item, add to cart
      const newItem: CartItem = {
        ...item,
        id: `${item.title}-${item.size}-${Date.now()}`,
        quantity: 1
      };
      cart.items.push(newItem);
    }

    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
    return cart;
  },

  // Remove item from cart
  removeItem(itemId: string): Cart {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.id !== itemId);
    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
    return cart;
  },

  // Update item quantity
  updateQuantity(itemId: string, quantity: number): Cart {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        return this.removeItem(itemId);
      } else {
        cart.items[itemIndex].quantity = quantity;
        cart.total = this.calculateTotal(cart.items);
        this.saveCart(cart);
      }
    }

    return cart;
  },

  // Clear entire cart
  clearCart(): Cart {
    const emptyCart = { items: [], total: 0 };
    this.saveCart(emptyCart);
    return emptyCart;
  },

  // Calculate total price
  calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Get cart item count
  getItemCount(): number {
    const cart = this.getCart();
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }
};