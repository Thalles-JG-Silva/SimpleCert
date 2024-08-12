import { FastifyReply, FastifyRequest } from 'fastify';

// Middleware de autenticação
export function authMiddleware(req: FastifyRequest, reply: FastifyReply, done: Function) {
    const apiEmail = req.headers['email'];

    if (!apiEmail) {
        reply.status(401).send({
            message: 'Email is required',
        });
    } else {
        done();
    }
}
