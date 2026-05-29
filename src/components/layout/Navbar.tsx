import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import { Link, NavLink } from "react-router-dom"
import { IoSearchOutline } from "react-icons/io5";
import { BsHandbag } from "react-icons/bs";
import { SlHeart } from "react-icons/sl";
import userAvatar from '../../assets/avatar.png'
import { useEffect, useState } from "react";


export default function Navbar() {

    const [size, setSize] = useState<any>()

    // Save reference to the original
    const originalSetItem = localStorage.setItem.bind(localStorage);

    // Replace with your own version
    localStorage.setItem = function (key, value) {
        originalSetItem(key, value);                    // call original
        // console.log(`Setting "${key}" = "${value}"`);  // your logic here
        setSize(JSON.parse(value))
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')!)
        if (user) {
            setSize(user)
        }
    }, [])


    return (
        <div className="flex items-center justify-between py-4.5">
            <Link to={'/home'} className="font-medium text-2xl">
                3legant<span className="text-gray-500">.</span>
            </Link>
            <ul className="flex gap-10">
                <li><NavLink to={'/home'}>Home</NavLink></li>
                <li>Shop</li>
                <li>Product</li>
                <li><NavLink to={'/contact-Us'}>Contact Us</NavLink></li>
            </ul>
            <ul className="flex items-center gap-4">
                <li>
                    <IoSearchOutline className="text-2xl" />
                </li>
                <li>
                    <NavLink to={'/wishlist'}>
                        <BsHandbag className="text-[22px] absolute" />
                        <p className="relative -top-2 -right-3 bg-red-500 text-white font-bold px-2 py-1 rounded-2xl text-[10px]">{size?.wishlist?.length ?? 0}</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/favourites'}>
                        <SlHeart className="text-[22px] absolute" />
                        <p className="relative -top-2 -right-3 bg-red-500 text-white font-bold px-2 py-1 rounded-2xl text-[10px]">{size?.favourite?.length ?? 0}</p>
                    </NavLink>
                </li>
                <li>
                    <Link to={'/user'}>
                        <Avatar>
                            <AvatarImage
                                src={userAvatar}
                                alt="@shadcn"
                                className="p-1.5"
                            />
                        </Avatar>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
