import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./Product";

interface Product {
    id: string;
    title: string;
    price: number;
    image: {
        url: string;
        alt: string;
    };
}

interface CartProduct extends Product {
    quantity: number;
}

interface CartState {
    cartItems: CartProduct[];
    addItemToCart: (item: Product) => void;
    removeItemFromCart: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    clearCart: () => void;
    cartQuantity: number;
}

const useCartStore = create<CartState>()(
    persist<CartState>(
        (set, get) => ({
            cartItems: [],
            cartQuantity: 0,
            addItemToCart: (item: Product) => {
                const itemExists = get().cartItems.find(
                    (cartItem) => cartItem.id === item.id
                );
                if (itemExists) {
                    set((state) => ({
                        cartItems: state.cartItems.map((cartItem) =>
                            cartItem.id === item.id
                                ? {
                                      ...cartItem,
                                      quantity: cartItem.quantity + 1,
                                  }
                                : cartItem
                        ),
                        cartQuantity: state.cartQuantity + 1,
                    }));
                } else {
                    set((state) => ({
                        cartItems: [
                            ...state.cartItems,
                            { ...item, quantity: 1 },
                        ],
                        cartQuantity: state.cartQuantity + 1,
                    }));
                }
            },
            removeItemFromCart: (productId) => {
                set((state) => {
                    const itemToRemove = state.cartItems.find(
                        (cartItem) => cartItem.id === productId
                    );
                    return {
                        cartItems: state.cartItems.filter(
                            (cartItem) => cartItem.id !== productId
                        ),
                        cartQuantity:
                            state.cartQuantity - (itemToRemove?.quantity || 0),
                    };
                });
            },
            increaseQuantity: (productId) => {
                set((state) => ({
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem.id === productId
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    ),
                    cartQuantity: state.cartQuantity + 1,
                }));
            },
            decreaseQuantity: (productId) => {
                set((state) => {
                    const itemToDecrease = state.cartItems.find(
                        (cartItem) => cartItem.id === productId
                    );
                    return {
                        cartItems: state.cartItems
                            .map((cartItem) =>
                                cartItem.id === productId
                                    ? {
                                          ...cartItem,
                                          quantity: Math.max(
                                              cartItem.quantity - 1,
                                              0
                                          ),
                                      }
                                    : cartItem
                            )
                            .filter((cartItem) => cartItem.quantity > 0),
                        cartQuantity:
                            state.cartQuantity -
                            (itemToDecrease && itemToDecrease.quantity > 0
                                ? 1
                                : 0),
                    };
                });
            },
            clearCart: () => set({ cartItems: [], cartQuantity: 0 }),
        }),
        {
            name: "cart",
        }
    )
);

export default useCartStore;
