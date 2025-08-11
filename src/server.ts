import fastify from "fastify";
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

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCookie);
app.register(fastifyCors, { origin: "*" });

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

app.listen({ port: env.PORT }).then(() => {
  console.log("HTTP Server is running!");
});
