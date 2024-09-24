import { Skeleton } from "../../ui/skeleton"


const ProfileSkeleton = () => {
  return (
    <div>
        <div className="w-full flex justify-between">
             <div className="w-[70%] sm:mt-5 flex flex-col gap-3">
                 <Skeleton className="w-[200px] h-[24px] bg-primary-iconColor"/>
                 <Skeleton className="w-[150px] h-[14px] bg-primary-iconColor"/>
             </div>
             <div className="w-[30%] flex justify-end">
                <Skeleton className="w-16 h-16 sm:w-[92px] sm:h-[92px] rounded-full bg-primary-iconColor"/>
              </div>
        </div>
        <Skeleton className="w-[300px] h-[14px] mt-4 bg-primary-iconColor"/>
        <div className="w-full flex justify-between">
        <Skeleton className="w-[450px] h-[14px] mt-4 bg-primary-iconColor"/>
        <Skeleton className="w-7 h-7 rounded-xl bg-primary-iconColor"/>
        </div>
        <Skeleton className="w-full h-10 mt-6 bg-primary-iconColor"/>
         <Skeleton className="mt-6 w-full h-[400px] bg-primary-iconColor"/>
    </div>
  )
}

export default ProfileSkeleton