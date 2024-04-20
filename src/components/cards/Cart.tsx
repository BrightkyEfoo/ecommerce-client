import { ICartB } from "@/types/Cart";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
} from "@nextui-org/react";

const Cart = ({ cart }: { cart: ICartB }) => {
	return (
		<Card className=" w-fit">
			<CardHeader className="flex gap-3">
				<div className="grid grid-cols-4 gap-2">
					{cart.products.slice(0, 4).map((p, index) => (
						<Image
							key={`${p._id}-${index}`}
							alt="nextui logo"
							height={40}
							radius="sm"
							src={p.thumbnail}
							width={40}
							className="object-cover h-[40px] w-[40px] rounded-md border-slate-200 border"
						/>
					))}
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p className="grid items-center grid-cols-2 justify-between gap-6 [&>:nth-child(2n+1)]:font-bold [&>:nth-child(2n+1)]:uppercase [&>:nth-child(2n+1)]:text-xl [&>:nth-child(2n)]:justify-self-end">
					<span>Total  </span>  <span>${cart.total}</span>
					<span>Total discounted </span>{" "}
					<span>${cart.discountedTotal}</span>
					<span>Total prodcuts </span>
					<span>
						{cart.totalProducts} product
						{cart.totalProducts > 1 ? "s" : ""}
					</span>
				</p>
			</CardBody>
			<Divider />
			<CardFooter >
				<Link className="mx-auto w-fit" href={`/dashboard/cart/${cart._id}/`}>
					Visit this cart
				</Link>
			</CardFooter>
		</Card>
	);
};

export default Cart;
