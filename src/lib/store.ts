import { writable } from 'svelte/store';
import type { Car } from './cars';

// Initialize with some default cars
const initialCars: Car[] = [
  { id: 1, marca: "Toyota", model: "Corolla", an: 2022, motor: 1800 },
  { id: 2, marca: "Honda", model: "Civic", an: 2021, motor: 1500 },
  { id: 3, marca: "Ford", model: "Focus", an: 2023, motor: 1600 },
  { id: 4, marca: "Volkswagen", model: "Golf", an: 2022, motor: 1400 },
  { id: 5, marca: "BMW", model: "3 Series", an: 2023, motor: 2000 },
];

export const cars = writable<Car[]>(initialCars);
