export class Member{
    name:string;
    alive:boolean;         //是否在世
    belongTo:string;       //属于哪个地方

    constructor(fields?:any){
        for (let f in fields) {
            this[f] = fields[f];
        }
    }
}