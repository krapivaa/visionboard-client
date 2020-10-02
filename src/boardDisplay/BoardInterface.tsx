export interface Board {
    owner: number;
    boardTitle: string;
    description: string;
    dateCreated: string;
    tags: string;
    sharedBoard: boolean;
    updatedAt: Date;
    createdAt: Date;
}