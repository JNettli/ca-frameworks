import { useState, useEffect } from "react";
import Card from "./assets/Card";
import Title from "./assets/Title";

type ProductData = {
    description: string;
    discountedPrice: number;
    id: string;
    image: {
        url: string;
        alt: string;
    };
    price: number;
    rating: number;
    tags: string[];
    title: string;
    reviews: string[];
};

function App() {
    const [data, setData] = useState<ProductData[]>([]);

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(
                    "https://v2.api.noroff.dev/online-shop?&sortOrder=desc"
                );
                const allProducts = await res.json();
                setData(allProducts.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, []);
    return (
        <>
            <Title title={"All Products"} />
            <h1 className="text-4xl font-semibold flex justify-center pb-4">
                Browse All Products
            </h1>
            <div className="max-w-max mx-auto">
                <div className="bg-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {data.map((product) => {
                        return (
                            <div
                                className="flex justify-center"
                                key={product.id}
                            >
                                <Card
                                    id={product.id}
                                    title={product.title}
                                    image={product.image}
                                    price={product.price}
                                    discountedPrice={product.discountedPrice}
                                    description={product.description}
                                    rating={product.rating}
                                    reviews={product.reviews}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default App;
