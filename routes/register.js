import createError from "@fastify/error";
import categories from "./categories";
export default async function register(app, options){
    const InvalidRegisterError = createError('InvalidRegisterError', 'Registro Invalido', 400) 

    const register = app.mongo.db.collection('register');

    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    email: { type: 'string' },
                    password: {type: 'string'}
                },
                required: ['email', 'password']
            }
        },
        config: {
            requireAuthentication: false
        }

    
    }, async (Request, reply) => {
        let user = request.body;

        await users.insertOne(user);

        return reply.code(201).send()

    });

}