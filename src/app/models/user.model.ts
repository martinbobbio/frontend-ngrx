export class User {
    public username:string
    public email:string
    public uid:string

    constructor(userObject:UserObject){
        this.username = userObject && userObject.username
        this.email = userObject && userObject.email
        this.uid = userObject && userObject.uid
    }
}

interface UserObject {
    uid: string
    email: string
    username: string
}