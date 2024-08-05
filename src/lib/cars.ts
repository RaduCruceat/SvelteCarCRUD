export interface Car {
    id: number;
    marca: string;
    model: string;
    an: number;
    motor: number;
  }
  
  export const cars: Car[] = [
    { id: 1, marca: 'Toyota', model: 'Corolla', an: 2020, motor: 1800 },
    { id: 2, marca: 'Honda', model: 'Civic', an: 2019, motor: 2000 },
    // Add more cars as needed
  ];
  