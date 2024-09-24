import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SignFormType } from "../pages/SignUp"
import { LoginFormType } from "../pages/LoginPage"
import { toast } from "sonner"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetSignUp = () => {
  const queryClient = useQueryClient()
  const SignupUser = async (user: SignFormType) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
      credentials: "include"
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message)
    }
    return data
  }
  const { mutateAsync: CreateUser, isPending } = useMutation({
    mutationFn: SignupUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  return { CreateUser, isPending }
}

export const useGetLogin = () => {
  const queryClient = useQueryClient()
  const LoginUser = async (user: LoginFormType) => {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user),
      credentials: "include"
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message)
    }
    return data
  }
  const { mutateAsync: Login, isPending} = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["authUser"] })
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  return { Login, isPending}
}

export const useGetLogout = ()=>{
  const queryClient = useQueryClient()
  const LogoutRequest = async ()=>{
      const res = await fetch(`${API_BASE_URL}/api/auth/logout`,{
          method:"POST",
          credentials:"include"
      })
      const data = await res.json()
      if(!res.ok){
          throw new Error("failed to logout")
      }
      return data
  }
  const {mutateAsync:logout,isSuccess} = useMutation({
      mutationFn:LogoutRequest,
      onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["authUser"]})
      }
  })
  return {logout,isSuccess}
}