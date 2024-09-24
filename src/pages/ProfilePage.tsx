/* eslint-disable react-hooks/rules-of-hooks */
import LogoutPopover from "../components/shared/LogoutPopover";
import ThreadLogo from '../assets/images/Frame.png';
import { useFollow, useGetProfile } from "../api/userApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserType } from "../lib/type";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import avatarImage from "../assets/images/avatar-placeholder.png"
import { Instagram } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import EditProfilePopOver from "../components/shared/EditProfilePopOver";
import { Button } from "../components/ui/button";
import FollowersPopOver from "../components/shared/FollowersPopOver";
import { cn } from "../lib/utils";
import ProfileSkeleton from "../components/shared/skeleton/ProfileSkeleton";
import { useUserPost } from "../api/postApi";
import PostCard from "../components/shared/PostCard";


const ProfilePage = () => {
  const { username } = useParams()
  const { UserProfile, isLoading, refetch, isRefetching } = useGetProfile(username || "")
  const {userPost,ProfilePostRefetch,UserPostLoading} = useUserPost(username)
  const currentUser = useSelector((state: RootState) => state.user.user)
  const [profile, setProfile] = useState<UserType>()
  const { Follow } = useFollow()
  const [selectSection, setSelectSection] = useState("Threads")
  useEffect(() => {
    refetch()
    ProfilePostRefetch()
    if (UserProfile) {
      setProfile(UserProfile)
    }
  }, [username,refetch,ProfilePostRefetch,UserProfile, userPost,])

  const isUserProfile = profile?._id === currentUser?._id
  const isFollow = profile?.followers.find((follow) => follow._id === currentUser?._id)
  const handleFollowUser = (userId: string) => {
    console.log(userId)
    Follow(userId)
    setProfile((prevState) => {
      if (!prevState) return prevState;
      const alreadyFollowing = prevState.followers.some((followers) => followers._id === currentUser?._id)
      if (alreadyFollowing) {
        return {
          ...prevState,
          followers: prevState.followers.filter((followers) => followers._id !== currentUser?._id),
        }
      } else {
        return {
          ...prevState,
          followers: [...prevState.followers, currentUser as UserType]
        }
      }
    })
  }
   if(!UserProfile){
    return;
   }
  return (
    <div className="sm:bg-primary-primarybackground h-full  bg-primary-smallscreenColor min-h-screen">
      {/**Header for large screen */}
      <div className="hidden sm:flex w-full justify-center items-center  text-primary-primaryText 
       sm:fixed sm:top-0 bg-primary-primarybackground h-[50px] sm:z-10">
        <h5 >Profile</h5>
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

      <div className="w-full flex h-full justify-center max-sm:pt-[70px] sm:mt-[50px]">
        <div className="w-full sm:w-[80%] md:w-[600px] sm:bg-primary-secondarybackground sm:rounded-[16px] 
         text-primary-primaryText  sm:border-primary-iconColor sm:border-[1px] max-sm:mb-16">


          {
           UserPostLoading|| isLoading || isRefetching ? <div className="px-5 pt-5">
              <ProfileSkeleton />
            </div> : <div className="pt-5">
              {/**Profile and profile Image */}
              <div className="w-full flex justify-between px-5">
                <div className="w-[70%] sm:mt-5">
                  <h4 className="text-[24px] font-bold">
                    {profile?.fullname}
                  </h4>
                  <p className=" capitalize mt-1">
                    {profile?.username}
                  </p>
                </div>

                <div className="w-[30%] flex justify-end">
                  <Avatar className="w-16 h-16 sm:w-[92px] sm:h-[92px]">
                    <AvatarImage src={profile?.profileImg || avatarImage} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </div>
              </div>
              {/** profile bio */}
              <p className=" capitalize mt-4 px-5">
                {profile?.bio}
              </p>

              {/**number of followers and instagram */}
              <div className="w-full flex justify-between pt-5 px-5">
                <div className="w-full flex gap-2 text-primary-secondaryText items-center">

                  <div className="flex gap-1 text-[14px] flex-nowrap">
                    <FollowersPopOver Profile={profile} />
                  </div>

                  {/**link */}
                  <a className="text-[14px]" href={profile?.link} target="/blank">
                    {profile?.link}
                  </a>
                </div>
                <Instagram className="w-7 h-7 text-primary-primaryText" />
              </div>

              {
                isUserProfile ? <div className="mt-6 px-5">
                  <EditProfilePopOver Profile={profile} />
                </div> : <div className="w-full flex gap-5 mt-6 px-5">
                  <Button variant="outline"
                    onClick={() => handleFollowUser(UserProfile?._id)}
                    className={cn(`bg-transparent w-[50%] hover:bg-transparent text-primary-primaryText hover:text-primary-primaryText border-primary-iconColor flex justify-center py-3 rounded-xl`, {
                      "bg-primary-primaryText text-primary-secondarybackground hover:bg-primary-primaryText hover:text-primary-secondarybackground": !isFollow
                    })}>
                    {isFollow ? "Following" : "Follow"}
                  </Button>
                  <Button variant="outline" className="bg-transparent w-[50%] hover:bg-transparent text-primary-primaryText hover:text-primary-primaryText border-primary-iconColor flex justify-center py-3 rounded-xl">
                    Mention
                  </Button>

                </div>
              }
              {/**User Post */}
              <div className="w-full mt-4">
                <div className="w-full flex justify-evenly border-b-[1px] border-primary-iconColor  text-primary-secondaryText font-semibold">
                  <div onClick={()=>setSelectSection("Threads")} 
                    className={cn(`flex h-full cursor-pointer py-3 w-full justify-center`,{
                      "text-primary-primaryText border-b-[1px] border-primary-primaryText":selectSection === "Threads"
                    })}>
                    Threads
                  </div>
                  <div onClick={()=>setSelectSection("Replies")}
                   className={cn(`flex h-full cursor-pointer py-3 w-full justify-center`,{
                    "text-primary-primaryText border-b-[1px] border-primary-primaryText":selectSection === "Replies"
                  })}>
                    Replies
                  </div>
                  <div
                  onClick={() =>setSelectSection("Reposts")}
                  className={cn(`flex h-full cursor-pointer py-3 w-full justify-center`,{
                    "text-primary-primaryText border-b-[1px] border-primary-primaryText":selectSection === "Reposts"
                  })}>
                    Reposts
                  </div>
                </div>
                 
                 {selectSection === "Threads" && <div>
                   {userPost?.map((post)=>(
                     <PostCard post={post} page="post"/>
                   ))}
                  </div>}
                 {selectSection === "Replies" && <div className="w-full flex h-full mt-20 justify-center text-primary-secondaryText"> Replies</div>}
                 {selectSection === "Reposts" &&  <div className="w-full flex h-full mt-20 justify-center  text-primary-secondaryText">Reposts</div>}
              </div>

            </div>
          }


        </div>
      </div>

    </div>
  )
}

export default ProfilePage