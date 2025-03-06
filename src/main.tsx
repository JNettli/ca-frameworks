import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Layout, Product, Contact, Checkout } from "./assets/Components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Cart from "./assets/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <App />,
            },
            {
                path: "/product/:productId",
                element: <Product />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/cart/success",
                element: <Checkout />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
