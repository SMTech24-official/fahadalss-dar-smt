import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ClientServices } from "./client.service";

const createClient = catchAsync(async (req, res) => {
	const result = await ClientServices.createClient(req);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Client created successfully",
		data: result,
	
	});
});
const getClients = catchAsync(async (req, res) => {
	const result = await ClientServices.getClients(req);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Clients retrieved successfully",
		data: result.data,
		meta: result.meta,
	});
});

const getClientById = catchAsync(async (req, res) => {
	const result = await ClientServices.getClientById(req.params.id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Client retrieved successfully",
		data: result,
	});
});

const updateClient = catchAsync(async (req, res) => {
	const result = await ClientServices.updateClient(req);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Client updated successfully",
		data: result,
	});
});

const deleteClient = catchAsync(async (req, res) => {
	await ClientServices.deleteClient(req);
	sendResponse(res, {
		statusCode: httpStatus.NO_CONTENT,
		success: true,
		message: "Client deleted successfully",
		data: null,
	});
});

export const ClientControllers = {
	getClients,
	getClientById,
	updateClient,
	deleteClient,
	createClient,
};