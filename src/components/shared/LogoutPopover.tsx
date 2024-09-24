import { Menu } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { Logout } from "../../Redux/feature/authSlice"
import { useGetLogout } from "../../api/authApi";


const LogoutPopover = () => {
    const dispatch = useDispatch()
    const {logout,isSuccess} = useGetLogout()
    const HandleLogout = ()=>{
       logout()
       if(isSuccess){
        dispatch(Logout())
       }
    }
    return (
        <Popover>
            <PopoverTrigger>
                <Menu className="w-8 h-8 text-primary-iconColor hover:text-primary-primaryText" />
            </PopoverTrigger>
            <PopoverContent className=" bg-primary-secondarybackground border-primary-secondaryText w-fit">
                <Button className="bg-primary-iconColor hover:bg-primary-iconColor/35"
                onClick={HandleLogout}>
                    Logout
                </Button>
            </PopoverContent>
        </Popover>

    )
}

export default LogoutPopover