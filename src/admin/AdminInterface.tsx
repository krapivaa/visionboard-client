export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    colorScheme?: number;
    isAdmin?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}