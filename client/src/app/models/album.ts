export class User {
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public year: number,
        public image: string,
        public artist: string
    ){}
}