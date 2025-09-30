import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Utils } from 'src/common/utils';
import { VEHICLE_ROUTES } from 'src/routes/vehicle.route';
import { VehicleService } from 'src/services/vehicle.service';

@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly utils: Utils,
  ) {}

  @Get(VEHICLE_ROUTES.GET_VEHICLES)
  async getInvoices(@Req() req: Request, @Res() res: Response) {
    const { search } = req.query;

    const result = await this.vehicleService.getAllVehicles({
      search: search as string,
    });

    return this.utils.apiResponse({
      res,
      success: result.success,
      code: result.code,
      message: result.message,
      data: result.data,
    });
  }
}
