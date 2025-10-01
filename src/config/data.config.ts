import { faker } from '@faker-js/faker';

/**
 * API Payload Interfaces
 */
export interface PetPayload {
  id?: number;
  name: string;
  photoUrls: string[];
  status: 'available' | 'pending' | 'sold';
  category?: {
    id: number;
    name: string;
  };
  tags?: Array<{
    id: number;
    name: string;
  }>;
}

/**
 * Test Data Generator Configuration
 */
export class TestDataConfig {
  static generatePetPayload(overrides?: Partial<PetPayload>): PetPayload {
    const defaultPet: PetPayload = {
      id: faker.number.int({ min: 1000, max: 9999 }),
      name: faker.animal.dog(),
      photoUrls: [faker.image.url()],
      status: 'available',
      category: {
        id: faker.number.int({ min: 1, max: 100 }),
        name: faker.animal.type()
      },
      tags: [{
        id: faker.number.int({ min: 1, max: 100 }),
        name: faker.word.adjective()
      }]
    };

    return { ...defaultPet, ...overrides };
  }

  static generatePets(count: number, overrides?: Partial<PetPayload>): PetPayload[] {
    return Array.from({ length: count }, () => this.generatePetPayload(overrides));
  }

  static generatePetWithStatus(status: PetPayload['status']): PetPayload {
    return this.generatePetPayload({ status });
  }
}
