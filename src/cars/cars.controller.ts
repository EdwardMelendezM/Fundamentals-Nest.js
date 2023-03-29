import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.getCars();
  }
  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.getCar(id);
  }

  @Post()
  createCar(@Body() body: any) {
    return {
      ok: true,
      body,
    };
  }

  @Patch(':id')
  updateCar(@Body() body: any) {
    return {
      ok: true,
      body,
    };
  }
  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return {
      method: 'delete',
      id,
    };
  }
}
