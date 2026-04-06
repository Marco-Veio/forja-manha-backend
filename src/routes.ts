import { Router } from "express";

import { authentication } from "./middlewares/authentication";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";
import matriculasController from "./controllers/matriculas";
import funcionariosController from "./controllers/funcionarios";

const routes = Router();

routes.get("/", (request, response) =>
  response.status(200).json({ success: true }),
);

// Rotas de alunos
//routes.get("/alunos", (request, response) =>
//  alunosController.list(request, response),
//);
routes.get("/alunos", authentication, alunosController.list);
routes.get("/alunos/:id", authentication, alunosController.getById);
routes.post("/alunos", authentication, alunosController.create);
routes.put("/alunos/:id", authentication, alunosController.update);
routes.delete("/alunos/:id", authentication, alunosController.delete);

// Rotas de cursos
routes.get("/cursos", authentication, cursosController.list);
routes.get("/cursos/:id", authentication, cursosController.getById);
routes.post("/cursos", authentication, cursosController.create);
routes.put("/cursos/:id", authentication, cursosController.update);
routes.delete("/cursos/:id", authentication, cursosController.delete);

// Rotas de matrículas
routes.post("/matriculas/:id", authentication, matriculasController.create);
routes.delete("/matriculas/:id", authentication, matriculasController.delete);

// Rotas de funcionários
routes.post("/funcionarios/login", funcionariosController.login);
routes.get("/funcionarios", authentication, funcionariosController.list);
routes.get("/funcionarios/:id", authentication, funcionariosController.getById);
routes.post("/funcionarios", authentication, funcionariosController.create);
routes.put("/funcionarios/:id", authentication, funcionariosController.update);
routes.delete(
  "/funcionarios/:id",
  authentication,
  funcionariosController.delete,
);

export default routes;
