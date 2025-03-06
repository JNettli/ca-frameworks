import { Link } from "react-router-dom";
import useCartStore from "./CartStore";

function Header() {
    const { cartQuantity } = useCartStore();
    return (
        <header className="bg-blue-400 p-1">
            <nav className="flex justify-between">
                <Link
                    to={"/"}
                    className="text-xl flex gap-4 bg-blue-600 p-3 px-5 m-1 ml-8 rounded-xl hover:bg-white transition duration-200"
                >
                    VibeCart
                </Link>
                <Link to={"/cart"} className="text-xl cursor-pointer">
                    <div className="flex bg-blue-600 p-3 m-1 mr-8 rounded-xl hover:bg-white transition duration-200">
                        {cartQuantity !== 0 ? (
                            <div className="bg-red-500 rounded-full px-2 text-sm h-6 mt-1 mr-1">
                                {cartQuantity}
                            </div>
                        ) : (
                            <></>
                        )}
                        🛒
                    </div>
                </Link>
            </nav>
        </header>
    );
}

export { Header };
