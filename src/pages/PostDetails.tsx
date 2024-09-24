import { useNavigate, useParams } from "react-router-dom"
import LogoutPopover from "../components/shared/LogoutPopover"
import ThreadLogo from '../assets/images/Frame.png';
import { Heart, Loader, MessageCircle, MoveLeft, Repeat2, Send } from "lucide-react";
import { useDeleteComment, useGetPostDetails } from "../api/postApi";
import { useEffect } from "react";
import PostCard from "../components/shared/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import avatarImage from "../assets/images/avatar-placeholder.png"
import CommentOption from "../components/shared/CommentOption";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";



const PostDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.user.user)
    const { PostDetails, isLoading, refetch, isRefetching } = useGetPostDetails(id || "")
    const { deleteComment} = useDeleteComment()
    useEffect(() => {
        refetch()
    }, [id, refetch])
    if (!PostDetails) {
        return;
    }
    const handleDeleteComment = async (id: string) => {
        await deleteComment({ postid: PostDetails._id, commentId: id })

    }
    const isAuthenticated = PostDetails.user._id === user?._id
    return (
        <div className="sm:bg-primary-primarybackground h-full  bg-primary-smallscreenColor">
            {/**Header for small screens */}
            <div className="fixed sm:hidden w-full flex justify-center py-5  top-0 bg-primary-primarybackground z-20">
                <div className="w-full h-full flex justify-center relative">
                    <img src={ThreadLogo} width={30} />
                    <div className=" absolute top-0 right-4 z-10">
                        <LogoutPopover />
                    </div>
                    <div className=" absolute top-0 left-4 cursor-pointer">
                        <MoveLeft className="w-8 h-8 text-white hover:text-white cursor-pointer"
                            onClick={() => navigate("/")} />
                    </div>
                </div>
            </div>

            <div className="w-full min-h-screen flex flex-col justify-center items-center max-sm:pt-[70px]">
                {/**Header for larger screen */}
                <div className=" hidden sm:flex text-primary-primaryText w-full justify-center py-4">
                    <h5 className="font-bold">Thread</h5>
                </div>
                <div className="w-full sm:w-[80%] md:w-[600px] sm:bg-primary-secondarybackground sm:rounded-[16px]  text-primary-primaryText  sm:border-primary-iconColor sm:border-[1px] min-h-screen relative py-6">
                    <div className=" absolute -top-10 left-5 p-2  bg-inherit  rounded-full cursor-pointer hidden sm:flex"
                        onClick={() => navigate("/")}>
                        <MoveLeft className="w-3 h-3 text-primary-primaryText" />
                    </div>

                    <div>
                        {isLoading || isRefetching ? <div className="w-full flex justify-center items-center min-h-screen">
                            <Loader className=" animate-spin w-6 h-6 text-primary-primaryText"/>
                        </div> :
                            <div>
                                <PostCard post={PostDetails} page="postdetail" />

                                {/**Comment  */}
                                <div>
                                    {PostDetails?.comments.length > 0 && <h5 className="px-6">Replies</h5>}
                                    {
                                        PostDetails?.comments.length > 0 && <div className="mt-5">
                                            {
                                                PostDetails?.comments.map((comment, index) => (
                                                    <div key={index} className="w-full flex gap-3 border-t py-5 border-primary-secondaryText px-6">
                                                        <Avatar>
                                                            <AvatarImage src={comment.user.profileImg || avatarImage} alt="profileImage" />
                                                            <AvatarFallback></AvatarFallback>
                                                        </Avatar>
                                                        <div className="w-full flex flex-col gap-1 text-primary-primaryText">
                                                            {/**Username and time */}
                                                            <div className="flex justify-between">
                                                                <div className="flex gap-3 text-[14px]">
                                                                    <span className="font-semibold">{comment.user.username}</span>
                                                                    {/* <span className="font-semibold text-primary-secondaryText">{formatTimeAgo(PostDetails.createdAt)}</span> */}
                                                                </div>
                                                                {
                                                                    (isAuthenticated  || comment.user._id === user?._id) && (<CommentOption comment={comment} Click={handleDeleteComment} />)
                                                                }
                                                            </div>
                                                            <span className="font-normal text-[14px]">{comment.text}</span>
                                                            {/**Like and comment */}
                                                            <div className="w-full flex gap-1">
                                                                <div className="flex gap-1 p-3 items-end hover:bg-primary-smallscreenColor  hover:rounded-full cursor-pointer">
                                                                    <Heart className="text-primary-primaryText w-5 h-5" />
                                                                    <span className="text-[12px]">2</span>
                                                                </div>
                                                                <div className="flex gap-1 p-3 items-end hover:bg-primary-smallscreenColor  hover:rounded-full cursor-pointer">
                                                                    <MessageCircle className=" text-primary-primaryText w-5 h-5" />
                                                                    <span className="text-[12px]">2</span>
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
                                                ))
                                            }
                                        </div>
                                    }
                                </div>
                            </div>}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default PostDetails