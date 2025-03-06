import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="flex justify-between bg-blue-400 p-8 pb-16">
            <p>&copy; VibeCart 2025</p>
            <Link
                to={"/contact"}
                className="hover:text-white transition duration-150"
            >
                Contact us
            </Link>
        </footer>
    );
}

export { Footer };
