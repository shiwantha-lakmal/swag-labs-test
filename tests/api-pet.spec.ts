import { test, expect } from '@playwright/test';
import { PetClient } from '../src/api/PetClient';
import { TestDataConfig } from '../src/config/data.config';

/**
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
    // Create a new pet
    const newPet = TestDataConfig.generatePetPayload();
    const createdPet = await petClient.addNewPet(newPet);
    globalPetId = createdPet.id!;
    expect(createdPet.name).toBe(newPet.name);
    expect(createdPet.status).toBe(newPet.status);

    // Wait ftill system updated
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Fetch the pet by ID
    const fetchedPet = await petClient.getPetById(createdPet.id!);
    
    // Verify fetched pet matches against created pet
    expect(fetchedPet.id).toBe(createdPet.id);
    expect(fetchedPet.name).toBe(createdPet.name);
    expect(fetchedPet.status).toBe(createdPet.status);
    expect(fetchedPet.category?.name).toBe(createdPet.category?.name);
  });

  test('should fetch all pending pets and verify status', async () => {
    const pendingPets = await petClient.findPetsByStatus('pending');
    
    // Verify response
    expect(pendingPets).toBeDefined();
    pendingPets.forEach(pet => {
      expect(pet.status).toBe('pending');
      expect(pet.id).toBeTruthy();
    });
  });
});
