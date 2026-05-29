import { Link } from "react-router-dom";
import { Form } from "./Form";
import { BsArrowRight } from "react-icons/bs";

export default function Login() {
    return (
        <div>
            <Form />
            <div className="flex items-center justify-center gap-2 my-4 hover:text-blue-400 transition-all ease-in">
                <Link to={'/auth/register'}>Register</Link>
                <BsArrowRight />
            </div>
        </div>
    )
}
