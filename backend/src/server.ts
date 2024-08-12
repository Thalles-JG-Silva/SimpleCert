import Fastify from 'fastify';
import cors from '@fastify/cors';
import { certificateRoutes } from './routes/certificates.routes';
import { userRoutes } from './routes/user.routes';

const app = Fastify();

console.log('Registrando CORS...');
// Habilitando CORS para todas as origens
(async () => {
  try {
    await app.register(cors, { 
      origin: '*'
    });
    console.log('CORS registrado com sucesso');
  } catch (err: any) {
    console.error('Erro ao registrar CORS:', err);
  }
})();

console.log('Registrando rotas de usuário...');
// Registro das rotas de usuário
(async () => {
  try {
    await app.register(userRoutes, {
      prefix: '/users',
    });
    console.log('Rotas de usuário registradas com sucesso');
  } catch (err: any) {
    console.error('Erro ao registrar rotas de usuário:', err);
  }
})();

console.log('Registrando rotas de certificado...');
// Registro das rotas de certificado
(async () => {
  try {
    await app.register(certificateRoutes, {
      prefix: '/certificates',
    });
    console.log('Rotas de certificado registradas com sucesso');
  } catch (err: any) {
    console.error('Erro ao registrar rotas de certificado:', err);
  }
})();

app.get('/health', async (request, reply) => {
  return { status: 'Server is up and running!' };
});

console.log('Iniciando o servidor...');
// Inicialização do servidor
app.listen({ port: 3100 }, (err: Error | null, address: string) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
