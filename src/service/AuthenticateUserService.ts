import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User
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

        return { user };

    }
}

export default AuthenticateUserService;