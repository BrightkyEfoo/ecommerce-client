"use client";
import { axiosOpenedInstance } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEnvelope, FaEye, FaLetterboxd, FaLock } from "react-icons/fa6";
import { useMutation } from "react-query";
import { HashLoader } from "react-spinners";
import { z } from "zod";

const schema = z
	.object({
		firstName: z.string().trim().min(4),
		lastName: z.string().trim().min(4),
		email: z.string().trim().email("Invalid email"),
		password: z
			.string()
			.min(6, "Password too short - should be more than 6 chars"),
		rePassword: z.string(),
	})
	.refine(
		(values) => {
			return values.password === values.rePassword;
		},
		{
			message: "Passwords must match!",
			path: ["rePassword"],
		}
	);

const RegisterPage = () => {
	const router = useRouter();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		resolver: zodResolver(schema),
	});
	const [isVisible, setIsVisible] = useState(false);
	const [isRepasswordVisible, setIsRePasswordVisible] = useState(false);
	const [image, setImage] = useState<File>();
	const fileRef = useRef<HTMLInputElement>(null);

	const signup = async (data: any) => {
		const dataToSend = new FormData();
		const body = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		};

		dataToSend.append("body", JSON.stringify(body));
		if (!image) {
			throw new Error("Please select a profile picture");
		}
		dataToSend.append("profilePicture", image);
		const registerRes = await axiosOpenedInstance.post(
			"/users/auth/register",
			dataToSend
		);
		return registerRes.data;
	};

	const mutation = useMutation({
		mutationFn: signup,
		onError: () => {
			toast.error("Register failed. Please try again");
		},
		onSuccess: () => {
			toast.success("Register successful! Redirecting...");
			router.push("/auth/login");
		},
	});

	const onSubmit = (data: any) => {
		mutation.mutate(data);
	};
	const onError = (err: any) => {
		console.error("error", err);
	};

	const toggleVisibility = () => setIsVisible(!isVisible);
	const toggleRepasswordVisibility = () =>
		setIsRePasswordVisible(!isRepasswordVisible);

	return (
		<div
			className={
				"mx-4 md:mx-auto space-y-8 rounded-lg bg-white/5 px-12 py-12 relative overflow-hidden"
			}
		>
			<h2 className="text-4xl  text-center">Hey how are you?</h2>
			<p className={"text-center"}>We are glad to see you here</p>
			<form
				className="space-y-6"
				onSubmit={handleSubmit(onSubmit, onError)}
			>
				<div
					className={classNames(
						"transition-all invisible z-0 bg-blue-900/30 opacity-0 absolute top-0 left-0 h-full w-full flex items-center justify-center",
						{
							"!opacity-100 !visible z-20": mutation.isLoading,
						}
					)}
				>
					<HashLoader
						className="shrink-0"
						size={50}
						color="#4285F4"
					/>
				</div>
				<div className={"grid gap-5 grid-cols-2"}>
					<Input
						size={"lg"}
						startContent={
							<FaLetterboxd className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
						}
						type="text"
						label="firstName"
						placeholder="Enter your firstName"
						{...register("firstName")}
						isInvalid={errors.firstName ? true : false}
						errorMessage={
							errors.firstName
								? "Please fill here a valid firstName"
								: undefined
						}
					/>
					<Input
						size={"lg"}
						startContent={
							<FaLetterboxd className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
						}
						type="text"
						label="lastName"
						placeholder="Enter your lastName"
						{...register("lastName")}
						isInvalid={errors.lastName ? true : false}
						errorMessage={
							errors.lastName
								? "Please fill here a valid lastName"
								: undefined
						}
					/>
				</div>
				<div>
					<Input
						size={"lg"}
						startContent={
							<FaEnvelope className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
						}
						type="email"
						label="Email"
						placeholder="Enter your email"
						{...register("email")}
						isInvalid={errors.email ? true : false}
						errorMessage={
							errors.email
								? "Please fill here a valid email address"
								: undefined
						}
					/>
				</div>

				<div>
					<Input
						size={"lg"}
						startContent={
							<FaLock className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
						}
						endContent={
							<button
								className="focus:outline-none"
								type="button"
								onClick={toggleVisibility}
							>
								{isVisible ? (
									<FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
								) : (
									<FaEye className="text-2xl text-default-400 pointer-events-none" />
								)}
							</button>
						}
						type={isVisible ? "text" : "password"}
						label="Password"
						placeholder="Enter your password"
						{...register("password")}
						isInvalid={errors.password ? true : false}
						errorMessage={
							errors.password
								? "Please fill here a valid password, it should have at least 6 characters"
								: undefined
						}
					/>
				</div>
				<div>
					<Input
						size={"lg"}
						startContent={
							<FaLock className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
						}
						endContent={
							<button
								className="focus:outline-none"
								type="button"
								onClick={toggleRepasswordVisibility}
							>
								{isRepasswordVisible ? (
									<FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
								) : (
									<FaEye className="text-2xl text-default-400 pointer-events-none" />
								)}
							</button>
						}
						type={isRepasswordVisible ? "text" : "password"}
						label="rePassword"
						placeholder="Retype your password"
						{...register("rePassword")}
						isInvalid={!!errors.rePassword}
						errorMessage={
							errors.rePassword
								? "Please retype your password exactly"
								: undefined
						}
					/>
				</div>
				<div
					className="cursor-pointer h-[100px] w-[100px] rounded-[50%] mx-auto overflow-hidden"
					onClick={() => fileRef.current?.click()}
				>
					<input
						type={"file"}
						hidden
						ref={fileRef}
						onChange={(e) => {
							if (e.target.files && e.target.files[0]) {
								setImage(e.target?.files[0]);
							}
						}}
						accept={"image/png,image/jpeg"}
					/>
					<Image
						src={
							image
								? URL.createObjectURL(image)
								: "/images/profilepic.png"
						}
						alt={"profilepic"}
						height={100}
						width={100}
					/>
				</div>
				<div className={"flex items-center justify-center gap-5"}>
					<Button onClick={() => fileRef.current?.click()}>
						Select an image
					</Button>
					{image ? (
						<Button
							color={"danger"}
							onClick={() => setImage(undefined)}
						>
							Remove
						</Button>
					) : null}
				</div>
				<div>
					<Button
						color="primary"
						type="submit"
						variant="flat"
						className="w-full h-[60px]"
					>
						SIGN UP
					</Button>
				</div>
				<p className={"flex items-center justify-between"}>
					<span>Already have an account ? </span>
					<Link className={"text-blue-500"} href={"/auth/login"}>
						Login
					</Link>
				</p>
			</form>
		</div>
	);
};

export default RegisterPage;
