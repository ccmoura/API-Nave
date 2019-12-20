import { Router } from 'express';
import adminController from './app/controllers/AdminController';
import candidateController from './app/controllers/CandidateController';
import vacancyController from './app/controllers/VacancyController';
import candidacyController from './app/controllers/CandidacyController';

const routes = new Router();

/**
 * Admin routes
 */
routes.get('/admin', adminController.index);
routes.get('/admin/:email', adminController.findByEmail); // params: { email }
routes.post('/admin', adminController.store); // body: { name, email }
routes.put('/admin/:id', adminController.updateEmail); // params: { id }, body: { email }
routes.delete('/admin/:id', adminController.deleteById); // params: { id }

/**
 * Candidate routes
 */
routes.get('/candidate', candidateController.index);
routes.get('/candidate/:cpf', candidateController.findByCpf); // params: { cpf }
routes.post('/candidate', candidateController.store); // body: { name, email, cpf, phone }
routes.put('/candidate/:id', candidateController.update); // params: { id }, body: { email, phone }
routes.delete('/candidate/:cpf', candidateController.deleteByCpf); // params: { id }

/**
 * Vacancy routes
 */
routes.get('/vacancy', vacancyController.index);
routes.get('/vacancy/:id', vacancyController.findById); // params: { id }
routes.post('/vacancy/:id', vacancyController.store); // params: { id (admin id) } , body: { name }
routes.put('/vacancy/:id', vacancyController.update); // params: { id (vacancy id) }, body: { id (admin id), name }
routes.delete('/vacancy/:id', vacancyController.deleteById); // params: { id (vacandy id) }, body: {id (admin id), name }

/**
 * Candidacy routes
 */
routes.get('/candidacy', candidacyController.index);
routes.get('/candidacy/:id', candidacyController.findById); // params: { id }
routes.get('/candidacy/filter/:id', candidacyController.filterByVacancy); // params: { id (vacancy id) }
routes.post('/candidacy', candidacyController.store); // body: { idVacancy, idCandidate }
routes.put('/candidacy/:id', candidacyController.updateComment); // params: { id (candidacy id) }, body: { comment, idAdmin }
routes.delete('/candidacy/:id', candidacyController.deleteById); // params: { id }

export default routes;
