import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
    const [data, setData] = useState<productData[]>([]);
    type productData = {
        description: string;
        discountedPrice: number;
        id: string;
        image: {
            url: string;
            alt: string;
        };
        price: number;
        rating: number;
        tags: [string];
        title: string;
    };
    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(
                    "https://v2.api.noroff.dev/online-shop/"
                );
                const data = await res.json();
                console.log(data);
            } catch {
                console.error("Wronge");
            }
        }
        getData();
    }, []);
    return (
        <div className="bg-slate-100">
            <p>Hello world!</p>
            <Link to={"/products"}>Click here!</Link>
        </div>
    );
}

export default App;
