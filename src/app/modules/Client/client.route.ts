import { Router } from "express";
import { ClientControllers } from "./client.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { upload } from "../../../helpars/fileUploader";
import { parseBodyData } from "../../middlewares/parseBodyData";
import validateRequest from "../../middlewares/validateRequest";
import { ClientValidations } from "./client.validation";

const router = Router();

router.route("/")
 	.post(
		auth("-----"),
		upload.single("image"),
		parseBodyData,
		validateRequest(ClientValidations.createClientSchema),
		ClientControllers.createClient
	)
  .get(ClientControllers.getClients);

router
	.route("/:id")
	.get(ClientControllers.getClientById)
	.put(
		auth("-----"),
		upload.single("image"),
		parseBodyData,
		validateRequest(ClientValidations.updateClientSchema),
	    ClientControllers.updateClient)
	.delete(ClientControllers.deleteClient);

export const ClientRoutes = router;