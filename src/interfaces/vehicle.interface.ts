import { Document } from 'mongoose';

export interface IVehicle {
  vehicle_model?: string;
  vehicle_make?: string;
  vehicle_color?: string;
  vehicle_year?: number;
  vehicle_amount?: number;
  vehicle_image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVehicleDocument extends Document, IVehicle {}
