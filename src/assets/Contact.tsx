import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";

function Contact() {
    const [showModal, setShowModal] = useState(false);
    interface FormData {
        firstName: string;
        middleName?: string;
        lastName: string;
        email: string;
        content: string;
    }

    const onSubmit = (data: FormData) => {
        console.log(data);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    return (
        <>
            <Title title="Contact Us" />
            <div className="bg-white rounded-xl flex flex-col max-w-2xl border-2 mx-auto p-4">
                <h1 className="text-3xl font-semibold text-center">
                    Contact Us!
                </h1>
                <form
                    className="flex flex-col p-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        id="firstName"
                        type="text"
                        className="border-2 rounded px-1"
                        {...register("firstName", {
                            required: true,
                            minLength: {
                                value: 3,
                                message: "Please enter a valid first name!",
                            },
                        })}
                        placeholder="Enter first name"
                    />
                    {errors.firstName &&
                        (errors.firstName.message ? (
                            <p className="text-red-600">
                                {typeof errors.firstName.message === "string" &&
                                    errors.firstName.message}
                            </p>
                        ) : (
                            <p className="text-red-600">
                                Please enter a valid first name!
                            </p>
                        ))}
                    <label htmlFor="middleName">Middle Name: (optional)</label>
                    <input
                        id="middleName"
                        type="text"
                        className="border-2 rounded px-1"
                        placeholder="Enter middle name (optional)"
                    />
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        id="lastName"
                        type="text"
                        className="border-2 rounded px-1"
                        {...register("lastName", {
                            required: true,
                            minLength: {
                                value: 3,
                                message: "Please enter a valid last name!",
                            },
                        })}
                        placeholder="Enter last name"
                    />
                    {errors.lastName &&
                        (errors.lastName.message ? (
                            <p className="text-red-600">
                                {typeof errors.lastName.message === "string" &&
                                    errors.lastName.message}
                            </p>
                        ) : (
                            <p className="text-red-600">
                                Please enter a valid last name!
                            </p>
                        ))}
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="text"
                        className="border-2 rounded px-1"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Email must be a valid email!",
                            },
                            minLength: {
                                value: 1,
                                message: "Please enter your email.",
                            },
                        })}
                        placeholder="your.email@here.com"
                    />
                    {errors.email &&
                        (errors.email.message ? (
                            <p className="text-red-600">
                                {typeof errors.email.message === "string" &&
                                    errors.email.message}
                            </p>
                        ) : (
                            <p className="text-red-600">
                                Please enter a valid email!
                            </p>
                        ))}
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        className="border-2 rounded min-h-32 max-h-64 px-1"
                        {...register("content", {
                            required: true,
                            minLength: {
                                value: 3,
                                message:
                                    "Please enter your question, or complaint!",
                            },
                            maxLength: {
                                value: 255,
                                message:
                                    "Your message is too long! Please shorten the text!",
                            },
                        })}
                        placeholder="Enter your question, request or complaint here..."
                    />
                    {errors.content &&
                        (errors.content.message ? (
                            <p className="text-red-600">
                                {typeof errors.content.message === "string" &&
                                    errors.content.message}
                            </p>
                        ) : (
                            <p className="text-red-600">
                                Please enter valid text!
                            </p>
                        ))}

                    <button className="bg-blue-400 rounded-xl px-2 sm:px-20 py-2 self-center mt-4 cursor-pointer hover:bg-blue-300 transition duration-150">
                        Send in your issue!
                    </button>
                </form>
                {showModal && (
                    <>
                        <div
                            className="flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 bg-black opacity-20"
                            onClick={closeModal}
                        ></div>
                        <div className="flex justify-center items-center fixed top-1/6 left-1/4 right-1/4 bottom-1/3 bg-white border-2 rounded-xl">
                            <div>
                                <span
                                    className="text-red-600 text-6xl absolute top-0 right-4 cursor-pointer"
                                    onClick={closeModal}
                                >
                                    &times;
                                </span>
                                <div className="text-center h-full flex flex-col">
                                    <h1 className="text-7xl mb-4">&#x2705;</h1>
                                    <h2 className="text-3xl">
                                        Thank you for your message!
                                    </h2>
                                    <p className="text-xl mb-8">
                                        We will get back to you as soon as
                                        possible!
                                    </p>
                                    <Link
                                        to={"/"}
                                        className="text-xl flex self-center bg-blue-500 p-4 rounded-xl hover:bg-green-400 transition duration-200"
                                    >
                                        Back to home screen
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Contact;
