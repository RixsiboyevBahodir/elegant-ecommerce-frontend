import { useEffect } from "react"
export default function CheckOut() {

     useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 200);
    }, [])

    return (
        <div>CheckOut</div>
    )
}
