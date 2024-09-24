import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { UserType } from "../../lib/type"
import { Lock } from "lucide-react"
import { Avatar, AvatarImage } from "../ui/avatar";
import avatarImage from "../../assets/images/avatar-placeholder.png"
import { useRef, useState } from "react"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useEditProfile } from "../../api/userApi"

type Props = {
    Profile: UserType | undefined
}

type EditProfileType = {
    bio: string | undefined,
    link: string | undefined
}

const EditProfilePopOver = ({ Profile }: Props) => {
    const [imageUrl, setImageUrl] = useState(Profile?.profileImg)
    const [imageFile,setImageFile] = useState<File | null>()
    const imgRef = useRef<HTMLInputElement | null>(null)
    const {edit} = useEditProfile()
    const [editProfile, setEditProfile] = useState<EditProfileType>({
        bio: Profile?.bio,
        link: Profile?.link
    })
    const handleBioChange = (bio: string) => {
        setEditProfile((prevState) => ({
            ...prevState,
            bio: bio
        }))
    }
    const handleLinkChange = (link: string) => {
        setEditProfile((prevState) => ({
            ...prevState,
            link: link
        }))
    }
    const handleImagechange = (files:FileList | null)=>{
       if(files && files.length > 0){
         const file = files[0]
         setImageFile(file)
         const url = URL.createObjectURL(file)
         setImageUrl(url)
       }
    }
    const handleEditSave = () => {
      const formData = new FormData()
      if(editProfile.bio){
        formData.append("bio",editProfile.bio);
      }
      if(editProfile.link){
        formData.append("link",editProfile.link)
      }
      if(imageFile){
        formData.append("profileImg",imageFile)
      }
      edit(formData)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full flex justify-center text-primary-primaryText bg-transparent hover:bg-transparent border-primary-iconColor hover:text-primary-primaryText rounded-xl">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-primary-secondarybackground border-[1px] border-primary-iconColor rounded-[16px] text-primary-secondarybackground">
                <DialogHeader>
                    <DialogDescription className="text-primary-primaryText flex flex-col gap-3">
                        <div className="w-full flex gap-2">
                            <div className="w-full">
                                <Label htmlFor="username">
                                    Name
                                </Label>
                                <div className="w-full flex gap-1 py-2 border-b-[1px] border-primary-iconColor ">
                                    <Lock className="text-primary-primaryText w-4 h-5" />
                                    <span>{Profile?.fullname}</span>
                                    <span>(@{Profile?.username})</span>
                                </div>
                            </div>
                            <div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="w-14 h-14 cursor-pointer">
                                            <AvatarImage src={imageUrl || avatarImage} />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="bg-primary-secondarybackground w-full border-primary-iconColor p-2">
                                     <div className=" focus:bg-primary-iconColor hover:bg-primary-iconColor text-primary-primaryText p-2 rounded-xl text-[13px] cursor-pointer"
                                      onClick={()=>imgRef.current?.click()}>
                                       Upload Image
                                     </div>
                                     <input type="file" hidden ref={imgRef}
                                      onChange={(e)=>handleImagechange(e.target.files)} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label htmlFor="bio" className="text-start">
                                Bio
                            </Label>
                            <Input value={editProfile.bio}
                                className="bg-transparent rounded-none border-t-0 border-r-0 border-l-0 border-primary-iconColor px-0"
                                onChange={(e) => handleBioChange(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="link" className="text-start">
                                Link
                            </Label>
                            <Input value={editProfile.link}
                                className="bg-transparent rounded-none border-t-0 border-r-0 border-l-0 border-primary-iconColor px-0"
                                onChange={(e) => handleLinkChange(e.target.value)} />
                        </div>
                        <DialogClose asChild>
                            <Button className=" text-[16px] text-primary-secondarybackground bg-primary-primaryText rounded-xl h-[50px] flex justify-center mt-4 hover:bg-primary-primaryText"
                                onClick={handleEditSave}>
                                Done
                            </Button>
                        </DialogClose>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default EditProfilePopOver