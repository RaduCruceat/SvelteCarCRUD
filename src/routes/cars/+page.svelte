<script lang="ts">
  import { cars } from '$lib/store'; // Import the writable store
  import { goto } from '$app/navigation';
  import type { Car } from '$lib/cars';

  let carList: Car[] = [];

  // Subscribe to the cars store
  const unsubscribe = cars.subscribe(value => {
      carList = value;
  });

  // Clean up the subscription when the component is destroyed
  import { onDestroy } from 'svelte';
  onDestroy(() => {
      unsubscribe();
  });

  function handleDelete(id: number) {
      cars.update(carList => carList.filter(car => car.id !== id));
  }

  function handleEdit(id: number) {
      goto(`/editCar/${id}`);
  }

  function handleAdd() {
      goto('/addCar');
  }
</script>

<h1>Cars</h1>
<button on:click={handleAdd}>Add Car</button>

{#if carList.length > 0}
  <ul>
      {#each carList as car}
          <li>
              {car.marca} {car.model} {car.motor} ({car.an})
              <button on:click={() => handleEdit(car.id)}>Edit</button>
              <button on:click={() => handleDelete(car.id)}>Delete</button>
          </li>
      {/each}
  </ul>
{:else}
  <p>No cars available.</p>
{/if}
