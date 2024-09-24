import { Hash, ImagePlay, Images, MessageCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import { useSelector } from "react-redux"
import { useState } from "react"
import { RootState } from "../../Redux/store"
import { formatTimeAgo, PostType } from "../../lib/type"
import avatarImage from '../../assets/images/avatar-placeholder.png'

type Props = {
    Post: PostType,
    HandleComment: (value: string) => void
}

const CommentPopOver = ({ Post, HandleComment }: Props) => {
    const user = useSelector((state: RootState) => state.user.user)
    const [TextField, setTextField] = useState("")
    return (
        <Dialog>
            <DialogTrigger asChild>
                <MessageCircle className=" text-primary-primaryText w-5 h-5" />
            </DialogTrigger>
            <DialogContent className="bg-primary-secondarybackground border-[1px] border-primary-iconColor rounded-[16px]">
                <DialogHeader>
                    <DialogDescription className=" max-h-[350px] h-full overflow-scroll overflow-x-hidden mb-7">
                        <div className="w-full flex flex-col gap-2 mb-4">
                            <div className="w-full flex gap-2">
                                <Avatar>
                                    <AvatarImage src={Post.user.profileImg || avatarImage} alt="profileImage" />
                                    <AvatarFallback></AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1 text-primary-primaryText">
                                    {/**Username and time */}
                                    <div className="flex gap-3 text-[14px]">
                                        <span className="font-semibold  text-start">{Post.user.username}</span>
                                        <span className="font-semibold text-primary-secondaryText">{formatTimeAgo(Post.createdAt)}</span>
                                    </div>
                                    <span className="font-normal text-[14px] text-start">{Post.Text}</span>

                                </div>
                            </div>
                                {
                                    Post.Img &&
                                    <div className="flex gap-2 w-full h-full">
                                        <div className="w-12 flex justify-center">
                                            <Separator orientation="vertical" className="h-[300px] bg-primary-iconColor" />
                                        </div>
                                        <img src={Post.Img} className="w-[300px] h-[300px] rounded-xl mt-2 " />
                                    </div>
                                }
                        </div>

                        <div>
                            <div className="flex flex-row gap-2">
                                <Avatar>
                                    <AvatarImage src={user?.profileImg || avatarImage} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="mr-2">
                                    <h5 className=" text-primary-primaryText text-[14px] font-semibold text-start">
                                        {user?.username}
                                    </h5>
                                    <Input type="text"
                                        value={TextField}
                                        onChange={(e) => setTextField(e.target.value)}
                                        placeholder="Start thread..."
                                        className="bg-primary-secondarybackground border-none outline-none focus:outline-none text-primary-primaryText p-0 w-full" />
                                </div>
                            </div>
                            <div className="flex gap-5 px-5 h-full ">
                                <Separator orientation="vertical" className="h-fit" />
                                <div className="flex gap-3">
                                    <Images className="text-primary-iconColor w-5 h-5 cursor-pointer" />
                                    <ImagePlay className="text-primary-iconColor w-5 h-5" />
                                    <Hash className="text-primary-iconColor w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex justify-between w-full items-center">
                        <h6 className="text-[15px] font-semibold text-primary-secondaryText">Anyone can reply and quote</h6>
                        <DialogClose asChild>
                            <Button className="bg-primary-secondarybackground border-[1px] border-primary-iconColor rounded-lg"
                                onClick={() => HandleComment(TextField)}
                                disabled={TextField.length === 0} >
                                Post
                            </Button>
                        </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CommentPopOver