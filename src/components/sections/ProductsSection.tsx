import { axiosOpenedInstance } from "@/utils/axios";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import { useQuery } from "react-query";

export interface IProduct {
	discountPercentage: number;
	thumbnail: string;
	images: string[];
	price: number;
	rating: number;
	description: string;
	title: string;
	stock: number;
	category: string;
	brand: string;
	_id: string;
}

export default function ProductsSection() {
	const productsView = useQuery({
		queryKey: ["products"],
		queryFn: async () => {
			const res = await axiosOpenedInstance.get("/products/?limit=5");
			console.log("res.data", res.data);
			return res.data.products as IProduct[];
		},
	});
	return productsView.data ? (
		<div className="py-[80px] bg-black">
			<h2 className="text-center text-3xl my-6">Our top Sales</h2>
			<p className="text-center mb-8">
				Her you can see our top sales, yosu be affortable with us!
			</p>
			<div className="max-w-[900px] gap-4 grid grid-cols-12 grid-rows-2 px-8 mx-auto">
				{productsView.data.slice(0, 3).map((product) => (
					<Card
						className="col-span-12 sm:col-span-4 h-[300px] border-2 border-slate-200/45"
						key={product._id}
					>
						<CardHeader className="absolute z-10 top-1 flex-col !items-start">
							<p className="text-tiny text-white/60 uppercase font-bold">
								{product.category}
							</p>
							<h4 className="text-white font-medium text-large">
								{product.title}
							</h4>
						</CardHeader>
						<Image
							removeWrapper
							alt="Card background"
							className="z-0 bg-black/75  w-full h-full object-cover"
							src={product.images[0]}
						/>
					</Card>
				))}
				<Card
					isFooterBlurred
					className="w-full h-[300px] col-span-12 sm:col-span-5 border-2 border-slate-200/45"
				>
					<CardHeader className="absolute z-10 top-1 flex-col items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">
							New
						</p>
						<h4 className="text-black font-medium text-2xl">
							{productsView.data[3].title}
						</h4>
					</CardHeader>
					<Image
						removeWrapper
						alt="Card example background"
						className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
						src={productsView.data[3].images[0]}
					/>
					<CardFooter className="absolute bg-black/80 bottom-0 border-t-1 gap-5 border-zinc-100/50 z-10 justify-between">
						<div>
							<p className="text-white text-tiny">Available</p>
							<p className="text-white text-tiny ">
								{productsView.data[3].description.slice(0, 49)}
								...
							</p>
						</div>
						<Button
							className="text-tiny px-6"
							color="primary"
							radius="full"
							size="sm"
						>
							View more
						</Button>
					</CardFooter>
				</Card>
				<Card
					isFooterBlurred
					className="w-full h-[300px] col-span-12 sm:col-span-7 border-2 border-slate-200/45"
				>
					<CardHeader className="absolute z-10 top-1 flex-col items-start">
						<p className="text-tiny text-white/60 uppercase font-bold">
							Your day your way
						</p>
						<h4 className="text-white/90 font-medium text-xl">
							Your checklist for better sleep
						</h4>
					</CardHeader>
					<Image
						removeWrapper
						alt="Relaxing app background"
						className="z-0 w-full h-full object-cover"
						src={productsView.data[4].images[0]}
					/>
					<CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
						<div className="flex flex-grow gap-5 items-center">
							<Image
								alt="Breathing app icon"
								className="rounded-full bg-black object-cover shrink-0 !aspect-square"
								height={50}
								width={50}
								src={productsView.data[4].thumbnail}
							/>
							<div className="flex flex-col">
								<p className="text-tiny text-white/60">
									{productsView.data[4].title}
								</p>
								<p className="text-tiny text-white/60">
									{productsView.data[4].description.slice(
										0,
										60
									)}
									...
								</p>
							</div>
						</div>
						<Button radius="full" className="px-6" size="sm">
							View more
						</Button>
					</CardFooter>
				</Card>
			</div>
		</div>
	) : null;
}
