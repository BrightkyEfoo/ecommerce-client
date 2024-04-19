"use client";
import Image from "next/image";
import { useTitle } from "@/hooks/useTitle";
import ProductsSection from "@/components/sections/ProductsSection";
import { useQuery } from "react-query";
import { axiosOpenedInstance } from "@/utils/axios";
import Category, { ICategory } from "@/components/cards/Category";
import toast from "react-hot-toast";
import { Kbd } from "@nextui-org/react";
import { useEffect } from "react";

export default function Home() {
	useTitle("Ecommerce App");
	useEffect(() => {
		toast(<div>press <Kbd keys={["command"]}>K</Kbd> at anytime to make a search</div>)
	}, []);
	const categoriesView = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const res = await axiosOpenedInstance.get("/categories");
			return res.data.categories as ICategory[];
		},
	});

	return (
		<main className="container mx-auto space-y-10">
			<div className="relative text-center" id="hero">
				<video
					autoPlay
					loop
					muted
					playsInline
					className="absolute top-0 left-0 w-full h-full object-cover -z-1"
				>
					<source src="/videos/hero.mp4" type="video/mp4" />
					<Image
						src="/images/hero.jpg"
						alt="Background image of clouds"
						height={900}
						width={1200}
						className="h-full w-full object-cover"
					/>
				</video>
				<div className=" z-5 space-y-5 relative py-[200px] h-full w-full top-0 left-0 bottom-0 right-0 bg-black/70">
					<h1 className="text-[82px] max-w-[85%] mx-auto">
						Hey! You. Ohh you need something BUY IT RIGHT NOWWWWW
					</h1>
					<p className="max-w-[46.66%] mx-auto text-center text-lg text-gray-400">
						Everyday we fight for you, to make your life easy and
						simple Lorem ipsum dolor sit amet, consectetur
						adipisicing elit.
						<small className="italic">
							Odit nisi praesentium voluptate doloremque quisquam
							quidem est magnam minus reiciendis expedita
							cupiditate tempore quasi, obcaecati blanditiis
							distinctio! Ex sunt quasi esse!
						</small>
					</p>
				</div>
			</div>
			<div className="py-[80px]">
				<h2 className="text-center text-3xl my-6">Take a tour</h2>
				<p className="text-center">
					Here is a few parts of our categories of products, We have
					erverything tou want
				</p>
				{categoriesView.data ? (
					<div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-8 w-fit mx-auto">
						{categoriesView.data.map((category) => {
							return (
								<Category
									key={category._id}
									category={category}
								/>
							);
						})}
					</div>
				) : null}
			</div>
			<ProductsSection />
		</main>
	);
}
