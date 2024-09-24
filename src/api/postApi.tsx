import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { toast } from "sonner"
import { PostType } from "../lib/type"

type CommentParams = {
    postid:string,
    commentId:string
}


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetAllPost = (endpoint:string)=>{
    const getAllpost = async ()=>{
        const res = await fetch(`${API_BASE_URL}/${endpoint}`,{
            method:"GET",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("failed to get post")
        }
        return data
    }
    const {data:Post,isLoading,refetch,isRefetching} = useQuery({
        queryKey:["getPost"],
        queryFn:getAllpost,
    })
    return {Post,isLoading,refetch,isRefetching}
}

export const useLikePost = ()=>{
    const likePost = async(id:string)=>{
        const res = await fetch(`${API_BASE_URL}/api/post/like/${id}`,{
            method:"POST",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("failed to like post")
        }
        return data
    }
    const {mutateAsync:Like} = useMutation({
         mutationFn:likePost
    })
    return{Like}
}

export const useCreatePost = ()=>{
    const queryClient = useQueryClient()
    const createPost = async (Content:FormData)=>{
      const res = await fetch(`${API_BASE_URL}/api/post`,{
         method:"POST",
         credentials:"include",
         body:Content
      })
      const data = await res.json()
      if(!res.ok){
         throw new Error("Failed to create Post")
      }
      return data
    }
    const {mutateAsync:AddPost,isPending:Posting} = useMutation({
        mutationFn:createPost,
        onSuccess:()=>{
             queryClient.invalidateQueries({queryKey:["getPost"]})
            toast.dismiss()
            toast.success("Posted")
        },
        onError:()=>{
            toast.dismiss()
          toast.error("Unable to make a post at the moment")
        }
    })
    return{AddPost,Posting}
}

export const useGetPostDetails = (id:string)=>{
    const GetPostdetails = async ():Promise<PostType> =>{
        const res = await fetch(`${API_BASE_URL}/api/post/getPostbyId/${id}`,{
            method:"GET",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Failed to fetch post")
        }
        return data
    }
    const {data:PostDetails,isLoading,refetch,isRefetching} = useQuery({
        queryKey:["getPostbyId"],
        queryFn:GetPostdetails,
         enabled:!!id
    })
    return {PostDetails,isLoading,refetch,isRefetching}
}

export const useComment = (id:string)=>{
    const queryClient = useQueryClient()
    const CommentPost = async (comment:string)=>{
        const res = await fetch(`${API_BASE_URL}/api/post/comment/${id}`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({text:comment}),
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("failed to comment")
        }
        return data;
    }

    const {mutateAsync:Comment,isPending:isCommenting} = useMutation({
        mutationFn:CommentPost,
        onSuccess:(data)=>{
            console.log(data)
            queryClient.setQueryData(["getPostbyId"],(oldData:PostType)=>{
                return{
                    ...oldData,
                    comments:data
                }
            })
            toast.dismiss()
            toast.success("Posted")
        },
        onError:()=>{
            toast.dismiss()
            toast.error("Unable to post at the moment")
        }
    })
    if(isCommenting){
        toast.loading("Commenting")
    }
    return {Comment}
}




export const useDeleteComment = ()=>{
    const queryClient = useQueryClient()
   const DeleteComment = async({postid,commentId}:CommentParams)=>{
        const res = await fetch(`${API_BASE_URL}/api/post/deleteComment/${postid}?commentId=${commentId}`,{
            method:"POST",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Failed to delete comment")
        }
        return data
   }
   const {mutateAsync:deleteComment,isPending:isDeletingComment} = useMutation({
     mutationFn:DeleteComment,
     onSuccess:(data)=>{
        console.log(data)
        toast.dismiss()
        queryClient.invalidateQueries({queryKey:["getPostbyId"]})
        toast.success("Deleted!")
     },
     onError:()=>{
        toast.dismiss()
        toast.error("Unable to delete comment")
     }
   })
   if(isDeletingComment){
     toast.loading("Deleting")
   }
   return{deleteComment}
}

export const useDeletePost = ()=>{
    const queryClient = useQueryClient()
    const DeletePost = async (id:string)=>{
        const res = await fetch(`${API_BASE_URL}/api/post/deletePost/${id}`,{
            method:"DELETE",
            credentials:"include"
        })
        const data = res.json()
        if(!res.ok){
            throw new Error("Failed to delete post")
        }
        return data
    }

    const {mutateAsync:deletePost,isPending:IsDeletingPost} = useMutation({
        mutationFn:DeletePost,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["getPost"]})
            toast.dismiss()
            toast.success("Posted Deleted")
            
        },
        onError:()=>{
            toast.dismiss()
            toast.error("Unable to delete post at the moment")
        }
    })

    if(IsDeletingPost){
        toast.loading("Deleting")
    }
    return{deletePost}
}

export const useEditPost  = (id:string)=>{
    const queryClient = useQueryClient()
    const EditPost = async (form:FormData)=>{
        const res = await fetch(`${API_BASE_URL}/api/post/editPost/${id}`,{
            method:"PUT",
            credentials:"include",
            body:form
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Failed to edit post")
        }
        return data
    }
    const {mutateAsync:editPost,isPending:isEditing} = useMutation({
        mutationFn:EditPost,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["getPost"]})
            toast.dismiss()
            toast.success("Posted")
        },
        onError:()=>{
            toast.dismiss()
            toast.error("Unable to edit post ")
        }
    })
    if(isEditing){
        toast.loading("Posting")
    }
    return{editPost}
}

export const useUserPost = (username:string | undefined)=>{
    const UserPost = async():Promise<PostType[]>=>{
        const res = await fetch(`${API_BASE_URL}/api/post/getProfilePost/${username}`,{
            method:"GET",
            credentials:"include"
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Failed to fetch post")
        }
        return data
    }
    const {data:userPost,isLoading:UserPostLoading,refetch:ProfilePostRefetch} = useQuery({
        queryKey:["getUserPost"],
        queryFn:UserPost
    })
    return {userPost,UserPostLoading,ProfilePostRefetch}
}
