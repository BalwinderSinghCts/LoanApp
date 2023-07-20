export interface IUser {
    userId: string;
    role: string;
    roken: string;
    exptime: string;
}

export interface AppState {
    user: IUser | null
}