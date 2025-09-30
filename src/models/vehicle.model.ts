import { Schema } from 'mongoose';

export const VehicleSchema: Schema = new Schema(
  {
    vehicle_model: {
      type: String,
    },
    vehicle_make: {
      type: String,
    },
    vehicle_color: {
      type: String,
    },
    vehicle_year: {
      type: Number,
    },
    vehicle_amount: {
      type: Number,
    },
    vehicle_image: {
      type: String,
    },
  },
  { timestamps: true },
);
