import { Bookmark, Ellipsis, EyeOff } from "lucide-react";
import DeleteAlert from "../shared/DeleteAlert";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,
     DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { UserType } from "../../lib/type";

type Props = {
    Click:(value:string)=>void,
    comment:{
        user:UserType,
        text:string,
        _id:string
    }
}

const CommentOption = ({Click,comment}:Props) => {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger>
        <Ellipsis className="w-5 h-5 text-primary-iconColor" />
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-primary-primarybackground border-primary-iconColor text-primary-primaryText w-[200px] text-[15px] p-2">
        <DropdownMenuItem className=" focus:bg-primary-secondarybackground focus:text-white">
            <div className="w-full flex justify-between p-1">
                <span className="font-semibold">Save</span>
                <Bookmark className="w-5 h-5 text-primary-primaryText" />
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem className=" focus:bg-primary-secondarybackground focus:text-white">
            <div className="w-full flex justify-between p-1">
                <span className="font-semibold">Not interested</span>
                <EyeOff className="w-5 h-5 text-primary-primaryText" />
            </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-primary-iconColor" />
        <DropdownMenuItem asChild>
            <DeleteAlert  Click={()=>Click(comment._id)} />
        </DropdownMenuItem>
    </DropdownMenuContent>
</DropdownMenu>
  )
}

export default CommentOption