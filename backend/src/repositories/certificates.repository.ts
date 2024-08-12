import { PrismaClient } from '@prisma/client';
import { Certificate, CertificateCreate, CertificateRepository } from '../interfaces/certificates.interface';

const prisma = new PrismaClient();

class CertificateRepositoryPrisma implements CertificateRepository {
  // Cria um novo certificado
  async create(data: CertificateCreate): Promise<Certificate> {
    const certificate = await prisma.certificate.create({
      data: {
        titulo: data.titulo,
        tipo: data.tipo,
        horas: data.horas,
        data: data.data,
        participante: data.participante,
        participacao: data.participacao,
        userId: data.userId,
      },
    });
    return certificate;
  }

  // Encontra um certificado pelo email do usuário ou título
  async findByEmailOrTitulo(email: string, titulo: string): Promise<Certificate | null> {
    const certificate = await prisma.certificate.findFirst({
      where: {
        OR: [
          { user: { email: email } },
          { titulo: titulo },
        ],
      },
      include: { user: true },
    });
    return certificate;
  }

  // Retorna todos os certificados
  async getAll(): Promise<Certificate[]> {
    return await prisma.certificate.findMany({
      include: { user: true },
    });
  }

  // Encontra um certificado pelo ID
  async getById(id: string): Promise<Certificate | null> {
    return await prisma.certificate.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  // Encontra certificados pelo ID do usuário
  async getByUserId(userId: string): Promise<Certificate[]> {
    return await prisma.certificate.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  // Atualiza um certificado pelo ID
  async update(id: string, data: CertificateCreate): Promise<Certificate | null> {
    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        titulo: data.titulo,
        tipo: data.tipo,
        horas: data.horas,
        data: data.data,
        participante: data.participante,
        participacao: data.participacao,
        userId: data.userId,
      },
    });
    return certificate;
  }

  // Deleta um certificado pelo ID
  async delete(id: string): Promise<Certificate | null> {
    const certificate = await prisma.certificate.delete({
      where: { id },
    });
    return certificate;
  }
}

export { CertificateRepositoryPrisma };
