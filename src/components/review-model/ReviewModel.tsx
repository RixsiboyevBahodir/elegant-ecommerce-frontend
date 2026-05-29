import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import ReviewForm from "./ReviewForm"
import { useState } from "react"

export default function ReviewModel({ title }: { title: string }) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open}>
            <form>
                <DialogTrigger onClick={() => setOpen(true)} render={<Button variant="outline">{title}</Button>} />
                <DialogContent className="sm:max-w-sm p-0 border-0">
                    <ReviewForm setOpen={setOpen} />
                </DialogContent>
            </form>
        </Dialog>
    )
}
