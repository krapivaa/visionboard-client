export interface Item {
    itemTitle: string;
    notes: string;
    photo: string;
}

export interface RequestBodyItem {
    item: Item;
}
    
    
    
export interface ItemResponse {
    id?: number;
    boardId?: number;
    itemTitle: string;
    notes: string;
    photo: string;
    updatedAt?: Date;
    createdAt?: Date;
}

