import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        return response.send({ message: 'ok' });
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

export default usersRouter;