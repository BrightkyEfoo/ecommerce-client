import Image from "next/image";
import Link from "next/link";
const Logo = () => {
	return (
		<Link href="/">
			<div className="flex items-center justify-center gap-5">
				<Image
					src="/images/logo.png"
					height={50}
					width={50}
					className={"object-cover h-[50px] w-[50px]"}
                    alt="ecomm"
				/>
				<p className={"font-bold text-3xl"}>ECOM</p>
			</div>
		</Link>
	);
};

export default Logo;
