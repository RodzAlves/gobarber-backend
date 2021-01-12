import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsReposiroty from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

const appointmentsRouter = Router();

// Rota GET
appointmentsRouter.get('/', async (request, response) => {
  const appointsmentsRepository = getCustomRepository(AppointmentsReposiroty);

  const appointments = await appointsmentsRepository.find();

  return response.json(appointments);
});

// Rota POST
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default appointmentsRouter;
