import { UserType } from "../../lib/type"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "../ui/dialog"
import { cn } from "../../lib/utils"
import { ScrollArea } from "../ui/scroll-area"
import FollowerCard from "./FollowerCard"
import { useState } from "react"

type Props = {
    Profile: UserType | undefined,
}


const FollowersPopOver = ({ Profile}: Props) => {
    const [selectType, setSelectType] = useState("Followers")
    console.log(Profile?._id)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className=" hover:border-b-[1px] hover:border-primary-secondaryText flex gap-1 text-nowrap">
                    {Profile?.followers.length}
                    <span className=" cursor-pointer ">followers</span>
                </div>
            </DialogTrigger>
            <DialogContent className="bg-primary-secondarybackground border-primary-iconColor p-0">
                <DialogHeader>
                    <DialogDescription>
                        <div>
                            {/**header */}
                            <div className="w-full flex text-primary-secondaryText bg-primary-smallscreenColor h-[70px] font-semibold rounded-t-lg border-b-[1px] border-primary-iconColor">
                                <div
                                    onClick={() => setSelectType("Followers")}
                                    className={cn(`w-[50%] flex justify-center items-center cursor-pointer flex-col gap-1`, {
                                        "text-primary-primaryText border-b-[1px] border-white": selectType === "Followers"
                                    })}>
                                    Followers
                                    <span>
                                        {Profile?.followers.length}
                                    </span>
                                </div>
                                <div
                                    onClick={() => setSelectType("Following")}
                                    className={cn(`w-[50%] flex justify-center items-center cursor-pointer flex-col gap-1`, {
                                        "text-primary-primaryText border-b-[1px] border-white": selectType === "Following"
                                    })}>
                                    Following
                                    <span>
                                        {Profile?.following.length}
                                    </span>
                                </div>
                            </div>
                            <DialogClose />
                            {/**content */}

                            {
                                selectType === "Followers" ?
                                    <ScrollArea className="h-[370px] w-full pl-3">
                                        {
                                           Profile?.followers.map((user)=>(
                                            <FollowerCard Profile={user} page="profile"/>
                                           ))
                                        }
                                    </ScrollArea> :
                                    <ScrollArea className="h-[370px] w-full pl-3">
                                        {
                                            Profile?.following?.map((user) => (
                                                <FollowerCard Profile={user} page="profile"/>
                                            ))
                                        }
                                    </ScrollArea>
                            }
                       </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default FollowersPopOver