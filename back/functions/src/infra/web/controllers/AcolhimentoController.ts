import { Request, Response } from "express";
import { IAcolhimentoService } from "../../../domain/interfaces/IAcolhimentoService";
import { createResponse } from "../../../utils/CreateResponse";

export class AcolhimentoController {
  constructor(private service: IAcolhimentoService) {}

  listAcolhimentos = async (req: Request, res: Response): Promise<void> => {
    try {
      const { queryOptions } = req.body;

      const { data, lastDocRef } = await this.service.list(queryOptions);
      createResponse(res, 200, { data: { data, lastDocId: lastDocRef } });
    } catch (error: any) {
      createResponse(res, 500, { message: error.message });
    }
  };

  getAcolhimentoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const acolhimento = await this.service.getById(req.params.id);
      if (acolhimento) {
        res.json(acolhimento);
      } else {
        createResponse(res, 404, { message: "Acolhimento não encontrado" });
      }
    } catch (error: any) {
      createResponse(res, 500, { message: error.message });
    }
  };

  createAcolhimento = async (req: Request, res: Response): Promise<void> => {
    try {
      const acolhimento = await this.service.create(req.body);
      if (acolhimento) {
        res.status(201).json(acolhimento);
      } else {
        createResponse(res, 500, { message: "Erro ao criar acolhimento" });
      }
    } catch (error: any) {
      createResponse(res, 500, { message: error.message });
    }
  };

  updateAcolhimento = async (req: Request, res: Response): Promise<void> => {
    try {
      const acolhimento = await this.service.update(req.params.id, req.body);
      if (acolhimento) {
        res.json(acolhimento);
      } else {
        createResponse(res, 500, { message: "Erro ao atualizar acolhimento" });
      }
    } catch (error: any) {
      createResponse(res, 500, { message: error.message });
    }
  };

  deleteAcolhimento = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.service.delete(req.params.id);
      createResponse(res, 204, {});
    } catch (error: any) {
      createResponse(res, 500, { message: error.message });
    }
  };
}
