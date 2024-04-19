import { HashLoader } from "react-spinners";

const Loading = () => {
    return <div className={"h-screen w-screen fixed z-[99999] flex items-center justify-center"}>
        <HashLoader size={40}  />
    </div>
}

export default Loading