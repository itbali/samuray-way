import request from "supertest"
import {app} from "../../src/app";
import {statusCodes} from "../../src/utils/statusCodes";

describe("test app ", () => {

	beforeEach(async () => {
		await request(app).delete("/__test__")
	});

	it("should return statusCodes.OK_200 and empty array", async () => {
		await request(app).get("/samurais/").expect(statusCodes.OK_200, [])
	})
	it("should create samurai with correct data", async () => {
		const createdSamuraiResponse = await request(app)
			.post("/samurais/")
			.send({name: "Kenshin"})
			.expect(statusCodes.CREATED_201)

		expect(createdSamuraiResponse.body).toEqual({
			message: "Samurai created",
			samurai: {
				id: expect.any(Number),
				name: "Kenshin"
			}
		})

		const allSamuraisResponse = await request(app).get("/samurais/").expect(statusCodes.OK_200)
		expect(allSamuraisResponse.body).toEqual([{
			id: expect.any(Number),
			name: "Kenshin"
		}])

	})
	it("should return statusCodes.BAD_REQUEST_400 if samurai name is empty", async () => {
		await request(app)
			.post("/samurais/")
			.send({name: ""})
			.expect(statusCodes.BAD_REQUEST_400, {
				message: "Error: Samurai name is required"
			})
	})
	it("should update samurai with correct data", async () => {
		const createdSamuraiResponse = await request(app)
			.post("/samurais/")
			.send({name: "Kenshin"})
			.expect(statusCodes.CREATED_201)

		const updatedSamuraiResponse = await request(app)
			.put(`/samurais/${createdSamuraiResponse.body.samurai.id}`)
			.send({name: "Kenshin Himura"})
			.expect(statusCodes.OK_200)

		expect(updatedSamuraiResponse.body).toEqual({
			message: "Samurai updated",
			samurai: {
				id: expect.any(Number),
				name: "Kenshin Himura"
			}
		})

		const allSamuraisResponse = await request(app).get("/samurais/").expect(statusCodes.OK_200)
		expect(allSamuraisResponse.body).toEqual([{
			id: expect.any(Number),
			name: "Kenshin Himura"
		}])
	})
	it("should return statusCodes.NOT_FOUND_404 if samurai is not found", async () => {
		await request(app)
			.put("/samurais/999")
			.send({name: "Kenshin Himura"})
			.expect(statusCodes.NOT_FOUND_404, {
				message: "Samurai with this id not found"
			})
	})
	it("should return statusCodes.BAD_REQUEST_400 if samurai name is empty", async () => {
		const createdSamuraiResponse = await request(app)
			.post("/samurais/")
			.send({name: "Kenshin"})
			.expect(statusCodes.CREATED_201)

		await request(app)
			.put(`/samurais/${createdSamuraiResponse.body.samurai.id}`)
			.send({name: ""})
			.expect(statusCodes.BAD_REQUEST_400, {
				message: "Error: Samurai name is required"
			})
	})
	it("should delete samurai", async () => {
		const createdSamuraiResponse = await request(app)
			.post("/samurais/")
			.send({name: "Kenshin"})
			.expect(statusCodes.CREATED_201)

		const deletedSamuraiResponse = await request(app)
			.delete(`/samurais/${createdSamuraiResponse.body.samurai.id}`)
			.expect(statusCodes.OK_200)

		expect(deletedSamuraiResponse.body).toEqual({
			message: "Samurai deleted",
			samurai: {
				id: expect.any(Number),
				name: "Kenshin"
			}
		})

		const allSamuraisResponse = await request(app).get("/samurais/").expect(statusCodes.OK_200)
		expect(allSamuraisResponse.body).toEqual([])
	})
	it("should return statusCodes.NOT_FOUND_404 if samurai is not found", async () => {
		await request(app)
			.delete("/samurais/999")
			.expect(statusCodes.NOT_FOUND_404, {
				message: "Samurai with this id not found"
			})
	})
	it("should return statusCodes.METHOD_NOT_ALLOWED_405 if method is not allowed", async () => {
		await request(app)
			.delete("/samurais/")
			.expect(statusCodes.METHOD_NOT_ALLOWED_405, {
				message: "Method not allowed"
			})
	})
	it("should return statusCodes.METHOD_NOT_ALLOWED_405 if method is not allowed", async () => {
		await request(app)
			.put("/samurais/")
			.expect(statusCodes.METHOD_NOT_ALLOWED_405, {
				message: "Method not allowed"
			})
	})
})
