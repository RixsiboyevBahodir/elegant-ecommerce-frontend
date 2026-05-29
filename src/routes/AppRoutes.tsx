import Auth from "@/pages/auth/Auth";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";
import ContactUs from "@/pages/contactUs/ContactUs";
import Favourites from "@/pages/favourite/Favourites";
import Home from "@/pages/home/Home";
import Product from "@/pages/products/Product";
import User from "@/pages/user/User";
import WishList from "@/pages/wishlist/WishList";
import AuthGuard from "@/wrapper/AuthGuard";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/auth" element={<Auth />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
                <Route path="/" element={<AuthGuard />}>
                    <Route path="home" element={<Home />} />
                    <Route path="products/:id" element={<Product />} />
                    <Route path="user" element={<User />} />
                    <Route path="wishlist" element={<WishList />} />
                    <Route path="favourites" element={<Favourites />} />
                    <Route path="contact-Us" element={<ContactUs />} />
                </Route>
                <Route path="*" element={<p>404</p>} />
            </Routes>
        </div>
    )
}
