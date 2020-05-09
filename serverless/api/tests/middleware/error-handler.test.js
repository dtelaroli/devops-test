const { errorHandler } = require("../../middleware");
const { Response } = require("jest-express/lib/response");

const next = jest.fn();
const err = jest.fn(() => ({
  message: ""
}));
const req = jest.fn();
let res;

describe("ErrorHandler Middleware", () => {
  beforeEach(() => {
    res = new Response();
    next.mockReset();
  });

  test("should return 400 on error catched", async () => {
    next.mockImplementation(() => {
      throw new Error("error");
    });

    await errorHandler(err, req, res, next);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalled();
  });
});
