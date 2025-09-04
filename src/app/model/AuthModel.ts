export interface RegisterRequest {
    email: string;
    name: string;
    phone: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ProfileUser {
    email: string;
    name: string;
    phone: string;
    id: string;
}