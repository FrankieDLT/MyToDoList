export class Item {
    title: string;
    oldtitle: string;
    description: string;
    isDone?: boolean;

   

    constructor(title:string,oldtitle:string,description:string,isDone?:boolean) {
        this.title = title;
        this.oldtitle = oldtitle;
        this.description = description;
        if(isDone!=undefined) {
        this.isDone = isDone;
        } else {
        this.isDone = false;
        }
    }
}