"use client";
import Cart from "@/components/cards/Cart";
import { IProduct } from "@/components/sections/ProductsSection";
import { context } from "@/context/ApplicationContext";
import { useTitle } from "@/hooks/useTitle";
import { ICartB } from "@/types/Cart";
import { axiosSecuredInstance } from "@/utils/axios";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useMemo } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import slugify from "slugify";

const CartPage = () => {
	useTitle("Cart", true);
	const { dispatch, state } = useContext(context);
	const rows = useMemo(() => {
		return Object.keys(state.cart || {}).map((key, index) => {
			const { product, quantity } = state.cart[key] as {
				product: IProduct;
				quantity: number;
			};
			return (
				<TableRow key={`${key}-${index}`}>
					<TableCell>
						<Image
							src={product.thumbnail}
							alt={product.title}
							height={50}
							width={50}
							className={"object-cover h-[50px] w-[50px]"}
						/>
					</TableCell>
					<TableCell>
						<div className="flex justify-between items-center h-full">
							<span>{product.title}</span>{" "}
							<Link
								href={`/products/${slugify(product.title)}-${
									product._id
								}`}
								className="text-blue-500"
							>
								See details
							</Link>
						</div>
					</TableCell>
					<TableCell>${product.price}</TableCell>
					<TableCell>{quantity}</TableCell>
					<TableCell>${product.price * quantity}</TableCell>
					<TableCell>
						<div className={"flex gap-5 items-center"}>
							<Button
								color="default"
								onClick={() => {
									dispatch({
										type: "decrease_product_quantity_to_cart",
										payload: { id: product._id },
									});
								}}
							>
								<FaMinus />
							</Button>
							<Button
								color="primary"
								onClick={() => {
									dispatch({
										type: "increase_product_quantity_to_cart",
										payload: { id: product._id },
									});
								}}
							>
								<FaPlus />
							</Button>
							<Button
								color="danger"
								onClick={() => {
									dispatch({
										type: "remove_product_to_cart",
										payload: { id: product._id },
									});
								}}
							>
								REMOVE
							</Button>
						</div>
					</TableCell>
				</TableRow>
			);
		});
	}, [dispatch, state.cart]);

	const mutation = useMutation({
		mutationKey: "purchase-1",
		mutationFn: async (cart: any) => {
			return await axiosSecuredInstance.post(
				`/users/${state.user._id}/carts`,
				cart
			);
		},
		onError: (error) => {
			console.error("purchase", error);
		},
		onSuccess: () => {
			dispatch({ type: "clear_cart" });
		},
	});
	const handlePurchase = async () => {
		const products = Object.keys(state.cart || {}).map((key) => {
			const { product, quantity } = state.cart[key] as {
				product: IProduct;
				quantity: number;
			};
			return {
				quantity,
				product: product._id,
			};
		});
		await toast.promise(mutation.mutateAsync({ products }), {
			loading: "We are saving your cart.",
			success: <b>Cart saved!</b>,
			error: <b>Could not save.</b>,
		});
	};

	const total = useMemo(() => {
		const keys = Object.keys(state.cart || {});
		return keys.reduce((prev, key) => {
			const { product, quantity } = state.cart[key] as {
				product: IProduct;
				quantity: number;
			};
			return (
				prev +
				product.price *
					quantity *
					(1 - product.discountPercentage / 100)
			);
		}, 0);
	}, [state.cart]);

	const getCarts = async () => {
		if (!state.user) return [];
		const res = await axiosSecuredInstance.get(
			`/users/${state.user._id}/carts`
		);
		return res.data.carts as ICartB[];
	};

	const cartsQuery = useQuery({
		queryKey: ["carts", state.user?._id, state.cart, mutation.isSuccess],
		queryFn: getCarts,
	});

	return (
		<div className={"container mx-auto my-10"}>
			<h1 className={"text-4xl text-center font-bold my-5"}>Cart</h1>
			<div>
				<Table
					removeWrapper
					aria-label="Example static collection table"
				>
					<TableHeader>
						<TableColumn>PRODUCT</TableColumn>
						<TableColumn>NAME</TableColumn>
						<TableColumn>UNIT PRICE</TableColumn>
						<TableColumn>QUANTITY</TableColumn>
						<TableColumn>TOTAL</TableColumn>
						<TableColumn>ACTIONS</TableColumn>
					</TableHeader>
					<TableBody
						emptyContent={
							<div>
								No items yet to display.{" "}
								<Link
									className={"text-blue-500"}
									href={"/products"}
								>
									See our products
								</Link>
							</div>
						}
					>
						{rows}
					</TableBody>
				</Table>
			</div>
			<div className={"flex items-center justify-between"}>
				<div>Total : ${total.toFixed(2)}</div>
				{rows.length ? (
					<Button onClick={handlePurchase} color={"primary"}>
						Purchase
					</Button>
				) : null}
			</div>

			<h2 className="my-8 text-center text-3xl font-bold">Your carts</h2>
			{cartsQuery.data ? (
				<div className="grid grid-cols-3 mx-auto gap-8 w-fit">
					{cartsQuery.data.map((cart, index) => {
						return <Cart key={index} cart={cart} />;
					})}
				</div>
			) : null}
		</div>
	);
};

export default CartPage;
