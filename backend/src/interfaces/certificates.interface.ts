// Definição do modelo Certificate
export interface Certificate {
  id: string;
  titulo: string;
  tipo: string;
  horas: number;
  data: Date;
  participante: string;
  participacao: string;
  userId: string;
}

// Definição do modelo CertificateCreate para criação de certificado
export interface CertificateCreate {
  titulo: string;
  tipo: string;
  horas: number;
  data: Date;
  participante: string;
  participacao: string;
  userId: string;
}

// Interface do repositório de certificados
export interface CertificateRepository {
  create(data: CertificateCreate): Promise<Certificate>;
  findByEmailOrTitulo(email: string, titulo: string): Promise<Certificate | null>;
  getAll(): Promise<Certificate[]>;
  getById(id: string): Promise<Certificate | null>;
  getByUserId(userId: string): Promise<Certificate[]>; // Adicionada a função getByUserId
  update(id: string, data: CertificateCreate): Promise<Certificate | null>;
  delete(id: string): Promise<Certificate | null>;
}
