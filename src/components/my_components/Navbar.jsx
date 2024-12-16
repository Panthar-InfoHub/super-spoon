import Image from "next/image"
import Link from "next/link"
import { navItem } from "../../lib/data"
import { Button } from "../ui/button"

const Navbar = () => {

    return (
        <header className="header fixed top-0 left-0 right-0 bg-white-glass backdrop-blur-xl z-50" >
            <nav className="flex justify-between items-center" >
                <Link href="/" className="flex gap-1" >
                    <Image src="/logo.png" alt="Logo" width={60} height={60} quality={100} />
                </Link>

                <div className="flex items-center justify-between text-black-2 flex-[0.5]">
                    {navItem.map((item, index) => (

                        <Link href={item.link || "#workSection"} key={index} >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div>
                    <Button className="btn text-14-medium text-gray-100" >
                        Get App
                    </Button>
                </div>


                {/* MOBILE NAVBAR */}
                {/* <MobileNavigation /> */}
            </nav>
        </header >
    )
}

export default Navbar
