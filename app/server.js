const createError = require("http-errors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocJs = require("swagger-jsdoc");
const { AllRoutes } = require("./router/router.routes");
const cors = require("cors");
const express = require("express");
module.exports = class Server {
  #app = express();
  constructor(PORT) {
    this.configApplications(PORT);
    this.createServer(PORT);
    this.configDataBase();
    this.createRouter();
    this.errorHandling();
  }
  configApplications(PORT) {
    const morgan = require("morgan");
    const path = require("path");
    this.#app.use(morgan("dev"));
    this.#app.use(cors())
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.json());
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUi.serve,
      swaggerUi.setup(
        swaggerDocJs({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "سایت آموزشی",
              version: "1.0.0",
            },
            servers: [
              {
                url: `https://saberzarei.iran.liara.run/`,
              },
            ],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            security: [{ BearerAuth: [] }],
          },
          apis: ["./app/router/**/*.js"],
        }),
        { explorer: true }
      )
    );
  }
  createServer(PORT) {
    this.#app.listen(PORT, () => console.log("Server is Running"));
    this.#app.use(
      cors({
        origin: "*",
      })
    );
  }
  async configDataBase() {
    const mongoose = require("mongoose");
    mongoose.set("strictQuery", true);
    mongoose
      .connect(process.env.DATABASE_URL, {
        authSource: "admin",
      })
      .then(console.log("connect"))
      .catch((e) => console.log(e));
    process.on("SIGBREAK", async () => {
      await connection.close();
      process.exit(0);
    });
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createError.NotFound("صفحه ی مورد نظر پدا نشد"));
    });
    // this.#app.use((req, res, next, error) => {
    //   const serverError = createError.InternalServerError();
    //   const statusCode = error?.status || error?.code || serverError.status;
    //   const message = error?.message || serverError.message;
    //   return res.status(statusCode).json({
    //     data: {
    //       statusCode,
    //       message,
    //     },
    //   });
    // });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statusCode).json({
        statusCode,
        message
      });
    });
  }
  createRouter() {
    this.#app.use(AllRoutes);
  }
};
