import { FastifyInstance } from 'fastify';
import { CertificateCreate } from '../interfaces/certificates.interface';
import { authMiddleware } from '../middlewares/auth.middleware';
import { CertificateUseCase } from '../usecases/certificates.usecase';

export async function certificateRoutes(fastify: FastifyInstance) {
  const certificateUseCase = new CertificateUseCase();

  fastify.addHook('preHandler', authMiddleware);

  // Cadastro de Certificados
  fastify.post<{ Body: CertificateCreate }>('/', async (req, reply) => {
    const { titulo, tipo, horas, data, participante, participacao, userId } = req.body;
    try {
      const certificate = await certificateUseCase.create({ titulo, tipo, horas, data, participante, participacao, userId });
      return reply.send(certificate);
    } catch (error) {
      reply.send(error);
    }
  });

  // Visualização de todos os Certificados
  fastify.get('/', async (req, reply) => {
    try {
      const certificates = await certificateUseCase.getAll();
      return reply.send(certificates);
    } catch (error) {
      reply.send(error);
    }
  });

  // Visualização de Certificado por ID
  fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const certificate = await certificateUseCase.getById(id);
      if (certificate) {
        return reply.send(certificate);
      } else {
        return reply.status(404).send({ message: 'Certificate not found' });
      }
    } catch (error) {
      reply.send(error);
    }
  });

  // Visualização de Certificados por UserID
  fastify.get<{ Params: { userId: string } }>('/user/:userId', async (req, reply) => {
    const { userId } = req.params;
    try {
      const certificates = await certificateUseCase.getByUserId(userId);
      return reply.send(certificates);
    } catch (error) {
      reply.send(error);
    }
  });

  // Atualização de Certificados
  fastify.put<{ Params: { id: string }, Body: CertificateCreate }>('/:id', async (req, reply) => {
    const { id } = req.params;
    const { titulo, tipo, horas, data, participante, participacao, userId } = req.body;
    try {
      const updatedCertificate = await certificateUseCase.update(id, { titulo, tipo, horas, data, participante, participacao, userId });
      if (updatedCertificate) {
        return reply.send(updatedCertificate);
      } else {
        return reply.status(404).send({ message: 'Certificate not found' });
      }
    } catch (error) {
      reply.send(error);
    }
  });

  // Exclusão de Certificados
  fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const deletedCertificate = await certificateUseCase.delete(id);
      if (deletedCertificate) {
        return reply.send({ message: 'Certificate deleted successfully' });
      } else {
        return reply.status(404).send({ message: 'Certificate not found' });
      }
    } catch (error) {
      reply.send(error);
    }
  });
}
