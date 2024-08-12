// Definição do modelo User
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Definição do modelo UserCreate para criação de usuário
export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

// Interface do repositório de usuários
export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: UserCreate): Promise<User>;
  findMany(): Promise<User[]>; // Adicionando findMany
  delete(id: string): Promise<User | null>; // Adicionando delete
  update(id: string, data: UserCreate): Promise<User | null>; // Adicionando update
}
