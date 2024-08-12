import { UserRepository, UserCreate } from '../interfaces/user.interface';
import { UserRepositoryPrisma } from '../repositories/user.repository';

// Define a classe UserUseCase que gerencia os casos de uso relacionados aos usuários
class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  // Método para criar um novo usuário
  async create(data: UserCreate) {
    return await this.userRepository.create(data);
  }

  // Método para obter todos os usuários
  async getAllUsers() {
    return await this.userRepository.findMany();
  }

  // Método para deletar um usuário pelo ID
  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  // Método para atualizar um usuário pelo ID
  async update(id: string, data: UserCreate) {
    return await this.userRepository.update(id, data);
  }

  // Método para autenticar um usuário pelo email
  async authenticate(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Authentication failed');
    }
    return user;
  }

  // Método para obter um usuário pelo ID
  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

// Exporta a classe UserUseCase para ser utilizada em outras partes do código
export { UserUseCase };
