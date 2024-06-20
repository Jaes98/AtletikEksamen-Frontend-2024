interface Animal {
  id: number;
  name: string;
  star: boolean;
  cutenessFactor: number;
  animalType: animalType;
  birthdate: string;
}
interface animalType {
  id: number;
  name: string;
}

export type { Animal, animalType };