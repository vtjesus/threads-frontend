import { FilePenLine, Hash, ImagePlay, Images, Plus, X } from "lucide-react"

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";
import { useCreatePost } from "../../api/postApi";
import { toast } from "sonner";
import avatarImage from '../../assets/images/avatar-placeholder.png'


type Props = {
    Option: "smallSize" | "largeSize" | "Header"
}

const CreatePostPopOver = ({ Option }: Props) => {
    const user = useSelector((state: RootState) => state.user.user)
    const [TextField, setTextField] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const { AddPost, Posting } = useCreatePost()
    const [imageFile, setImageFile] = useState<File | null>(null)
    const ImgRef = useRef<HTMLInputElement | null>(null)
    const ImageChange = (files: FileList | null) => {
        if (files && files.length > 0) {
            const file = files[0];
            setImageFile(file)
            const url = URL.createObjectURL(file);
            setImageUrl(url);
        }
    }
    if (Posting) {
        return toast.loading("Posting...")
    }
    const HandlePost = () => {
        const formData = new FormData()
        formData.append("text", TextField)
        if (imageFile) {
            formData.append("img", imageFile)
        }
        AddPost(formData)
    }
    return (
        <Dialog>
            <DialogTrigger>
                {Option === "smallSize" && <FilePenLine className="text-primary-iconColor w-7 h-7" />}
                {Option === "largeSize" && <Button className="bg-primary-secondarybackground py-8 px-5 rounded-xl border-[1px]
                                              border-primary-iconColor hover:bg-primary-secondarybackground/20">
                    <Plus className="w-10 h-10 text-primary-primaryText" />
                </Button>}
            {Option === "Header" && <Input className="w-full bg-transparent border-none" placeholder="Start a thread..."/>}
            </DialogTrigger>
            <DialogContent className="bg-primary-secondarybackground border-[1px] border-primary-iconColor rounded-[16px]">
                <DialogHeader>
                    <DialogDescription className=" max-h-[350px] h-full overflow-scroll overflow-x-hidden mb-7">
                        <div>
                            <div className="flex flex-row gap-2">
                                <Avatar>
                                    <AvatarImage src={user?.profileImg || avatarImage} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="w-full mr-2">
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
                            {imageUrl && <div className="relative ml-10 py-3">
                                <div className=" rounded-full p-2 bg-primary-secondarybackground/50 absolute top-6 right-[73px] cursor-pointer"
                                    onClick={() => setImageUrl("")}>
                                    <X className="w-4 h-4 text-primary-primaryText" />
                                </div>
                                <img src={imageUrl} className="h-full w-[85%] object-contain rounded-lg" />
                            </div>
                            }
                            <div className="flex gap-5 px-5 h-full ">
                                <Separator orientation="vertical" className="h-fit" />
                                <div className="flex gap-3">
                                    <Images className="text-primary-iconColor w-5 h-5 cursor-pointer"
                                        onClick={() => ImgRef.current?.click()} />
                                    <ImagePlay className="text-primary-iconColor w-5 h-5" />
                                    <Hash className="text-primary-iconColor w-5 h-5" />
                                </div>
                                <Input type="file" className=" hidden" ref={ImgRef} onChange={(e) => ImageChange(e.target.files)} />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div className="flex justify-between w-full items-center">
                        <h6 className="text-[15px] font-semibold text-primary-secondaryText">Anyone can reply and quote</h6>
                        <DialogClose asChild>
                            <Button className="bg-primary-secondarybackground border-[1px] border-primary-iconColor rounded-lg"
                                onClick={HandlePost}
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

export default CreatePostPopOver