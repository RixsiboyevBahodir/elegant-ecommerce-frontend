"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group"
import { useParams } from "react-router-dom"
import { useCreateReviewMutation, useUpdateReviewMutation, type ReviewType } from "@/store/api"
import { toast } from "sonner"
import { useEffect } from "react"

const formSchema = z.object({
    rating: z
        .number()
        .min(1)
        .max(5),
    description: z
        .string()
        .min(2, "Description must be at least 2 characters.")
        .max(100, "Description must be at most 100 characters."),
})

export default function ReviewForm({ setOpen, review }: {
    setOpen: (open: boolean) => void
    review?: ReviewType
}) {

    const [createReview, { isLoading: isCreating }] = useCreateReviewMutation()
    const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation()
    const isEdit = Boolean(review)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: review?.rating ?? 5,
            description: review?.comment ?? "",
        },

    })

    const params = useParams()

    const userData = JSON.parse(localStorage.getItem('user')!)
    const isLoading = isCreating || isUpdating

    useEffect(() => {
        if (review) {
            form.reset({
                rating: review.rating,
                description: review.comment,
            })
        }
    }, [review, form])


    async function onSubmit(data: z.infer<typeof formSchema>) {
        if (isEdit && review) {
            try {
                await updateReview({
                    id: review._id,
                    rating: data.rating,
                    comment: data.description,
                }).unwrap()
                toast.success("Review updated successfully")
                setOpen(false)
            } catch {
                toast.error("Review update failed")
            }
            return
        }

        const product = {
            _ref: params?.id,
            _type: "reference"
        }
        const user = {
            _ref: userData?._id,
            _type: "reference"
        }
        const mainData = {
            _type: "review",
            comment: data?.description,
            product,
            rating: data?.rating,
            status: "rejected",
            user: user,
            _key: z.uuidv4()
        }
        try {
            await createReview(mainData).unwrap().then(() => {
                toast.success("Commet yaratildi")
                setOpen(false)
            })

        } catch (error) {
            toast.error("Review creation failed")
        }
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>{isEdit ? "Edit review" : "Review"}</CardTitle>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="description"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-description">
                                        Description
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="I'm having an issue with the login button on mobile."
                                            rows={6}
                                            className="min-h-24 resize-none"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        <InputGroupAddon align="block-end">
                                            <InputGroupText className="tabular-nums">
                                                {field.value.length}/100 characters
                                            </InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="rating"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Rating
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                        max={5}
                                        min={1}
                                        type="number"
                                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo" disabled={isLoading}>
                        {isLoading ? "Saving..." : isEdit ? "Update" : "Submit"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
