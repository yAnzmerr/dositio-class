import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

describe('###Tests for Server Configuration', async(t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });

        deepEqual(options.stage, 'test');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, 'Abcd@1234');
        deepEqual(options.db_url, 'mongodb://localhost:27017/dositio');
    });
});

describe('###Tests for Unauthenticated Routes', async(t) => {
    
    describe('##Success Requests', async(t) => {
        test('# GET /products', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/products'
            });

            equal(response.statusCode, 200);
        });

        test('# GET /products/1', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/products/1'
            });

            equal(response.statusCode, 200);
        });

        test('# GET /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories'
            });

            equal(response.statusCode, 200);
        });
        
        test('# GET /categories/2/products', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories/2/products'
            });

            equal(response.statusCode, 200);
        });
    });

    describe('##Bad Requests', async(t) => {

    });
});

describe('###Tests for Authenticated routes', async(t) => {
    test('# POST /products', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/products',
            body: {
                "id": "1",
                "name": "berinjela",
                "qtd": 6,
                "category": "alimento"
            },
            headers:{
                "x-access-token": "awct23zldvp3qanuvl3w1x21pget44s.n3vyoq2brs3zpflesxue5kjp3bkw"
            }
        });

        equal(response.statusCode, 200);
    });

    test('# POST /categories', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/categories',
            body: {
                "id": "2",
                "name": "alimento",
            },
            headers:{
                "x-access-token": "awct23zldvp3qanuvl3w1x21pget44s.n3vyoq2brs3zpflesxue5kjp3bkw"
            }
        });

        equal(response.statusCode, 200);
    });

    test('# POST /register', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/register',
            body: {
                "id": "3",
                "email": "yanzr@outloock.com",
                "password": "trabalho123"
            },
        });

        equal(response.statusCode, 200);
    });

    test('# PUT /products', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'PUT',
            url: '/products/1',
            body: {
                "id": "1",
                "name": "berinjela",
                "qtd": 6,
                "category": "alimento"
            },
            headers: {
                "x-access-token": "awct23zldvp3qanuvl3w1x21pget44s.n3vyoq2brs3zpflesxue5kjp3bkw"
            }
        });

        equal(response.statusCode, 200);
    });

    test('# PUT /categories', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'PUT',
            url: '/categories/2',
            body: {
                "id": "2",
                "name": "alimento",
            },
            headers: {
                "x-access-token": "awct23zldvp3qanuvl3w1x21pget44s.n3vyoq2brs3zpflesxue5kjp3bkw"
            }
        });

        equal(response.statusCode, 200);
    });

    test('# DELETE /products/1', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'DELETE',
            url: '/products/1',
            headers: {
                "x-access-token": "awct23zldvp3qanuvl3w1x21pget44s.n3vyoq2brs3zpflesxue5kjp3bkw"
            }
        });

        equal(response.statusCode, 200);
    });

    test('# DELETE /categories/2', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'DELETE',
            url: '/categories/2',
            headers: {
                "x-access-token": "awct23zldvp3qanuvl3w1x21pget44s.n3vyoq2brs3zpflesxue5kjp3bkw"
            }
        });

        equal(response.statusCode, 200);
    });
});