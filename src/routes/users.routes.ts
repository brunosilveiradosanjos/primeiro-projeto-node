import multer from 'multer';
import { Router } from 'express';
import CreateUserService from '../service/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const usersRouter = Router();
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        // password is gonna be saved id DB but the hash will not be showed  
        delete user.password;

        return response.json(user);
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        return response.json({ ok: true })
    })

export default usersRouter;