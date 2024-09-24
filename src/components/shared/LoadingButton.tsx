import { Loader } from "lucide-react"
import { Button } from "../ui/button"


const LoadingButton = () => {
  return (
    <Button type="submit" className="bg-white flex gap-4 text-primary-secondaryText w-full text-[16px] p-7">
         <Loader className=" animate-spin text-primary-iconColor"/>
         Loading...
    </Button>
  )
}

export default LoadingButton