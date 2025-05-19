import { Request } from "express";
import prisma from "../../../shared/prisma";
import QueryBuilder from "../../../utils/queryBuilder";
import {
	clientFilterFields,
	clientInclude,
	clientNestedFilters,
	clientRangeFilter,
	clientSearchFields,
} from "./client.constant";
import config from "../../../config";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiErrors";
import { Prisma } from "@prisma/client";


const createClient = async (req: Request) => {
	const payload = req.body;
	if (req.file?.filename) {
		payload.image = `${config.backend_url}/uploads/${req.file.filename}`;
	}

	const client = await prisma.client.create({ data: payload });

	return client;
};

const getClients = async (req: Request) => {
	const queryBuilder = new QueryBuilder(req.query, prisma.client);
	const results = await queryBuilder
		.filter(clientFilterFields)
		.search(clientSearchFields)
		.nestedFilter(clientNestedFilters)
		.sort()
		.paginate()
		.include(clientInclude)
		.fields()
		.filterByRange(clientRangeFilter)
		.execute();

	const meta = await queryBuilder.countTotal();
	return { data: results, meta };
};

const getClientById = async (id: string) => {
	return prisma.client.findUnique({ where: { id } });
};

const updateClient = async (req: Request) => {
	const { id } = req.params;
	const data= req.body;
	const user = req.user;
	const role = user?.role;

	if (req.file?.filename) {
		data.documentUrl = `${config.backend_url}/uploads/${req.file.filename}`;
	}

	const whereClause: Prisma.ClientWhereUniqueInput = {
		id,
		...(role === "-----" ? { userId: user.id } : {}),
	};

	const existing = await prisma.client.findUnique({ where: whereClause });
	if (!existing) {
		throw new ApiError(httpStatus.NOT_FOUND, `Client not found with this id: ${id}`);
	}

	return prisma.client.update({
		where: whereClause,
		data: {
			...data,
		},
	});
};

const deleteClient = async (req: Request) => {
	await prisma.client.delete({ where: { id: req.params.id } });
};

export const ClientServices = {
	getClients,
	getClientById,
	updateClient,
	deleteClient,
	createClient
};