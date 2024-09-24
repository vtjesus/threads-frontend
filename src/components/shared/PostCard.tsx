import { Heart, Repeat2, Send } from "lucide-react";
import { formatTimeAgo, PostType } from "../../lib/type"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { cn } from "../../lib/utils";
import { useComment, useDeletePost, useLikePost } from "../../api/postApi";
import CommentPopOver from "./CommentPopOver";
import avatarImage from '../../assets/images/avatar-placeholder.png'
import { Link, useNavigate } from "react-router-dom";
import PostOption from "./PostOption";

type Props = {
    post: PostType,
    page: "post" | "postdetail"
}

const PostCard = ({ post, page }: Props) => {
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user.user)
    const [Post, setPost] = useState<PostType>(post)
    const { Like } = useLikePost()
    const { Comment } = useComment(post?._id)
    const {deletePost} = useDeletePost()
    if (!user) {
        return
    }
    const handleLike = () => {
        setPost((prevState) => {
            const AlreadyLiked = prevState.Like.includes(user?._id)
            if (AlreadyLiked) {
                return {
                    ...prevState,
                    Like: prevState.Like.filter((like) => like !== user?._id)
                }
            } else {
                return {
                    ...prevState,
                    Like: [...prevState.Like, user?._id]
                }
            }
        })
        Like(post._id)
    }
    const handleComment = async (text: string) => {
        await Comment(text)
    }
    const handleNavigation = () => {
        if (page === "post") {
            navigate(`/postdetail/${post?._id}`);
        }
    };
    const handleDeletePost = (id:string)=>{
      deletePost(id)
    }
    const isAuthenticated = post.user._id === user._id

    return (
        <div className={cn(`w-full py-4 px-6 cursor-pointer`, {
            "border-primary-iconColor border-t": page === "post"
        })}>
            <div className="w-full flex flex-col justify-between cursor-pointer">
                <div className="w-full flex gap-2 flex-col">
                    <div className={cn(`w-full flex gap-2`, {
                        "items-center": page === "postdetail"
                    })}>
                        <Avatar className="w-9 h-9 z-10">
                            <AvatarImage src={ Post.user.profileImg || avatarImage} alt="profileImage" />
                            <AvatarFallback></AvatarFallback>
                        </Avatar>
                        <div className="w-full flex flex-col gap-1 text-primary-primaryText">
                            {/**Username and time */}
                            <div className="flex justify-between items-center">
                                <div className="flex gap-3 text-[14px]">
                                    <Link to={`/profile/${Post.user.username}`} className="font-semibold hover:border-b-[1px] border-primary-primaryText">
                                        {Post.user.username}
                                    </Link>
                                    <span className="font-semibold text-primary-secondaryText">{formatTimeAgo(Post.createdAt)}</span>
                                </div>
                                {
                                    isAuthenticated &&  <PostOption Post={Post} Click={()=>handleDeletePost(post._id)}/>
                                }
                            </div>
                            {
                                page === "post" && <span className="font-normal text-[14px]" onClick={handleNavigation}>{Post.Text}</span>
                            }
                            {
                                page === "post" && <div>
                                    {post.Img &&
                                        <div className="w-full h-[300px] rounded-xl mt-2" onClick={handleNavigation}>
                                            <img src={Post.Img} className=" object-cover rounded-xl h-[300px]" />
                                        </div>}
                                </div>
                            }
                        </div>
                    </div>
                    {
                        page === "postdetail" && <span className="font-normal text-[14px] px-2">{Post.Text}</span>
                    }
                    {
                        page === "postdetail" && <div>
                            {post.Img && <div className="w-full h-[300px] rounded-xl mt-2">
                                <img src={Post.Img} className="max-h-[300px] rounded-xl" />
                            </div>}
                        </div>
                    }
                </div>
                {/**Like and comment */}
                <div className={cn(`w-full flex gap-1`, {
                    "pl-10": page === "post"
                })}>
                    <div className={cn(`flex gap-1 p-3 items-end hover:bg-primary-smallscreenColor  hover:rounded-full cursor-pointer`, {
                        "text-red-600": Post.Like.includes(user?._id)
                    })} onClick={handleLike}>
                        <Heart className={cn(`text-primary-primaryText w-5 h-5`, {
                            "text-red-600": Post.Like.includes(user?._id)
                        })} />
                        {Post.Like.length > 0 && <span className="text-[12px]">{Post.Like.length}</span>}
                    </div>
                    <div className="flex gap-1 p-3 items-end hover:bg-primary-smallscreenColor  hover:rounded-full cursor-pointer">
                        <CommentPopOver Post={Post} HandleComment={handleComment} />
                        {Post.comments.length > 0 && <span className="text-[12px]">{Post.comments.length}</span>}
                    </div>
                    <div className="flex gap-1 items-end p-3 hover:bg-primary-smallscreenColor  hover:rounded-full cursor-pointer">
                        <Repeat2 className=" text-primary-primaryText w-5 h-5" />
                    </div>
                    <div className="flex gap-1 items-end p-3 hover:bg-primary-smallscreenColor  hover:rounded-full cursor-pointer">
                        <Send className=" text-primary-primaryText w-5 h-5" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard