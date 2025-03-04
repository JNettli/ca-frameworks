import { Link } from "react-router-dom";
import { Cart } from "./Cart";

function Header() {
    return (
        <header className="bg-blue-400 p-4">
            <nav className="flex justify-between">
                <div className="flex gap-4">
                    <Link to={"/"} className="text-xl">
                        🚽
                    </Link>
                    <Link to={"/products"} className="text-xl">
                        Products
                    </Link>
                </div>
                <button className="text-xl cursor-pointer" onClick={Cart}>
                    🛒
                </button>
            </nav>
        </header>
    );
}

export { Header };
