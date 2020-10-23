
    export interface Board {
        boardTitle: string;
        description: string;
        tags: string;
        sharedBoard: boolean;
    }

 
    export interface ReaquestBodyBoard {
        board: Board;
    }


    export interface BoardResponse {
        id?: number;
        owner?: number;
        boardTitle: string;
        description: string;
        tags: string;
        sharedBoard?: boolean;
        updatedAt?: Date;
        createdAt?: Date;
        image?: string
    }


      

