import { writable } from 'svelte/store';
import type { Car } from './cars';

// Initialize with some default cars
const initialCars: Car[] = [
  { id: 1, marca: 'Toyota', model: 'Corolla', an: 2020, motor: 1800 },
  { id: 2, marca: 'Honda', model: 'Civic', an: 2019, motor: 2000 },
];

export const cars = writable<Car[]>(initialCars);
