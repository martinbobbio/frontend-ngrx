export class EgressIncome {
    public description:string
    public mount:number
    public type:string
    public uid:string

    constructor(userObject:UserObject){
        this.description = userObject && userObject.description
        this.mount = userObject && userObject.mount
        this.type = userObject && userObject.type
    }
}

interface UserObject {
    description: string
    mount: number,
    type: string,
    uid:string,
}