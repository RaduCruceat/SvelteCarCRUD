<script lang="ts">
    import { cars } from '$lib/store';
    import { goto } from '$app/navigation';
    import type { Car } from '$lib/cars';
    import { onMount } from 'svelte';
  
    let car: Car | undefined;
    let id: number;
  
    // Extract the id from the URL and find the car
    onMount(() => {
      id = parseInt(window.location.pathname.split('/').pop() || '', 10);
      cars.subscribe(carList => {
        car = carList.find(c => c.id === id);
      });
    });
  
    // Function to handle form submission
    function handleSubmit() {
      if (car) {
        cars.update(carList => {
          const index = carList.findIndex(c => c.id === id);
          if (index !== -1 && car) {
            carList[index] = car;
          }
          return carList; // Return the updated list
        });
        goto('/cars');
      } else {
        // Handle the case where car is not found
        console.error('Car not found');
      }
    }
  </script>
  
  {#if car}
    <h1>Edit Car</h1>
    <form on:submit|preventDefault={handleSubmit}>
      <label>
        Marca:
        <input type="text" bind:value={car.marca} />
      </label>
      <label>
        Model:
        <input type="text" bind:value={car.model} />
      </label>
      <label>
        An:
        <input type="number" bind:value={car.an} />
      </label>
      <label>
        Motor:
        <input type="number" bind:value={car.motor} />
      </label>
      <button type="submit">Save Changes</button>
    </form>
  {:else}
    <p>Loading...</p>
  {/if}
  