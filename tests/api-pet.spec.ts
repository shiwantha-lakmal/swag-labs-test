import { test, expect } from '@playwright/test';
import { PetClient } from '../src/api/PetClient';
import { TestDataConfig } from '../src/config/data.config';

/**
 * @description
 * Assignment 2: Pet Store API Test Suite
 * Pet Store API Test Suite
 * Tests the pet management endpoints
 */
test.describe('Pet Store API Tests', () => {
  let petClient: PetClient;
  let globalPetId: number;
  test.beforeEach(async () => {
    petClient = new PetClient();
    await petClient.setup();
  });

  test('should create and fetch a pet by ID', async () => {
    
    const newPet = TestDataConfig.generatePetPayload();  // <- Create a new pet
    const createdPet = await petClient.addNewPet(newPet);
    globalPetId = createdPet.id!;
    expect(createdPet.name).toBe(newPet.name);
    expect(createdPet.status).toBe(newPet.status);

    await new Promise(resolve => setTimeout(resolve, 2000)); // <- Wait ftill system updated

    const fetchedPet = await petClient.getPetById(createdPet.id!); // <- Fetch the pet by ID
    
    expect(fetchedPet.id).toBe(createdPet.id); // <- Verify fetched pet matches against created pet
    expect(fetchedPet.name).toBe(createdPet.name);
    expect(fetchedPet.status).toBe(createdPet.status);
    expect(fetchedPet.category?.name).toBe(createdPet.category?.name);
  });

  test('should fetch all pending pets and verify status', async () => {
    const pendingPets = await petClient.findPetsByStatus('pending');
    
    expect(pendingPets).toBeDefined(); // <- Verify response
    pendingPets.forEach(pet => {
      expect(pet.status).toBe('pending');
      expect(pet.id).toBeTruthy();
    });
  });
});
