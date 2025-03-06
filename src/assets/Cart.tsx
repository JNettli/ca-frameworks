import useCartStore from "./CartStore";
import { Link } from "react-router-dom";
import Title from "./Title";

const Cart = () => {
    const {
        cartItems,
        removeItemFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
    } = useCartStore();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    if (cartItems.length === 0) {
        return (
            <>
                <Title title={"Empty Cart"} />
                <div className="flex flex-col items-center mt-20">
                    <span className="text-6xl mb-8">🛒</span>
                    <h1 className="text-2xl">Looks like your cart is empty.</h1>
                    <Link
                        to={"/"}
                        className="text-blue-600 underline hover:text-blue-400 cursor-pointer transition duration-150"
                    >
                        Maybe you want to browse some cool vibes?
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Title title={"Your Cart"} />
            <div className="bg-white rounded-xl flex flex-col max-w-2xl border-2 mx-auto p-4">
                <h1 className="text-2xl font-semibold border-b-2 pb-2 mb-2">
                    Cart
                </h1>
                <div>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between pb-2 mb-2 border-b-2"
                        >
                            <div>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p>
                                        ${item.price} x {item.quantity}
                                    </p>
                                </div>
                            </div>
                            <div className="flex">
                                <button
                                    className="rounded-xl px-4 py-2 bg-blue-400 cursor-pointer hover:bg-blue-300 transition duration-150"
                                    onClick={() => decreaseQuantity(item.id)}
                                >
                                    -
                                </button>
                                <p className="text-xl p-2">{item.quantity}</p>
                                <button
                                    className="rounded-xl px-4 py-2 bg-blue-400 cursor-pointer hover:bg-blue-300 transition duration-150"
                                    onClick={() => increaseQuantity(item.id)}
                                >
                                    +
                                </button>
                                <button
                                    className="rounded-xl px-4 py-2 bg-red-500 cursor-pointer ml-4 hover:bg-red-600 transition duration-150"
                                    onClick={() => removeItemFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>Total:</h2>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex gap-4">
                    <Link to={"/cart/success"}>
                        <button className="rounded-xl px-4 py-2 bg-green-400 cursor-pointer hover:bg-green-300 transition duration-150">
                            Go to Checkout
                        </button>
                    </Link>
                    <button
                        onClick={clearCart}
                        className="rounded-xl px-4 py-2 bg-blue-400 cursor-pointer hover:bg-blue-300 transition duration-150"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </>
    );
};

export default Cart;
