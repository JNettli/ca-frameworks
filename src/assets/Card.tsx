import { Link } from "react-router-dom";

type CardItems = {
    id: string;
    title: string;
    image: {
        url: string;
        alt: string;
    };
    price: number;
    discountedPrice?: number;
    description: string;
    rating: number;
    reviews: string[];
};

const Card = ({
    id,
    title,
    image,
    price,
    discountedPrice,
    rating,
    reviews,
}: CardItems) => {
    return (
        <Link
            to={`/product/${id}`}
            className="border-2 rounded-2xl p-2 bg-white flex flex-col items-center max-h-72 max-w-72 flex-grow transition duration-150 hover:scale-105"
        >
            <img
                src={image.url}
                alt={image.alt}
                className="max-h-40 max-w-full object-cover rounded-2xl"
            />
            <h2 className="text-center text-xl">{title}</h2>
            <p className="text-lg font-semibold mt-2">
                {discountedPrice !== price ? (
                    <>
                        <span className="line-through text-gray-500">
                            ${price}
                        </span>
                        <span className="text-red-500 ml-2">
                            ${discountedPrice}
                        </span>
                    </>
                ) : (
                    <span>${price}</span>
                )}
            </p>
            <p className="text-yellow-400 text-2xl">
                {(() => {
                    const roundedRating = Math.floor(rating * 2) / 2;

                    if (roundedRating === 0) {
                        return reviews.length !== 0 ? "☆☆☆☆☆" : "";
                    }

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
        </Link>
    );
};

export default Card;
