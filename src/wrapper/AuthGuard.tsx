import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

interface userType {
    name: string
}

export default function AuthGuard() {

    const navigate = useNavigate()

    useEffect(() => {
        if (window.location.pathname == '/') {
            navigate('/home')
        }
    }, [])

    const user: userType = JSON.parse(localStorage.getItem('user')!) as userType;

    if (!user?.name) {
        return <Navigate to={'/auth/login'} />
    }

    return (
        <>
            <div className="max-w-280 mx-auto">
                <Navbar />
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
