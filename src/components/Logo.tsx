import Image from 'next/image'
const Logo = () => {
    return  (
        <div className="flex items-center justify-center">
            <Image src="/images/logo.png" height={50} width={175} className={"object-cover"}/>
            <p className={"font-bold text-3xl"}>ECOM</p>
        </div>
        )
}

export default Logo