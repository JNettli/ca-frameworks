import { useState, useEffect } from "react";
import useCartStore from "./CartStore";
import Title from "./Title";

interface Review {
    description: string;
    id: string;
    rating: number;
    username: string;
}

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
    reviews: Review[];
};

export function Product() {
    const { addItemToCart } = useCartStore();
    const [data, setData] = useState<ProductData | null>(null);
    const splitUrl = document.location.pathname.split("/")[2];

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(
                    "https://v2.api.noroff.dev/online-shop/" + splitUrl
                );
                const singleData = await res.json();
                setData(singleData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getData();
    }, [splitUrl]);

    if (!data) {
        return <h1 className="text-xl">Loading...</h1>;
    }

    return (
        <>
            <Title title={data.title} />
            <div key={data.id} className="flex flex-col justify-self-center">
                <div className="max-w-full self-center">
                    <img
                        src={data.image.url}
                        alt={data.image.alt}
                        className="max-h-96 max-w-fit object-contain rounded-2xl"
                    />
                </div>
                <div className="flex justify-between p-4">
                    <h1 className="text-2xl">{data.title}</h1>
                    <button
                        className="rounded-lg bg-blue-400 py-2 px-4 hover:bg-green-400 cursor-pointer transition duration-150"
                        onClick={() => addItemToCart(data)}
                    >
                        Add to cart!
                    </button>
                </div>
                <div className="px-4 pb-4 mb-4 border-b-2">
                    {data.discountedPrice !== data.price ? (
                        <>
                            <span className="line-through text-gray-500 text-lg">
                                ${data.price}
                            </span>
                            <span className="text-red-500 ml-2 text-lg font-semibold">
                                ${data.discountedPrice}
                            </span>
                        </>
                    ) : (
                        <span className="text-lg font-semibold">
                            ${data.price}
                        </span>
                    )}
                </div>
                <div className="px-4 pb-4 mb-4 border-b">
                    <h2 className="text-xl font-semibold">Description:</h2>
                    <p>{data.description}</p>
                </div>

                <div className="px-4 pb-4 mb-4 border-b-1">
                    <h2 className="text-xl font-semibold">Tags:</h2>
                    <p>
                        {data.tags
                            .map(
                                (tag) =>
                                    tag.charAt(0).toUpperCase() + tag.slice(1)
                            )
                            .join(", ")}
                    </p>
                </div>
                <div>
                    <h2 className="px-4 text-lg font-semibold">Reviews:</h2>
                    <div>
                        {data.reviews.length > 0 ? (
                            data.reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="rounded-xl bg-white py-2 px-4 mt-2"
                                >
                                    <p>{review.description}</p>
                                    <div className="flex justify-between">
                                        <p className="font-semibold self-end">
                                            By: {review.username}
                                        </p>
                                        <div className="flex gap-2">
                                            <p className="font-semibold self-center">
                                                Rating:{" "}
                                            </p>
                                            <p className="text-yellow-400 text-2xl">
                                                {(() => {
                                                    const roundedRating =
                                                        Math.floor(
                                                            review.rating * 2
                                                        ) / 2;

                                                    return roundedRating === 5
                                                        ? "★★★★★"
                                                        : roundedRating === 4.5
                                                        ? "✫★★★★"
                                                        : roundedRating === 4
                                                        ? "☆★★★★"
                                                        : roundedRating === 3.5
                                                        ? "☆✫★★★"
                                                        : roundedRating === 3
                                                        ? "☆☆★★★"
                                                        : roundedRating === 2.5
                                                        ? "☆☆✫★★"
                                                        : roundedRating === 2
                                                        ? "☆☆☆★★"
                                                        : roundedRating === 1.5
                                                        ? "☆☆☆✫★"
                                                        : roundedRating === 1
                                                        ? "☆☆☆☆★"
                                                        : roundedRating === 0.5
                                                        ? "☆☆☆☆✫"
                                                        : "☆☆☆☆☆";
                                                })()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="px-4 text-xl">
                                No reviews for this product!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
