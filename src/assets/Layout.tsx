import { Outlet } from "react-router-dom";
import { Header, Footer } from "./Components";

function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export { Layout };
