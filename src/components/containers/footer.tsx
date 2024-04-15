import  Logo from '../Logo'
import {Link, Navbar} from "@nextui-org/react";
import Image from 'next/image'
const Footer = () => {
    return <Navbar >
        <div>
            <p>Lorem ipsum dolore sit amet et consectur, plogiap hujaeru</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quidem. Magnam quis hic repudiandae sapiente eos rem ut modi veritatis necessitatibus impedit non ipsum aspernatur sunt consectetur, beatae illum quod rerum sequi laboriosam quibusdam omnis. Molestias minima voluptatum neque velit eos ullam quisquam possimus sint? Placeat atque dolor ipsum consectetur cum.</p>
            
        </div>
        <div className={"border-t-2 border-t-gray py-3 flex items-center justify-center gap-5"}>
            <Logo />
            <span>Copyright &copy; {(new Date()).getFullYear()} </span>
        </div>
        <div>
            <Link href={"https://github.com/BrightkyEfoo"} >
                    <Image src={'/images/BrightkyEfoo.jpeg'} height={75} width={75} className={"object-cover rounded-xl"} />
            </Link>
            <p>
                Powered by
                <Link href={"https://github.com/BrightkyEfoo"} >
                    <span>@BrightkyEfoo</span>
                </Link>
            </p>
            
        </div>
    </Navbar>
}

export default Footer