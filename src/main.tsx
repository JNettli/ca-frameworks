import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Layout, Product } from "./assets/Components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";

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
                path: "/products",
                element: <Product />,
                children: [
                    {
                        path: ":productId",
                        element: <p>Wow!</p>,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
