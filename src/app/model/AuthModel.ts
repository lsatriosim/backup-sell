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

export interface UpdateProfileRequest {
    name: string;
    phone: string;
}

export interface ProfileUser {
    email: string;
    name: string;
    phone: string;
    userId: string;
}