"use client";
import { context } from "@/context/ApplicationContext";
import {
	Avatar,
	Badge,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Tooltip,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Logo from "../Logo";

export default function Header() {
	const { state, dispatch } = useContext(context);
	const router = useRouter();
	const logout = () => {
		toast.success("Logged out successfully");
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		dispatch({ type: "set_user", payload: null });
		router.push("/auth/login");
	};

	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = ["products", "categories"];

	return (
		<Navbar
			onMenuOpenChange={setIsMenuOpen}
			classNames={{
				base: "container mx-auto py-4 border-b-2 border-slate-200/50 bg-black",
			}}
			maxWidth="full"
			shouldHideOnScroll
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<Logo />
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{menuItems.map((menu, index) => (
					<NavbarItem key={`menu-${index}`}>
						<Link color="foreground" href={`/${menu}`}>
							{menu.toUpperCase()}
						</Link>
					</NavbarItem>
				))}
			</NavbarContent>
			<NavbarContent justify="end" className="algin-bottom gap-10">
				{state.user ? (
					<>
						<Tooltip
							placement={"bottom"}
							content={
								Object.keys(state.cart || {}).length ? (
									<div>See your cart</div>
								) : (
									<div>No product yet</div>
								)
							}
							color="secondary"
						>
							<NavbarItem
								className="flex cursor-pointer"
								onClick={() => {
									router.push("/dashboard/cart");
								}}
							>
								<Badge
									color="danger"
									content={
										Object.keys(state.cart || {}).length ||
										undefined
									}
									shape="circle"
								>
									<FaCartShopping size={30} />
								</Badge>
							</NavbarItem>
						</Tooltip>

						<NavbarItem className="flex cursor-pointer">
							<Dropdown>
								<DropdownTrigger>
									<Avatar
										isBordered
										color="secondary"
										src={state.user.profilePicture}
										size="md"
										alt="profile"
									/>
								</DropdownTrigger>
								<DropdownMenu aria-label="Static Actions">
									<DropdownItem
										as={"p"}
										className={"text-center uppercase"}
									>
										{`${state.user.firstName} ${state.user.lastName}`}
									</DropdownItem>
									<DropdownItem
										as={Link}
										href="/dashboard"
										key="dashboard"
									>
										Dashboard
									</DropdownItem>
									<DropdownItem
										as={Link}
										href="/dashboard/profile"
										key="profile"
									>
										Profile
									</DropdownItem>
									<DropdownItem
										key="delete"
										className="text-danger"
										color="danger"
										endContent={
											<FaSignOutAlt className="text-xl text-default-400" />
										}
										onClick={logout}
									>
										Log out
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</NavbarItem>
					</>
				) : (
					<>
						<NavbarItem className="hidden lg:flex">
							<Link href="/auth/login">Login</Link>
						</NavbarItem>
						<NavbarItem>
							<Button
								as={Link}
								color="primary"
								href="/auth/register"
								variant="flat"
							>
								Sign Up
							</Button>
						</NavbarItem>
					</>
				)}
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={
								index === 2
									? "primary"
									: index === menuItems.length - 1
									? "danger"
									: "foreground"
							}
							className="w-full"
							href="#"
							size="lg"
						>
							{item.toUpperCase()}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
