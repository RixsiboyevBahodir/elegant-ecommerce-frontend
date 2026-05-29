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
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    name: z
        .string()
        .min(2, "The information must consist of at least 2 characters."),
    // .max(32, "Bug title must be at most 32 characters."),
    password: z
        .string()
        .min(3, "The information must consist of at least 3 characters.")
    // .max(100, "Description must be at most 100 characters."),
})

export function Form() {
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const res = await client.fetch(`*[_type == 'user' && name == "${data.name}" && password == "${data.password}"][0]`)
        if (res?.name && res?.password) {
            toast.success("Hush kelib siz")
            localStorage.setItem("user", JSON.stringify(res))
            navigate('/home')
        } else {
            toast.warning("Name yoki Password notogri")
        }
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Login</CardTitle>
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
                                        placeholder="password"
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
                    <Button className="cursor-pointer" type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button className="cursor-pointer" type="submit" form="form-rhf-demo">
                        Submit
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
