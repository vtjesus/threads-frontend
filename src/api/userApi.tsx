import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { Logout } from "../Redux/feature/authSlice"
import { toast } from "sonner"
import {  UserType } from "../lib/type"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetUser = ()=>{
    const dispatch = useDispatch()
    const getUser = async ()=>{
        const res = await fetch(`${API_BASE_URL}/api/user`,{
            method:"GET",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            if(data.message === "Unauthorized: No token provided" || res.statusText === "Unauthorized"){
               dispatch(Logout())
            }
           throw new Error("Failed to get User")
        }
        return data
    }
    const {data:GetUser,isLoading,refetch,isRefetching} = useQuery({
        queryKey:["authUser"],
        queryFn:getUser,
        retry:false
    })
    return {GetUser,isLoading,refetch,isRefetching}
}


export const useGetProfile = (username:string)=>{
    const GetProfile = async ():Promise<UserType>=> {
        const res = await fetch(`${API_BASE_URL}/api/user/profile/${username}`, {
            method: "GET",
            credentials: "include"
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error("failed to get Profile");
        }
        return data;
    };
    const { data: UserProfile, isLoading,refetch,isRefetching} = useQuery({
        queryKey: ["getProfile", username],
        queryFn: GetProfile,
        enabled: !!username 
    });
    
    return { UserProfile, isLoading,refetch,isRefetching}
};

export const useEditProfile = ()=>{
    const queryClient = useQueryClient()
    const EditProfile = async (formData:FormData)=>{
        const res = await fetch(`${API_BASE_URL}/api/user/updateUser`,{
            method:"PUT",
            credentials:"include",
            body:formData
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Failed to edit Profile")
        }
        return data
    }
    const {mutateAsync:edit,isPending:isEditingProfile,isSuccess} = useMutation({
        mutationFn:EditProfile,
        onSuccess:()=>{
             queryClient.invalidateQueries({queryKey:["getProfile"]})
            toast.dismiss()
            toast.success("Updated")
        },
        onError:()=>{
          toast.dismiss()
          toast.error("Unable to update profile at the moment")
        }
    })
    if(isEditingProfile){
     toast.loading("Updating")
    }
    return {edit,isSuccess}
}

export const useGetFollowers = (endpoint:string)=>{
  const GetFollowers = async ()=>{
      const res = await fetch(`${API_BASE_URL}/${endpoint}`,{
        method:"GET",
        credentials:"include"
      })
      const data = await res.json()
      if(!res.ok){
        throw new Error("Failed to get Followers")
      }
      return data
  }
  const {data:getFollowers,isLoading,isRefetching,refetch} = useQuery({
    queryKey:["getFollowers"],
    queryFn:GetFollowers
  })
  return {getFollowers,isLoading,isRefetching,refetch}
}

export const useFollow = ()=>{
    const FollowUser = async (id:string)=>{
      const res = await fetch(`${API_BASE_URL}/api/user/follow/${id}`,{
        method:"POST",
        credentials:"include"
      })
      const data = await res.json()
      if(!res.ok){
        throw new Error("Failed to follow user")
      }
      return data
    }
    const {mutateAsync:Follow,isPending} = useMutation({
        mutationFn:FollowUser
    })
    return {Follow,isPending}
}

export const useSearchUser = (endpoint:string)=>{
    const SearchUser = async ():Promise<UserType[]> =>{
        const res = await fetch (`${API_BASE_URL}/${endpoint}`,{
            method:"GET",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Failed to fetch user")
        }
        return data
    }
    const {data:searchUser,isLoading,isRefetching,refetch} = useQuery({
        queryKey:["SearchUser",endpoint],
        queryFn:SearchUser,
        enabled:!!endpoint 
    })
    return {searchUser,isLoading,isRefetching,refetch}
}