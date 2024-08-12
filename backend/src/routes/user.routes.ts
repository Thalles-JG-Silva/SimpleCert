import { FastifyInstance } from 'fastify';
import { UserCreate } from '../interfaces/user.interface';
import { UserUseCase } from '../usecases/user.usecase';


export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  // Rota para criar um novo usuário
  fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
    const { name, email, password } = req.body;
    try {
      const data = await userUseCase.create({ name, email, password });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  // Rota para obter todos os usuários
  fastify.get('/', async (req, reply) => {
    try {
      const users = await userUseCase.getAllUsers();
      return reply.send(users);
    } catch (error) {
      reply.send(error);
    }
  });

  // Rota para obter um usuário por ID
  fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const user = await userUseCase.getUserById(id);
      if (user) {
        return reply.send(user);
      } else {
        return reply.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      reply.send(error);
    }
  });

  // Rota para deletar um usuário
  fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const { id } = req.params;
    try {
      const deletedUser = await userUseCase.delete(id);
      if (deletedUser) {
        return reply.send({ message: 'User deleted successfully' });
      } else {
        return reply.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      reply.send(error);
    }
  });

  // Rota para atualizar um usuário
  fastify.put<{ Params: { id: string }, Body: UserCreate }>('/:id', async (req, reply) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
      const updatedUser = await userUseCase.update(id, { name, email, password });
      if (updatedUser) {
        return reply.send(updatedUser);
      } else {
        return reply.status(404).send({ message: 'User not found' });
      }
    } catch (error) {
      reply.send(error);
    }
  });

  // Rota para autenticar um usuário
  fastify.post<{ Body: { email: string, password: string } }>('/auth', async (req, reply) => {
    const { email, password } = req.body;
    try {
      const user = await userUseCase.authenticate(email);
      if (user && user.password === password) {
        return reply.send(user);
      } else {
        return reply.status(401).send({ message: 'Authentication failed' });
      }
    } catch (error) {
      reply.send(error);
    }
  });
}
