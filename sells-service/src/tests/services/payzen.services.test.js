const { chargeCreatePayment } = require('../../services/payzen');
const controller = require('../../controllers/form')

jest.mock('../../services/payzen');


test('test chargeCreatePayment failed', () => {

  chargeCreatePayment.mockResolvedValue({message:"Not Works"});

  expect(chargeCreatePayment("Works")).not.toEqual({message:"Works"});
});


/* test('test chargeCreatePayment success', () => {
  chargeCreatePayment.mockResolvedValue({message:"Works"});
  
  expect(chargeCreatePayment("Works")).toEqual({message:"Works"});
}); */