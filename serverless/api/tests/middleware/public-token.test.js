const { publicToken } = require("../../middleware");
const { Response } = require("jest-express/lib/response");
const { payzenInfoService } = require("../../services");

jest.mock("../../services/appSync");
const next = jest.fn();
let res;

describe("Public Token Middleware", () => {
  beforeEach(() => {
    res = new Response();
    payzenInfoService.searchPayzenInfo.mockResolvedValue(undefined);
  });

  test("should return 401 if does not have auth token", async () => {
    const req = { headers: {} };

    await publicToken(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalled();
  });

  test("should return 401 if token is invalid", async () => {
    const req = {
      headers: {
        "x-public-key": "000"
      }
    };

    await publicToken(req, res, next);

    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalled();
  });

  test("should continue if token is ok", async () => {
    payzenInfoService.searchPayzenInfo.mockResolvedValue([null, { searchPayzenInfo: { items: [{ id: "321", token: "111" }] } }]);
    const req = {
      headers: {
        "x-public-key": "123"
      }
    };

    await publicToken(req, res, next);

    expect(res.status).not.toBeCalled();
    expect(next).toBeCalled();
  });
});
