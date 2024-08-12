Here is an updated version of your README file based on the structure and code in your project:

---

# API SimpleCert

Esta é a documentação para a API SimpleCert. Esta API permite aos usuários gerenciar certificados, categorizá-los e realizar operações de CRUD (Create, Read, Update, Delete).

## Funcionalidades

- Os usuários podem adicionar novos certificados com informações como:
  - Título do Certificado
  - Tipo
  - Carga horária em horas
  - Data
  - Nome do Participante
  - Tipo de Participação

## Requisitos Funcionais

- [x] Cadastro de Certificados
- [x] Visualização de Certificados
- [x] Atualização de Certificados
- [x] Exclusão de Certificados

## Requisitos de Autenticação e Autorização

- [x] Autenticação de Usuários
- [x] Autorização de Acesso às Operações
- [x] Criação de Usuário

## Regras de Negócio

- Os usuários devem ser cadastrados com nome, email, e senha.
- O email deve ser único.
- Os certificados devem conter todas as informações requisitadas.
- Somente usuários autenticados podem executar operações de criação, atualização e exclusão de certificados.
- A autorização é baseada em funções de usuário, como administrador e usuário regular.
- Todos os dados da API devem ser armazenados de forma segura e protegidos contra acesso não autorizado.
- As entradas do usuário devem ser validadas para evitar a inserção de dados incorretos ou maliciosos.

## Estrutura do Projeto

### Diretórios

- `backend/`: Contém o código-fonte da API.
  - `database/`: Configurações do Prisma Client.
  - `interfaces/`: Define as interfaces para usuários e certificados.
  - `middlewares/`: Contém middlewares como autenticação.
  - `repositories/`: Implementações dos repositórios para usuários e certificados.
  - `routes/`: Define as rotas da API.
  - `usecases/`: Contém a lógica de negócio para usuários e certificados.
  - `env/`: Arquivos de configuração do ambiente.
- `frontend/`: Contém os arquivos HTML, CSS e JavaScript para a interface do usuário.

### Arquivos Principais

- `backend/src/server.ts`: Inicializa o servidor Fastify e registra as rotas.
- `backend/src/database/prisma-client.ts`: Inicializa o Prisma Client.
- `backend/src/interfaces/user.interface.ts`: Define as interfaces para os modelos de usuário.
- `backend/src/interfaces/certificates.interface.ts`: Define as interfaces para os modelos de certificado.
- `backend/src/middlewares/auth.middleware.ts`: Middleware para autenticação.
- `backend/src/repositories/user.repository.ts`: Implementação do repositório de usuários.
- `backend/src/repositories/certificates.repository.ts`: Implementação do repositório de certificados.
- `backend/src/routes/user.routes.ts`: Define as rotas para operações de usuário.
- `backend/src/routes/certificates.routes.ts`: Define as rotas para operações de certificados.
- `backend/src/usecases/user.usecase.ts`: Contém a lógica de negócio para usuários.
- `backend/src/usecases/certificates.usecase.ts`: Contém a lógica de negócio para certificados.
- `prisma/schema.prisma`: Define o schema do banco de dados.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd SimpleCert
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o banco de dados no arquivo `.env`:
   ```
   DATABASE_URL="mysql://root:Prog3crud@localhost:3306/simplecert_db"
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. Inicie o servidor:
   ```bash
   npm run dev
   ```

## Uso

- A API estará disponível em `http://localhost:3100`.

## Endpoints

### Usuários

- `POST /users`: Cria um novo usuário.
  - Body:
    ```json
    {
      "name": "Nome do Usuário",
      "email": "email@example.com",
      "password": "senha123"
    }
    ```

### Certificados

- `POST /certificates`: Cria um novo certificado.
  - Body:
    ```json
    {
      "titulo": "Título do Certificado",
      "tipo": "Tipo do Certificado",
      "horas": 10,
      "data": "2024-07-14T00:00:00.000Z",
      "participante": "Nome do Participante",
      "participacao": "Tipo de Participação",
      "userId": "ID do Usuário"
    }
    ```

- `GET /certificates`: Retorna todos os certificados.
- `GET /certificates/:id`: Retorna um certificado pelo ID.
- `PUT /certificates/:id`: Atualiza um certificado pelo ID.
  - Body:
    ```json
    {
      "titulo": "Título do Certificado",
      "tipo": "Tipo do Certificado",
      "horas": 10,
      "data": "2024-07-14T00:00:00.000Z",
      "participante": "Nome do Participante",
      "participacao": "Tipo de Participação",
      "userId": "ID do Usuário"
    }
    ```
- `DELETE /certificates/:id`: Deleta um certificado pelo ID.

## Autenticação

- Todas as operações de criação, atualização e exclusão de certificados requerem autenticação.
- O cabeçalho `email` deve ser enviado com o email do usuário autenticado para autenticação.

```json
{
  "headers": {
    "email": "email@example.com"
  }
}
```

## Tecnologias Utilizadas

- Node.js
- Fastify
- Prisma
- MySQL

## Contribuição

- Sinta-se à vontade para contribuir com o projeto. Basta abrir um pull request com suas mudanças.

## Licença

- Este projeto está licenciado sob a licença MIT.

---

Esse README reflete as configurações e funcionalidades atuais da sua API, incluindo as mudanças nos diretórios e nas dependências do projeto. Se precisar de mais alguma alteração, estou à disposição!