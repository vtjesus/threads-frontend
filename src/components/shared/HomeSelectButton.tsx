import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

type Props = {
    onChange?:(value:string)=>void
    value:string
}

const HomeSelectButton = ({onChange,value}:Props) => {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="bg-primary-primarybackground border-none text-primary-primaryText text-[16px] font-semibold w-[115px]">
             <SelectValue placeholder="For you"/>
            </SelectTrigger>
            <SelectContent className="bg-primary-secondarybackground text-primary-primaryText border-primary-iconColor border-[1px]">
                <SelectItem value="For you" className=" focus:text-white focus:bg-primary-iconColor">For you</SelectItem>
                <SelectItem value="Following" className=" focus:text-white focus:bg-primary-iconColor">Following</SelectItem>
            </SelectContent>
        </Select>

    )
}

export default HomeSelectButton