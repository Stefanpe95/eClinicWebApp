export class Role {
    
    roleID?:number;
    roleName?:string;

    constructor(init?:Partial<Role>) {
        Object.assign(this, init);
    }
}
