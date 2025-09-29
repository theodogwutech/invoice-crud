import * as Joi from 'joi';

export const createInvoiceValidationSchema = Joi.object({
  invoice_id: Joi.string().required(),

  customer: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().required(),
  }).required(),

  due_date: Joi.date().required(),

  amount: Joi.number().required(),
  tax: Joi.number().required(),
  discount: Joi.number().required(),
  currency: Joi.string().required(),
  status: Joi.string().valid('draft', 'paid', 'cancelled').optional(),

  invoice_number: Joi.string().required(),
  additional_info: Joi.string().optional(),

  items: Joi.array()
    .items(
      Joi.object({
        vehicle_model: Joi.string().required(),
        vehicle_make: Joi.string().required(),
        vehicle_color: Joi.string().required(),
        vehicle_amount: Joi.number().required(),
        vehicle_image: Joi.string().required(),
      }),
    )
    .min(1)
    .required(),
});
