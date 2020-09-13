import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// GET https://localhost:3333/appointments

appointmentsRouter.get('/', async (request, response) => {

    // console.log(request.user)

    // console.log('[GET] /appointments')
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

// POST https://localhost:3333/appointments

appointmentsRouter.post('/', async (request, response) => {

    // console.log('[POST] /appointments')
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
        date: parsedDate,
        provider_id,
    });

    return response.json(appointment)
})

export default appointmentsRouter;