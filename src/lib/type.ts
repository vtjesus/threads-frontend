import moment from "moment";

export const formatTimeAgo = (date: string) => {
    const now = moment();
    const duration = moment.duration(now.diff(date));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes());
    const days = Math.floor(duration.asDays());

    if (days > 0) {
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return 'just now';
    }
}


export type UserType = {
    _id:string,
    username:string,
    fullname:string,
    following:UserType[],
    followers:UserType[],
    profileImg:string,
    bio:string,
    link:string,
    LikedPosts:string[],
    __v:number,
    createdAt:string,
    updatedAt:string
}

export type PostType = {
    _id:string ,
    user:UserType,
    Text:string,
    Like:string[],
    comments:{
        user:UserType,
        text:string,
        _id:string
    }[],
    createdAt:string,
    updatedAt:string,
    __v:number,
    Img:string
}

export type CreatePostType = {
    text:string,
    img?:string
}