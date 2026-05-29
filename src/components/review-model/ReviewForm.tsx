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
import { useCreateReviewMutation } from "@/store/api"
import { toast } from "sonner"

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

export default function ReviewForm({ setOpen }: { setOpen: any }) {
    const [createReview, { isLoading }] = useCreateReviewMutation()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rating: 5,
            description: "",
        },
    })

    const params = useParams()

    const userData = JSON.parse(localStorage.getItem('user')!)

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const product = {
            _ref: params?.id,
            _type: "reference"
        }
        const user = {
            _ref: userData?.id,
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
            console.log("Xatolik yuz berdi")
        }
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Review</CardTitle>
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
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
