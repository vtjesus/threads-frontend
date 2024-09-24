import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "../components/ui/separator";
import { ChevronRight } from 'lucide-react';
import instagramLogo from '../assets/images/instagramLogo.png';
import ThreadLogo from '../assets/images/Frame.png';
import { useGetLogin } from "../api/authApi";
import LoadingButton from "../components/shared/LoadingButton";

const formSchema = z.object({
    username: z.string().min(1, "Please enter a username"),
    password: z.string().min(6, "Your please must be at least 6 characters")
})

export type LoginFormType = z.infer<typeof formSchema>

const LoginPage = () => {
    const navigate = useNavigate()
    const { Login, isPending} = useGetLogin()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        Login(values)
        navigate("/login")
    }

    const Instagramhandler = async () => {
        try {
            window.location.href = "https://thread-backend-0wpa.onrender.com/auth/instagram/callback"
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="bg-primary-primarybackground h-full">
            <div className="sm:hidden flex justify-center pt-10">
                <img src={ThreadLogo} width={40} />
            </div>
            <div className="w-full flex flex-col justify-center items-center min-h-screen  relative text-primary-primaryText container">
                <div className="w-full absolute top-0 hidden sm:flex ">
                    <img src="https://static.cdninstagram.com/rsrc.php/yC/r/jxB9GUOHTf2.webp" />
                </div>

                <div className="w-full sm:w-[350px] z-10 md:mt-16">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Username" {...field}
                                                className=" bg-primary-secondarybackground py-7 px-5 text-primary-secondaryText text-[18px] border-none" />
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
                                        <FormControl>
                                            <Input placeholder="Password" type="password" {...field}
                                                className=" bg-primary-secondarybackground px-5 py-7 text-primary-secondaryText text-[18px] border-none" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {
                                isPending ? <LoadingButton /> : <Button type="submit" className="bg-white text-primary-secondaryText w-full text-[16px] p-7">
                                    Login
                                </Button>
                            }
                        </form>
                    </Form>
                    <h6 className="text-primary-secondaryText text-[15px] font-semibold text-center py-7">
                        You don't have an account ? <span className="text-[17px] font-bold">
                            <Link to="/signup">Sign up</Link>
                        </span>
                    </h6>
                    <Separator className="bg-primary-secondarybackground" />

                    {/**instagram button */}
                    <Button className="flex justify-evenly gap-4 bg-primary-primarybackground border-[1px]
                    border-primary-secondarybackground text-[18px] py-10 mt-10 rounded-xl"
                        onClick={Instagramhandler}>
                        <img src={instagramLogo} className="w-[50px]" />
                        <span>Continue with instagram</span>
                        <ChevronRight className="text-primary-iconColor w-6 h-6" />
                    </Button>
                </div>


            </div>
        </div>
    )
}

export default LoginPage