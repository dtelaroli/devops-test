const request = require("supertest");
const app = require("../../app");
const { paymentOrderFormService, payzenService } = require("../../services");
const { errorHandler } = require("../../middleware");

jest.mock("../../middleware/auth", () =>
  jest.fn((req, res, next) => {
    req.payzenInfo = {
      accountId: "32761142000168",
      clientNotificationUrl: "test",
      id: "test",
      notificationCode: "test",
      notificationUrl: "test",
      publicKey: "test",
      status: "ACTIVE",
      token: "test"
    };
    next();
  })
);

jest.mock("../../middleware/public-token", () =>
  jest.fn((req, res, next) => {
    req.payzenInfo = {
      accountId: "32761142000168",
      clientNotificationUrl: "test",
      id: "test",
      notificationCode: "test",
      notificationUrl: "test",
      publicKey: "test",
      status: "ACTIVE",
      token: "test"
    };
    next();
  })
);

jest.mock("../../middleware/error-handler", () =>
  jest.fn((e, req, res, next) => {
    res.status(400).json({ statusCode: 400, message: "" });
  })
);
jest.mock("../../services");

describe("Post Endpoints", () => {
  it("should create form payment with sucess", async () => {
    payzenService.chargeCreatePayment.mockResolvedValue({
      answer: {
        formToken: "teste"
      }
    });
    paymentOrderFormService.createPaymentOrderForm.mockResolvedValue({
      id: "teste"
    });
    const body = {
      amount: "2500"
    };
    const res = await request(app)
      .post("/v1/payment/form")
      .send(body);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("publicKey");
    expect(res.body).toHaveProperty("formToken");
    expect(res.body).toHaveProperty("id");
  });

  it("should create a new post with empty body", async () => {
    payzenService.chargeCreatePayment.mockImplementation(() => {
      throw new Error('Test error');
    })
    const body = {};

    await request(app)
      .post("/v1/payment/form")
      .send(body);
    expect(errorHandler).toHaveBeenCalled();
  });
});


describe("Get By id", () => {
  it("want get a payment order with valid id", async () => {
    paymentOrderFormService.getPaymentOrderForm.mockResolvedValue({
      id: "teste"
    });
    const res = await request(app)
      .get("/v1/payment/form/1")
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  })

  it("want get a payment order with invalid id", async () => {
    paymentOrderFormService.getPaymentOrderForm.mockResolvedValue(null);
    const res = await request(app)
      .get("/v1/payment/form/1")
    expect(res.statusCode).toBe(404);
  })

})

describe("List payment orders", () => {
  it("want get a payment order with valid id", async () => {
    /* paymentOrderFormService.getPaymentOrderForm.mockResolvedValue({
      id: "teste"
    }); */
    const res = await request(app)
      .get("/v1/payment/form/")
    expect(res.statusCode).toBe(200);
    //expect(res.body).toHaveProperty("id");
  })
/* 
  it("want get a payment order with invalid id", async () => {
    paymentOrderFormService.getPaymentOrderForm.mockResolvedValue(null);
    const res = await request(app)
      .get("/v1/payment/form/1")
    expect(res.statusCode).toBe(404);
  })
 */
})
