import { Skeleton } from "../../ui/skeleton"

const PostSkeleton = () => {
  return (
    <div className="w-full flex items-center space-x-4">
       <Skeleton className="h-10 w-10 rounded-full bg-primary-iconColor" />
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-[200px] bg-primary-iconColor" />
        <Skeleton className="h-4 w-full bg-primary-iconColor" />
        <Skeleton className="h-4 w-[200px] bg-primary-iconColor" />
      </div>
    </div>
  )
}

export default PostSkeleton