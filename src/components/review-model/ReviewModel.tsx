import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import ReviewForm from "./ReviewForm"
import type { ReviewType } from "@/store/api"

export default function ReviewModel({
    title,
    open,
    setOpen,
    review,
    onOpen,
}: {
    title: string
    open: boolean
    setOpen: (open: boolean) => void
    review?: ReviewType | null
    onOpen?: () => void
}) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger onClick={onOpen} render={<Button variant="outline">{title}</Button>} />
                <DialogContent className="sm:max-w-sm p-0 border-0">
                    <ReviewForm setOpen={setOpen} review={review ?? undefined} />
                </DialogContent>
            </form>
        </Dialog>
    )
}
