import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
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
import { client } from "@/clinet/clinet"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router-dom"
import { HiArrowLongLeft } from "react-icons/hi2";

const formSchema = z.object({
    name: z
        .string()
        .min(2, "Bug title must be at least 5 characters."),
    // .max(32, "Bug title must be at most 32 characters."),
    surname: z
        .string()
        .min(3),
    password: z
        .string()
        .min(3, "Description must be at least 20 characters.")
    // .max(100, "Description must be at most 100 characters."),
})

export function RegisterForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const navigate = useNavigate()

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const userRegister = {
            _type: 'user',
            name: data.name,
            surname: data.surname,
            password: data.password
        }
        const userCheack = await client.fetch(`*[_type == 'user' && name == "${data.name}" && surname == "${data.surname}"][0]`)
        if (userCheack) {
            toast.warning("Bu malumot oldin yaratilgan")
            return
        } else {
            await client.create(userRegister)
            toast.success("Ma'lumot yaratildi")
        }
        navigate('/auth/login')
    }

    return (
        <>
            <Card className="w-full sm:max-w-md">
                <CardHeader>
                    <CardTitle>CREATE AN ACCOUNT</CardTitle>
                    <CardDescription>
                        Your account may be deleted by the administrator.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-title">
                                            Name
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-title"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Your full name"
                                            autoComplete="off"
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="surname"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            Surname
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="Your full surname"
                                            aria-invalid={fieldState.invalid}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor="form-rhf-demo-description">
                                            password
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="form-rhf-demo-description"
                                            placeholder="A password that is not too short to remember"
                                            aria-invalid={fieldState.invalid}
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
                        <Button type="submit" form="form-rhf-demo" className="cursor-pointer">
                            Submit
                        </Button>
                    </Field>
                </CardFooter>
            </Card>
            <div className="flex items-center justify-center gap-2 my-4 hover:text-blue-400 transition-all ease-in">
                <HiArrowLongLeft />
                <Link to={'/auth/login'}>Login</Link>
            </div>
        </>
    )
}
