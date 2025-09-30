import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Utils } from 'src/common/utils';
import { AppConfig } from 'src/config/app.config';
import { VehicleSchema } from 'src/models/vehicle.model';
import { VehicleController } from 'src/controllers/vehicle.controller';
import { VehicleRepository } from 'src/repositories/vehicle.repository';
import { VehicleService } from 'src/services/vehicle.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vehicle', schema: VehicleSchema }]),
  ],
  controllers: [VehicleController],
  providers: [VehicleRepository, VehicleService, Utils, AppConfig],
  exports: [MongooseModule, VehicleRepository, VehicleService],
})
export class VehicleModule {}
