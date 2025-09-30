import { Schema } from 'mongoose';

export const InvoiceSchema = new Schema(
  {
    invoice_id: {
      type: String,
    },

    customer: {
      name: String,
      email: String,
      phone_number: String,
    },

    due_date: {
      type: Date,
    },

    amount: {
      type: Number,
    },

    tax: {
      type: Number,
    },

    discount: {
      type: Number,
    },

    currency: {
      type: String,
    },

    status: {
      type: String,
      enum: ['draft', 'sent', 'paid', 'overdue'],
      default: 'draft',
    },

    invoice_number: {
      type: String,
    },

    additional_info: {
      type: String,
    },

    items: [
      {
        vehicle_model: {
          type: String,
        },
        vehicle_color: {
          type: String,
        },
        vehicle_amount: {
          type: Number,
        },
        vehicle_year: {
          type: Number,
        },
        vehicle_image: {
          type: String,
        },
        vehicle_make: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);
