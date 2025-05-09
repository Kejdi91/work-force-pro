import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/store/authSlice";
import {useNavigate } from "react-router-dom";
import { toast } from "sonner";

const formSchema = z.object({
    email: z.string().min(2, { message: "Please enter a valid email adrees" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});
const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(null);
    // Inicializo formën me react-hook-form dhe zod
    const form = useForm({
        resolver: zodResolver(formSchema),
    });
    const onSubmit = async (values) => {
        try {
            const response = await fetch("http://localhost:8095/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (!response.ok) {
            const errorData = await response.json();
            setErrorMessage(errorData.message || "Failed to login");
            return; // dil që këtu nëse ka error
        }
          // Nëse arrijmë këtu, login ka qenë i suksesshëm
          // Mund të bësh redirektim ose çfarë të duash këtu
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify (responseData.user));
        dispatch(login(responseData.user));
        toast("welcome back",{description: "you have been loged in sucesfuly"});
        navigate("/overview");
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong!");
        }
        };
        return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-96">
                <div className="text-center">
                    <h1 className="text-primary font-bold text-2xl nb-1">Login
                    <p className="text-sm font-normal text-muted-foreground mb-4">Welcome back, please login to continue</p>
                    </h1>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="your@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {errorMessage && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};
export default LoginForm;