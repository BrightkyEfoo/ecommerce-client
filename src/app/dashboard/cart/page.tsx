"use client";
import Image from "next/image";
import { useContext, useMemo, useState } from "react";
import { context } from "@/context/ApplicationContext";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
} from "@nextui-org/react";
import { IProduct } from "@/components/sections/ProductsSection";
import { FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { useTitle } from "@/hooks/useTitle";
import { axiosSecuredInstance } from "@/utils/axios";
import { useMutation } from "react-query";
import toast from "react-hot-toast";

const CartPage = () => {
	useTitle("Cart");
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
					<TableCell>{product.title}</TableCell>
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
	});
	const handlePurchase = async () => {
		const products = Object.keys(state.cart || {}).map((key, index) => {
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
			<div className={"flex items-center justify-end"}>
				{rows.length ? (
					<Button onClick={handlePurchase} color={"primary"}>
						Purchase
					</Button>
				) : null}
			</div>
		</div>
	);
};

export default CartPage;
