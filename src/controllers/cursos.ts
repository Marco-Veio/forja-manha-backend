import { Request, Response } from "express";

import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default {
  list: async (request: Request, response: Response) => {
    try {
      const classes = await prisma.cursos.findMany();
      return response.status(200).json(classes);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  create: async (request: Request, response: Response) => {
    try {
      const { nome, cargaHoraria, descricao, professor } = request.body;
      const classes = await prisma.cursos.create({
        data: {
          nome,
          cargaHoraria,
          descricao,
          professor,
        },
      });
      return response.status(201).json(classes);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const classes = await prisma.cursos.findUnique({
        where: {
          id: +id,
        },
      });
      return response.status(200).json(classes);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { nome, cargaHoraria, descricao, professor } = request.body;

      const classes = await prisma.cursos.update({
        data: {
          nome,
          cargaHoraria,
          descricao,
          professor,
        },
        where: { id: +id },
      });

      return response.status(200).json(classes);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const user = await prisma.cursos.delete({
        where: {
          id: +id,
        },
      });

      return response.status(200).json(user);
    } catch (e) {
      return handleErrors(e, response);
    }
  },
};
