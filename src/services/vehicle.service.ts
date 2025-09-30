/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { VehicleRepository } from 'src/repositories/vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(
    @Inject(VehicleRepository)
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  async getAllVehicles({ search }: { search?: string }) {
    const query: any = {};
    if (search) {
      query.$or = [
        { vehicle_model: new RegExp(search, 'i') },
        { vehicle_make: new RegExp(search, 'i') },
        { vehicle_color: new RegExp(search, 'i') },
        { vehicle_year: new RegExp(search, 'i') },
      ];
    }

    const vehicles = await this.vehicleRepository.aggregate([
      { $match: query },
      { $sort: { createdAt: -1 } },
    ]);

    return {
      success: true,
      code: HttpStatus.OK,
      message: `Invoices fetched successfully`,
      data: vehicles,
    };
  }
}
