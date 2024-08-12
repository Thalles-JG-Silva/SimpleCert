import { PrismaClient } from '@prisma/client';
import { User, UserCreate, UserRepository } from '../interfaces/user.interface';

const prisma = new PrismaClient();

class UserRepositoryPrisma implements UserRepository {
    // Encontra um usuário pelo email
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    }

    // Encontra um usuário pelo ID
    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    }

    // Cria um novo usuário
    async create(data: UserCreate): Promise<User> {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
        return user;
    }

    // Obtém todos os usuários
    async findMany(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    // Deleta um usuário pelo ID
    async delete(id: string): Promise<User | null> {
        // Deleta todos os registros dependentes na tabela Certificate
        await prisma.certificate.deleteMany({
            where: { userId: id },
        });

        // Agora pode deletar o usuário
        const user = await prisma.user.delete({
            where: { id },
        });
        return user;
    }

    // Atualiza um usuário pelo ID
    async update(id: string, data: UserCreate): Promise<User | null> {
        const user = await prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });
        return user;
    }
}

export { UserRepositoryPrisma };
