import { Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"

type Props = {
    Click: () => void,
}

const DeleteAlert = ({ Click}: Props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="w-full flex justify-between gap-2 bg-primary-primarybackground hover:bg-primary-secondarybackground">
                <span className=" text-red-600">Delete</span>
                <Trash2 className="w-5 h-6 text-red-600" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-primary-primarybackground border-none">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-primary-primaryText">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="text-primary-primaryText">
                        This action cannot be undone. This will permanently delete this comment
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button  onClick={()=>Click()}>
                          Delete
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteAlert