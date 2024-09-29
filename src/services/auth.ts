import { api } from './index';
import { AuthResponse } from 'entities/index';

interface LoginData {
    username: string;
    password: string;
}

export const loginUser = (data: LoginData) => 
    api<AuthResponse>('http://cybernexvpn-stage.ru:8000/api/v1/auth/login', {
        method: 'POST',
        data,
});
