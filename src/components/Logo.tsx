import Image from "next/image";
import Link from "next/link";
const Logo = () => {
	return (
		<Link href="/">
			<div className="flex items-center justify-center">
				<Image
					src="/images/logo.png"
					height={50}
					width={175}
					className={"object-cover"}
                    alt="ecomm"
				/>
				<p className={"font-bold text-3xl"}>ECOM</p>
			</div>
		</Link>
	);
};

export default Logo;
