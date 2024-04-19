"use client";
import { Image } from "@nextui-org/react";
import { useTitle } from "@/hooks/useTitle";
const Profile = () => {
	useTitle("Profile");
	return (
		<div className="text-center text-5xl container mx-auto min-h-screen flex items-center justify-center">
			<Image
				src={"/images/comming-soon.gif"}
				height={400}
				width={700}
				alt="comming-soon"
			/>
		</div>
	);
};

export default Profile;
