import LogoutPopover from "../components/shared/LogoutPopover";
import ThreadLogo from '../assets/images/Frame.png';
import { CircleX, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { useEffect, useState } from "react";
import { useSearchUser } from "../api/userApi";
import SearchUserSkeleton from "../components/shared/skeleton/SearchUserSkeleton";
import FollowerCard from "../components/shared/FollowerCard";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("")
  const getEndpoint = () => {
    if (searchText.length === 0) {
      return "api/user/suggestUser"
    } else if (searchText.length > 0) {
      return `api/user/searchUser?name=${searchText}`
    }
    return "api/user/suggestUser"
  }
  const endpoint = getEndpoint()
  const { searchUser, isLoading, isRefetching, refetch } = useSearchUser(endpoint)
  useEffect(() => {
    refetch()
  }, [searchText, refetch])
  console.log(searchUser)
  return (
    <div className="sm:bg-primary-primarybackground h-full  bg-primary-smallscreenColor min-h-screen">
      {/**Header for large screen */}
      <div className="hidden sm:flex w-full justify-center items-center  text-primary-primaryText 
       sm:fixed sm:top-0 bg-primary-primarybackground h-[50px] sm:z-10">
        <h5 >Search</h5>
      </div>

      {/**Header for small screen */}
      <div className="fixed sm:hidden w-full flex justify-center py-5  top-0 bg-primary-primarybackground z-20">
        <div className="w-full h-full flex justify-center relative">
          <img src={ThreadLogo} width={30} />
          <div className=" absolute top-0 right-4 z-10">
            <LogoutPopover />
          </div>
        </div>
      </div>

      <div className="w-full flex h-full justify-center max-sm:pt-[70px] sm:mt-[50px]">
        <div className="w-full sm:w-[80%] md:w-[600px] sm:bg-primary-secondarybackground sm:rounded-[16px] 
         text-primary-primaryText  sm:border-primary-iconColor sm:border-[1px] py-5 pl-5">

          {/**search */}
          <div className="relative flex gap-2 bg-primary-primarybackground items-center border-[1px] border-primary-iconColor rounded-2xl text-white  px-4  mr-5">
            <Search className="w-6 h-6 text-primary-iconColor" />
            <Input placeholder="Search"

              className="bg-primary-primarybackground border-none placeholder:text-primary-secondaryText placeholder:font-semi-bold"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)} />
            {
              searchText.length > 0 && <CircleX className="w-5 h-5 text text-primary-iconColor cursor-pointer" onClick={() => setSearchText("")} />
            }
          </div>

          {/**suggusted user and search user */}
          <div className="mt-5">
            {
              isLoading || isRefetching ? <div className="flex flex-col gap-3 pr-5">
                <SearchUserSkeleton />
                <SearchUserSkeleton />
                <SearchUserSkeleton />
                <SearchUserSkeleton />
                <SearchUserSkeleton />
                <SearchUserSkeleton />
              </div> :
                <div>
                  {
                    searchUser?.map((user) => (
                      <FollowerCard Profile={user} page="search"/>
                    ))
                  }
                </div>
            }
          </div>

        </div>
      </div>

    </div>
  )
}

export default SearchPage