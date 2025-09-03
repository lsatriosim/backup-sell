export interface BackendResponse<T> {
    status: boolean;
    data: T;
    message: string;
}