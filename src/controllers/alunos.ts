import { Request, Response } from "express";

import { prisma } from "../../config/prisma";
import { handleErrors } from "../helpers/handleErrors";

export default {
  list: async (request: Request, response: Response) => {
    try {
      const students = await prisma.alunos.findMany({
        include: { cursos: true },
      });
      return response.status(200).json(students);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  create: async (request: Request, response: Response) => {
    try {
      const { nome, cpf, email, idade } = request.body;
      const student = await prisma.alunos.create({
        data: {
          nome,
          cpf,
          email,
          idade,
        },
      });
      return response.status(201).json(student);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  getById: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const student = await prisma.alunos.findUnique({
        where: {
          id: +id,
        },
        include: {
          cursos: true,
        },
      });
      return response.status(200).json(student);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  update: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { nome, idade, email, cpf } = request.body;

      const student = await prisma.alunos.update({
        data: {
          nome,
          idade,
          email,
          cpf,
        },
        where: { id: +id },
      });

      return response.status(200).json(student);
    } catch (e) {
      return handleErrors(e, response);
    }
  },

  delete: async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const user = await prisma.alunos.delete({
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
