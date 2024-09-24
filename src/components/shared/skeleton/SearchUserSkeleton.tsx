import { Skeleton } from "../../ui/skeleton"


const SearchUserSkeleton = () => {
    return (
        <div className="w-full flex items-center space-x-4 border-b-[1px] border-primary-iconColor py-2">
            <Skeleton className="h-10 w-10 rounded-full bg-primary-iconColor" />
            <div className="w-full flex justify-between items-center">
                <div className="w-full space-y-2">
                <Skeleton className="h-4 w-[200px] bg-primary-iconColor" />
                <Skeleton className="h-4 w-[100px] bg-primary-iconColor" />
                <Skeleton className="h-4 w-[50px] bg-primary-iconColor" />
                </div>
                <Skeleton className="w-[100px] h-[35px]  bg-primary-iconColor"/>
            </div>
        </div>
    )
}

export default SearchUserSkeleton