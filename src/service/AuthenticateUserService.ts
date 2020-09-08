import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {

        const userRepository = getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Invalid email/password');
        }

        // user.password - Senha criptografada
        // password - senha não criptografada

        const passwordMacthed = await compare(password, user.password);

        if (!passwordMacthed) {
            throw new Error('Invalid email/password');
        }

        const token = sign({}, '1e0152806900281538f954f347b91974', {
            subject: user.id,
            expiresIn: '1d'
        })

        return { user, token };

    }
}

export default AuthenticateUserService;