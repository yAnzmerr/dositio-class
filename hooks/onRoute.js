/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function onRouteHook(app, options) {
    const logMe = async (request, reply) => {
        request.log.info(`Request for url: ${request.url}.`);
    };

    app.addHook('onRoute', (routeOptions) => {
        if(routeOptions.config?.logMe){
            if(routeOptions.onRequest && !Array.isArray(routeOptions.onRequest)){
                routeOptions.onRequest = [routeOptions.onRequest];
            }else{
                routeOptions.onRequest = [];
            }
            routeOptions.onRequest.push(logMe);
        }
    });
}