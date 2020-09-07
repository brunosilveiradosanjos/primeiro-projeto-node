import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';
// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

const appointmentsRouter = Router();

// GET https://localhost:3333/appointments

appointmentsRouter.get('/', async (request, response) => {

    // console.log('[GET] /appointments')
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

// POST https://localhost:3333/appointments

appointmentsRouter.post('/', async (request, response) => {

    // console.log('[POST] /appointments')

    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointmentService = new CreateAppointmentService();

        const appointment = await createAppointmentService.execute({
            date: parsedDate,
            provider,
        });

        return response.json(appointment)
    }
    catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

export default appointmentsRouter;