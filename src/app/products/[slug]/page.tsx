"use client";
import ProductsSection, {
	IProduct,
} from "@/components/sections/ProductsSection";
import { context } from "@/context/ApplicationContext";
import { useTitle } from "@/hooks/useTitle";
import { axiosOpenedInstance } from "@/utils/axios";
import { Button, Chip, Image } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useQuery } from "react-query";
import classNames from "classnames";
import toast from "react-hot-toast";

const Product = () => {
	const params = useParams();
	const router = useRouter();
	const { state, dispatch } = useContext(context);
	const [actualImage, setActualImage] = useState("");
	const productQuery = useQuery(["product", params.slug], async () => {
		if (typeof params.slug !== "string") {
			router.push("/products");
			return null;
		}
		const res = await axiosOpenedInstance(
			`/products/${params.slug.split("-").at(-1)}`
		);
		setActualImage(res.data.product.images[0]);
		return res.data.product as IProduct;
	});
	useTitle(productQuery.data?.title || "Loading...");

	const [quantity, setQuantity] = useState(1);
	useEffect(() => {
		if (state.cart && productQuery.data) {
			setQuantity(state.cart[productQuery.data._id]?.quantity || 1);
		}
	}, [productQuery.data, state.cart]);

	const handleAddToCart = () => {
		if (!state.user) {
			router.push("/auth/login");
		} else {
			if (
				state.cart &&
				productQuery.data &&
				state.cart[productQuery.data._id]
			) {
				toast.success("cart was updated successfully");
			} else {
				toast.success("Product added to cart successfully");
			}
			dispatch({
				type: "add_product_to_cart",
				payload: {
					product: productQuery.data,
					quantity,
				},
			});
		}
	};

	const handleAdd = () => {
		setQuantity((prev) => {
			if (!productQuery.data) return prev;
			if (prev < productQuery.data.stock) {
				return prev + 1;
			}
			return prev;
		});
	};

	const handleRemove = () => {
		setQuantity((prev) => {
			if (prev > 1) return prev - 1;
			return prev;
		});
	};

	const totalDiscounted = useMemo(() => {
		if (!productQuery.data) return "0";
		const disountedPrice =
			((100 - productQuery.data.discountPercentage) *
				productQuery.data.price) /
			100;
		return disountedPrice.toFixed(2);
	}, [productQuery.data]);

	return productQuery.data ? (
		<div className="container mx-auto">
			<div className="flex gap-[100px] my-12 flex-col lg:flex-row">
				<div className="lg:flex flex-col hidden">
					<Image
						src={actualImage}
						height={500}
						width={700}
						className="h-[500px] object-cover border-2 border-slate-300 rounded-2xl"
						alt={productQuery.data.title}
					/>
					<div className="flex h-[70px] justify-center mt-4 gap-5">
						{productQuery.data.images.map((image, index) => {
							return (
								<Image
									key={index}
									src={image}
									alt="thumb"
									height={70}
									width={150}
									className={classNames(
										"h-[70px] w-[150px] object-cover rounded-lg border-2 border-slate-300 cursor-pointer hover:border-blue-500 transition-all",
										{
											"!border-blue-500":
												actualImage === image,
										}
									)}
									onClick={() => setActualImage(image)}
								/>
							);
						})}
					</div>
				</div>
				<div className="flex lg:hidden flex-wrap h-fit justify-center mt-4 gap-5">
					{productQuery.data.images.slice(0,2).map((image, index) => {
						return (
							<Image
								key={index}
								src={image}
								alt="thumb"
								height={300}
								width={300}
								className={classNames(
									"h-[300px] w-[300px] object-cover rounded-lg border-2 border-slate-300 cursor-pointer hover:border-blue-500 transition-all"
								)}
							/>
						);
					})}
				</div>
				<div className="lg:max-w-[50%]">
					<h1 className="text-3xl font-bold">
						{productQuery.data.title}
					</h1>
					<div className="flex items-center justify-between my-4">
						<h2 className="text-xl uppercase">
							{productQuery.data.category}
						</h2>
						<Chip>{productQuery.data.stock} items in stock</Chip>
					</div>
					<p>{productQuery.data.description}</p>
					<div className="flex flex-col sm:flex-row gap-10 justify-between items-center my-8">
						<p className="text-5xl">
							{productQuery.data.discountPercentage ? (
								<>
									<span className="text-2xl relative after:left-0 after:border-red after:absolute after:w-full after:h-1 after:border-rose-500 after:border-2 after:-rotate-[25deg] after:top-[50%] translate-y-[-50%] after:z-10">
										${productQuery.data.price}
									</span>
									<span> ${totalDiscounted} </span>
								</>
							) : (
								<span>${productQuery.data.price}</span>
							)}
							<span className="text-lg">/ unit</span>
						</p>
						<div className="flex flex-col items-end gap-3 ">
							<div className="flex gap-4 items-center pb-4 border-dashed border-b-2 border-b-slate-300 w-full justify-end">
								<Button color="danger" onClick={handleRemove}>
									<FaMinus />
								</Button>
								<p className="text-4xl">{quantity}</p>
								<Button color="primary" onClick={handleAdd}>
									<FaPlus />
								</Button>
							</div>
							<div className="flex gap-5 items-center">
								<Button
									onClick={handleAddToCart}
									startContent={<FaCartShopping />}
								>
									Add to cart
								</Button>
								<p>
									Total :{" "}
									<span>
										${quantity * productQuery.data.price}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<ProductsSection />
		</div>
	) : null;
};

export default Product;
