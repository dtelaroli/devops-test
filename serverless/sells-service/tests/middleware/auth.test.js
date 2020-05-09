const { auth } = require("../../middleware");
const { Response } = require("jest-express/lib/response");
const { payzenInfoService } = require("../../services");

jest.mock("../../services/appSync");
const next = jest.fn();
let res;

describe("Auth Middleware", () => {
  beforeEach(() => {
    res = new Response();
    payzenInfoService.getPayzenInfo.mockResolvedValue(null);
  });

  test("should return 401 if does not have auth token", async () => {
    const req = { headers: {} };

    await auth(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalled();
  });

  test("should return 401 if token is invalid", async () => {
    const req = {
      headers: {
        authorization: "Basic 123"
      }
    };

    await auth(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalled();
  });

  test("should continue if token is ok", async () => {
    payzenInfoService.getPayzenInfo.mockResolvedValue([null, { getPayzenInfo: { id: "321", token: "111" } }]);
    const req = {
      headers: {
        authorization: "Basic 321"
      }
    };

    await auth(req, res, next);

    expect(res.status).not.toBeCalled();
    expect(next).toBeCalled();
  });
});
