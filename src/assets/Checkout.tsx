import { Link } from "react-router-dom";
import useCartStore from "./CartStore";
import { useEffect } from "react";
import Title from "./Title";

const Checkout = () => {
    const { clearCart } = useCartStore();
    useEffect(() => {
        clearCart();
    }, [clearCart]);
    return (
        <>
            <Title title="Thank You!" />
            <div className="bg-white rounded-xl flex flex-col max-w-2xl border-2 mx-auto mt-16 p-4 text-center">
                <h1 className="text-9xl">&#x2705;</h1>
                <h2 className="text-2xl my-16">
                    Your transaction has been completed successfully. We have
                    emailed you details of your order.
                </h2>
                <Link
                    to={"/"}
                    className="rounded-xl px-4 sm:px-20 py-4 text-xl bg-blue-400 cursor-pointer hover:bg-blue-300 transition duration-150 self-center"
                >
                    Back to home page
                </Link>
            </div>
        </>
    );
};

export default Checkout;
