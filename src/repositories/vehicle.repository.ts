import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IVehicleDocument } from 'src/interfaces/vehicle.interface';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectModel('Vehicle')
    private readonly vehicleModel: Model<IVehicleDocument>,
  ) {}

  async create(
    record: {
      vehicle_model: string;
      vehicle_make: string;
      vehicle_color: string;
      vehicle_amount: number;
      vehicle_image: string;
      vehicle_year: number;
    },
    session: any = null,
  ): Promise<IVehicleDocument> {
    const [createdRecord] = await this.vehicleModel.create([record], {
      session,
    });
    return createdRecord;
  }

  async getOne(
    query: FilterQuery<IVehicleDocument>,
  ): Promise<IVehicleDocument> {
    return this.vehicleModel.findOne(query);
  }

  async getAll(
    query: FilterQuery<IVehicleDocument>,
  ): Promise<IVehicleDocument[]> {
    return this.vehicleModel.find(query);
  }

  async aggregate(query: any): Promise<IVehicleDocument[]> {
    return this.vehicleModel.aggregate(query);
  }

  async countDocuments(query: FilterQuery<IVehicleDocument>): Promise<number> {
    return this.vehicleModel.countDocuments(query);
  }

  async atomicUpdate(
    query: FilterQuery<IVehicleDocument>,
    record: UpdateQuery<IVehicleDocument>,
    session: any = null,
  ) {
    return this.vehicleModel.findOneAndUpdate(
      { ...query },
      { ...record },
      { new: true, session },
    );
  }
}
