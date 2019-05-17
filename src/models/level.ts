export class Level{
    levelName:string;      //字排
    members:any;         //成员

    constructor(fields?:any){
        for (let f in fields) {
            this[f] = fields[f];
        }
    }
}