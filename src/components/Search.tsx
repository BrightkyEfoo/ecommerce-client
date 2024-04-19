import { axiosOpenedInstance } from "@/utils/axios";
import {
	Button,
	Input,
	Kbd,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { FaChevronRight, FaSearch } from "react-icons/fa";
import { useMutation } from "react-query";
import { IProduct } from "./sections/ProductsSection";
import { useRouter } from "next/navigation";
import slugify from "slugify";

export default function Search() {
	const searchRef = useRef<HTMLInputElement>(null);
	const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
	const [keyword, setKeyword] = useState("");
	const router = useRouter();

	const searchMutation = useMutation({
		mutationFn: async (search: string) => {
			const res = await axiosOpenedInstance.get(
				`/products/search?q=${search}`
			);
			return res.data.products as IProduct[];
		},
		mutationKey: ["searchproducts"],
	});

	useEffect(() => {
		const handler = (event: KeyboardEvent) => {
			console.log("event", event.key, event.ctrlKey);
			if (!isOpen) {
				if (event.ctrlKey && event.key === "k") {
					event.preventDefault();

					setKeyword("");
					searchMutation.reset();
					onOpen();
					searchRef.current?.focus();
				}
			}
		};

		if (typeof window !== "undefined") {
			window.addEventListener("keydown", handler);
		}

		return () => {
			window.removeEventListener("keydown", handler);
		};
	}, [onClose, onOpen, searchMutation, isOpen]);

	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
				backdrop="opaque"
				classNames={{
					backdrop:
						"bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
				}}
			>
				<ModalContent>
					{
						<>
							<ModalHeader className="flex flex-col gap-1">
								Search for a product
							</ModalHeader>
							<ModalBody>
								<Input
									ref={searchRef}
									autoFocus
									startContent={
										<FaSearch className="text-lg text-default-400 pointer-events-none flex-shrink-0" />
									}
									endContent={
										<Kbd keys={["escape"]}>ESC</Kbd>
									}
									label="Search"
									placeholder="Type"
									variant="bordered"
									onChange={(e) => {
										console.log("change", e.target.value);
										setKeyword(e.target.value);
										if (e.target.value.length > 4) {
											searchMutation.mutate(
												e.target.value
											);
										}
									}}
									value={keyword}
								/>
							</ModalBody>
							<ModalFooter>
								<div className="grid gap-4 !w-full">
									{searchMutation.data?.map((product) => {
										return (
											<p
												key={product._id}
												onClick={() => {
													router.push(
														`/products/${slugify(
															product.title
														)}-${product._id}`
													);
													onClose();
												}}
												className="w-full px-3 !block rounded-xl bg-white/15 cursor-pointer hover:bg-black hover:text-white transition-all py-2"
											>
												<span>{product.title}</span>
											</p>
										);
									})}
								</div>
							</ModalFooter>
						</>
					}
				</ModalContent>
			</Modal>
		</>
	);
}
