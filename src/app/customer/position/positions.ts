
export class Positions{
    key: number
    position: string
    constructor(key: number){
        this.key = key;
        switch(key){
            case 1:
                this.position = 'allongé';
                break;
            case 2:
                this.position = 'lateral gauche';
                break;
            case 3:
                this.position = 'latéral droit';
                break;
            case 4:
                this.position = 'couché';
                break;
            case 5:
                this.position = 'standar';
                break;
        }
    }
}