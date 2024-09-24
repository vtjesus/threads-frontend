import { UserType } from "../../lib/type"
import { Avatar, AvatarImage } from "../ui/avatar"
import avatarImage from '../../assets/images/avatar-placeholder.png'
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { DialogClose } from "../ui/dialog"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../Redux/store"
import { cn } from "../../lib/utils"
import { useFollow } from "../../api/userApi"
import { AddFollow } from "../../Redux/feature/authSlice";


type Props = {
    Profile: UserType,
    page: "profile" | "search"
}
const FollowerCard = ({ Profile, page }: Props) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const currentUser = useSelector((state: RootState) => state.user.user)
    const { Follow } = useFollow()
    const dispatch = useDispatch()
    const handleNavigate = () => {
        navigate(`/profile/${Profile.username}`)
        queryClient.invalidateQueries({ queryKey: ["getProfile"] })
        queryClient.invalidateQueries({ queryKey: ["getUserPost"] })
    }
    const isFollowing = currentUser?.following.find((user) => user._id === Profile._id);
    const HandleFollow = () => {
        Follow(Profile._id)
        dispatch(AddFollow({ userId: Profile._id, user: Profile }))
    }
    console.log(Profile, isFollowing)
    return (
        <div className="w-full flex mb-4 gap-3">
            <Avatar>
                <AvatarImage src={Profile.profileImg || avatarImage} />
            </Avatar>
            <div className="flex-1 flex justify-between gap-2 border-b-[1px] pb-3 pr-4 border-primary-iconColor">
                <div className="flex flex-col justify-start">
                    {page === "profile" && <DialogClose onClick={handleNavigate}
                        className=" cursor-pointer text-start font-bold text-primary-primaryText hover:border-b border-primary-primaryText">
                        {Profile.username}
                    </DialogClose>}
                    {
                        page === "search" && <h5 onClick={handleNavigate}
                            className=" cursor-pointer text-start font-bold text-primary-primaryText hover:border-b border-primary-primaryText">
                            {Profile.username}
                        </h5>
                    }
                    <span className=" capitalize text-primary-secondaryText">{Profile.fullname}</span>
                    {
                        page === "search" && <div className="text-[14px] pt-2 flex gap-2 items-center">
                            {Profile.followers.length > 0 && <span className="flex">
                                {
                                 Profile.followers.slice(0,2).map((followers,index)=>(
                                    <span className="-ml-2" key={index}>
                                       <Avatar className="w-4 h-4">
                                         <AvatarImage src={followers.profileImg || avatarImage}/>
                                       </Avatar>
                                    </span>
                                 ))
                                }
                            </span>}
                            {Profile.followers.length} Followers
                        </div>
                    }
                </div>
                {Profile._id !== currentUser?._id &&
                    <Button variant="outline" className={cn(`bg-transparent hover:bg-transparent hover:text-primary-primaryText border-primary-iconColor text-primary-primaryText w-[100px] rounded-xl`, {
                        "text-primary-secondaryText": isFollowing
                    })} onClick={HandleFollow}>
                        {isFollowing ? "Following" : "Follow"}
                    </Button>
                }
            </div>
        </div>
    )
}

export default FollowerCard