import createError from '@fastify/error'
import { config } from 'dotenv';
export default async function categories(app, options){
    const InvalidCategoryError = createError('InvalidCategoryError', 'Categoria Inválida', 400);

    const categories = app.mongo.db.collection('categories');

    app.get('/categories', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await categories.find().toArray();
        }
    );

    app.post('/categories', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    img_url: {type: 'string'}
                },
                required: ['name', 'img_url']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let category = request.body;

        await categories.insertOne(category);

        return reply.code(201).send();
    });

    app.put('/categories/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;
        let category = request.body;

        await categories.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: category.name,
                img_url: category.img_url
            }
        });

        return reply.code(204).send();;
    });

    app.delete('/categories/:id', {
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let id =  request.params.id;

        await categories.deleteOne({_id: new app.mongo.ObjectId(id)});

        return reply.code(204).send();;
    });

    app.get('/categories/:id/products', {
        config: {
            logMe: true
            }         
        },
        async (Request, reply) =>{
            let id = request.params.id;
            let category = await categories.findeOne({id: new app.mongo.ObjectId})
            let categoryName = category.name
            let categoryProducts = await products.find({category: categoryName}).toArray();
            return categoryProducts;
        }
    );
    }

