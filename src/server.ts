import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { fastifyCookie } from "@fastify/cookie";
import { fastifyCors } from "@fastify/cors";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { routes } from "./http/routes";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import env from "./env";
import fastifyJwt, { FastifyJWT } from "@fastify/jwt";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCookie);
app.register(fastifyCors, { origin: "*" });
app.register(fastifyJwt, { secret: env.SECRET });
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "CashPilot API",
      description: "API for requests CashPilot resources",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, { routePrefix: "/docs" });

app.register(routes);

// Persist jwt on each request
app.addHook("preHandler", (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});

app.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token;
    if (!token) {
      return reply.status(401).send({ message: "O usuário não autenticado!" });
    }
    const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
    req.user = decoded;
  }
);

app.listen({ port: env.PORT }).then(() => {
  console.log("HTTP Server is running!");
});
