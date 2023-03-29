import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto';
@Injectable()
export class CarsService {
  private cars: Array<Car> = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corola',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Chevorre',
    },
  ];
  getCars() {
    return this.cars;
  }
  getCar(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);

    return car;
  }
  createCar(createCarDto: CreateCarDto) {
    const newCar: Car = { id: uuid(), ...createCarDto };
    this.cars = [...this.cars, newCar];
    return newCar;
  }
  updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.getCar(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      } else {
        return car;
      }
    });
    return carDB;
  }
  deleteCar(id: string) {
    const carDB = this.getCar(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return 'Car deleted successfully';
  }
}
