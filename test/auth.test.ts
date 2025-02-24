import { Request, Response } from "express";
import loginHandler from "../src/controllers/authController";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

jest.mock("express-validator", () => ({
	validationResult: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
	sign: jest.fn(() => "fakeToken"),
}));

const createMockResponse = (): Response => {
	const res = {} as Response;
	res.status = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe("loginHandler", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test("deve retornar 400 quando houver erros de validação", () => {
		const req = { body: { username: "admin", password: "admin" } } as Request;
		(validationResult as unknown as jest.Mock).mockReturnValue({
			isEmpty: () => false,
			array: () => [{ msg: "Erro" }],
		});
		const res = createMockResponse();

		loginHandler(req, res, () => {});

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: "Erro" }] });
	});

	test("deve retornar 401 para credenciais inválidas", () => {
		const req = { body: { username: "wrong", password: "wrong" } } as Request;
		(validationResult as unknown as jest.Mock).mockReturnValue({
			isEmpty: () => true,
			array: () => [],
		});
		const res = createMockResponse();

		loginHandler(req, res, () => {});

		expect(res.status).toHaveBeenCalledWith(401);
		expect(res.json).toHaveBeenCalledWith({ error: "Credenciais inválidas." });
	});

	test("deve retornar token para credenciais válidas", () => {
		const req = { body: { username: "admin", password: "admin" } } as Request;
		(validationResult as unknown as jest.Mock).mockReturnValue({
			isEmpty: () => true,
			array: () => [],
		});
		const res = createMockResponse();
		process.env.JWT_SECRET = "testsecret";

		loginHandler(req, res, () => {});

		expect(jwt.sign).toHaveBeenCalledWith(
			{ username: "admin" },
			"testsecret",
			{ expiresIn: "1h" }
		);
		expect(res.json).toHaveBeenCalledWith({ token: "fakeToken" });
	});
});
