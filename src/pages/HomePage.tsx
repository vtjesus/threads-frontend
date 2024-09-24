import { useEffect, useState } from "react"
import HomeSelectButton from "../components/shared/HomeSelectButton"
import ThreadLogo from '../assets/images/Frame.png';
import LogoutPopover from "../components/shared/LogoutPopover";
import { cn } from "../lib/utils";
import { useGetAllPost } from "../api/postApi";
import { PostType } from "../lib/type";
import PostCard from "../components/shared/PostCard";
import PostSkeleton from "../components/shared/skeleton/PostSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import avatarImage from '../assets/images/avatar-placeholder.png'
import { Button } from "../components/ui/button";
import CreatePostPopOver from "../components/shared/CreatePostPopOver";

const HomePage = () => {

  const [selectType, setSelectType] = useState('For you')
  const user = useSelector((state: RootState) => state.user.user)
  const getEndPoint = () => {
    switch (selectType) {
      case "For you":
        return "api/post";
      case "Following":
        return "api/post/getFollowingPost"
      default:
        return "api/post"
    }
  }
  const EndPoints = getEndPoint()
  const { Post, isLoading, refetch, isRefetching } = useGetAllPost(EndPoints)

  const HandleSelectType = (value: string) => {
    setSelectType(value)
  }
  useEffect(() => {
    refetch()
  }, [selectType, refetch])
  console.log(Post)

  return (
    <div className="sm:bg-primary-primarybackground h-full  bg-primary-smallscreenColor">
      {/**Header for large screen */}
      <div className="hidden sm:flex w-full justify-center sm:mt-2">
        <HomeSelectButton onChange={HandleSelectType} value={selectType} />
      </div>

      {/**Header for small screen */}
      <div className="fixed sm:hidden w-full flex justify-center py-5  top-0 bg-primary-primarybackground z-20">
        <div className="w-full h-full flex justify-center relative">
          <img src={ThreadLogo} width={30} />
          <div className=" absolute top-0 right-4 z-10">
            <LogoutPopover />
          </div>
        </div>
      </div>

      <div className="w-full min-h-screen flex justify-center max-sm:pt-[70px]">
        <div className="w-full sm:w-[80%] md:w-[600px] sm:bg-primary-secondarybackground sm:rounded-[16px]  text-primary-primaryText  sm:border-primary-iconColor sm:border-[1px]">
          {/**For you and Following section */}
          <div className="w-full sm:hidden flex text-primary-primaryText">
            <div className={cn(`w-1/2 p-4 flex justify-center cursor-pointer`, {
              "border-b-[2px] border-primary-primaryText": selectType === "For you"
            })} onClick={() => HandleSelectType("For you")}>
              For you
            </div>
            <div className={cn(`w-1/2 flex p-4 justify-center cursor-pointer`, {
              "border-b-[2px] border-primary-primaryText": selectType === "Following"
            })} onClick={() => HandleSelectType("Following")}>
              Following
            </div>
          </div>

          {/**Post */}
          <div>
            {/**Post header */}
          <div className="hidden sm:flex justify-between items-center px-6 py-4">
              <Avatar className="w-9 h-9">
                <AvatarImage src={user?.profileImg || avatarImage } alt="profileImage" />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div className="flex-1">
              <CreatePostPopOver Option="Header"/>
              </div>
              <Button variant="outline" className="bg-transparent hover:bg-primary-secondarybackground rounded-lg border-primary-iconColor">
                Post 
              </Button>
            </div>
            {
              isLoading || isRefetching ? <div className="w-full flex flex-col py-4 px-6 gap-6">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </div> : <div className="w-full">
                {
                  Post.map((post: PostType) => (
                    <PostCard post={post} page="post" />
                  ))
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage