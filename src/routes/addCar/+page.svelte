<script lang="ts">
  import { cars } from '$lib/store';
  import { goto } from '$app/navigation';
  import type { Car } from '$lib/cars';

  let marca = '';
  let model = '';
  let an = 2020;
  let motor = 1800;

  function handleSubmit() {
    const newCar: Car = {
      id: Math.floor(Math.random() * 1000), // Simple ID generation, ideally this would be more robust
      marca,
      model,
      an,
      motor,
    };

    cars.update(carList => [...carList, newCar]); // Update the store with the new car
    goto('/cars');
  }
</script>

<h1>Add Car</h1>
<form on:submit|preventDefault={handleSubmit}>
  <label>
    Marca:
    <input type="text" bind:value={marca} />
  </label>
  <label>
    Model:
    <input type="text" bind:value={model} />
  </label>
  <label>
    An:
    <input type="number" bind:value={an} />
  </label>
  <label>
    Motor:
    <input type="number" bind:value={motor} />
  </label>
  <button type="submit">Add Car</button>
</form>
