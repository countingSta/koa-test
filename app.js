import Koa from "koa";
import json from "koa-json";
import logger from "koa-logger";
import path from "path";
import serve from "koa-static";
import cors from "koa2-cors";
import mongodb from './db/mongo.js';
import historyApiFallback from "koa2-history-api-fallback";
import koaRouter from "koa-router";
import koaBodyparser from "koa-bodyparser";
import routerConfig from "./routers"; //route list.

//instantiate Koa.

const app = new Koa();

app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // Allow cross domain
        }
        return ;
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));



//configure the middlewares.
//parse params in cookie string.
app.use(koaBodyparser());

//convert to JSON object.
app.use(json());

//log
app.use(logger());

//print the reponse time.
app.use(async function(ctx, next) {
    let start = new Date;
    await next();
    let ms = new Date - start;
    console.log("%s %s - %s", ctx.method, ctx.url, ms);
});

//print error log in server.
app.on("error", function(err, ctx) {
    console.log('server error', err);
});

//configure the routers and mount to Koa.
app.use(routerConfig); 

//for SPA that utilise the HTML5 History API.
app.use(historyApiFallback());

// configure the static resource directory for Koa server.
app.use(serve(path.resolve("public"))); 

//start server on port 3333
app.listen(3333, () => {
    console.log('The HTTP Server is listening in port 3333');
});

export default app;