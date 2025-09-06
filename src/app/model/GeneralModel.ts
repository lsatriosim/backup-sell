export interface BackendResponse<T> {
    status: boolean;
    data: T;
    message: string;
}

export interface TimeStamp {
    createdAt: Date;
    updatedAt: Date;
}