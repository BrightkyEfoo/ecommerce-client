import {
	Accordion,
	AccordionItem,
	Button,
	Card,
	CardFooter,
	Image,
} from "@nextui-org/react";

export interface ICategory {
	title: string;
	description?: string;
	image: string;
	_id: string;
}

export default function Category({ category }: { category: ICategory }) {
	return (
		<Card isFooterBlurred radius="lg" className="border-none h-[350px]">
			<Image
				removeWrapper
				alt={category.title}
				className="object-cover h-full w-[350px]"
				height={200}
				src={category.image}
				width={200}
			/>
			<CardFooter className="overflow-hidden absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
				<Accordion variant="splitted">
					<AccordionItem
						aria-label={category.title}
						title={category.title}
					>
						<div className="flex flex-col gap-5 items-stretch">
							{category.description?.slice(0, 60)}
							<Button
								className="!w-full mx-auto text-tiny bg-white/35 hover:text-white text-black "
								variant="light"
								color="default"
								radius="lg"
								size="sm"
							>
								View more
							</Button>
						</div>
					</AccordionItem>
				</Accordion>
			</CardFooter>
		</Card>
	);
}
