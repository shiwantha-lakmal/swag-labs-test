import { BaseClient } from './BaseClient';

import { PetPayload } from '../config/data.config';

/**
 * PetClient handles all pet-related API operations
 * API Reference: https://petstore.swagger.io/v2
 */
export class PetClient extends BaseClient {
  private apiKey: string;
  constructor() {
    super('https://petstore.swagger.io/v2');
    this.apiKey = 'special-key';
  }

  /**
   * Initialize the client
   */
  async setup(): Promise<void> {
    await this.initialize();
  }

  /**
   * Get pet by ID
   * @param petId - ID of pet to return
   * @returns Pet object
   */
  async getPetById(petId: number): Promise<PetPayload> {
    console.log(`\nFetching pet with ID: ${petId}`);
    const response = await this.get(`/pet/${petId}`);
    console.log(`Response status: ${response.status}`);
    const pet = await this.handleResponse<PetPayload>(response);
    
    // Display fetched pet details in JSON format
    console.log(`\nFetched Pet Details (ID: ${petId}):`);
    console.log(JSON.stringify({
      id: pet.id,
      name: pet.name,
      status: pet.status,
      category: pet.category?.name || 'N/A',
      tags: pet.tags?.map(tag => tag.name).join(', ') || 'N/A',
      photoUrls: pet.photoUrls.length ? 'Yes' : 'No'
    }, null, 2));
    
    return pet;
  }

  /**
   * Find pets by status
   * @param status - Status values to filter by
   * @returns Array of pets
   */
  async findPetsByStatus(status: PetPayload['status']): Promise<PetPayload[]> {
    const response = await this.get('/pet/findByStatus', { status });
    console.log(`\nStatus Code for findPetsByStatus(${status}): ${response.status}`);
    const pets = await this.handleResponse<PetPayload[]>(response);
    
    // Display fetched pets summary in JSON format
    console.log(`\nFetched Pets Summary (Status: ${status}):`);
    console.log(JSON.stringify({
      total_count: pets.length,
      status_summary: {
        available: pets.filter(p => p.status === 'available').length,
        pending: pets.filter(p => p.status === 'pending').length,
        sold: pets.filter(p => p.status === 'sold').length
      },
      pets: pets.map(pet => ({
        id: pet.id,
        name: pet.name,
        status: pet.status,
        category: pet.category?.name || 'N/A'
      }))
    }, null, 2));
    
    return pets;
  }

  /**
   * Add a new pet to the store
   * @param pet - Pet object to add
   * @returns Created pet object
   */
  async addNewPet(pet: PetPayload): Promise<PetPayload> {
    const response = await this.post('/pet', pet);
    const createdPet = await this.handleResponse<PetPayload>(response);
    
    console.log('\nNewly Created Pet Details:');
    console.log(JSON.stringify({
      id: createdPet.id,
      name: createdPet.name,
      status: createdPet.status,
      category: createdPet.category?.name || 'N/A',
      tags: createdPet.tags?.map(tag => tag.name).join(', ') || 'N/A',
      photoUrls: createdPet.photoUrls.length ? 'Yes' : 'No'
    }, null, 2));
    
    return createdPet;
  }

  /**
   * Update an existing pet
   * @param pet - Pet object to update
   * @returns Updated pet object
   */
  async updatePet(pet: PetPayload): Promise<PetPayload> {
    const response = await this.put('/pet', pet);
    return this.handleResponse<PetPayload>(response);
  }

  /**
   * Delete a pet
   * @param petId - ID of pet to delete
   */
  async deletePet(petId: number): Promise<void> {
    const response = await this.delete(`/pet/${petId}`);
    await this.handleResponse(response);
  }
}
