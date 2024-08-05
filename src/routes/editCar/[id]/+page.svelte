<script lang="ts">
  import { cars } from '$lib/store';
  import { goto } from '$app/navigation';
  import type { Car } from '$lib/cars';
  import { onMount } from 'svelte';
  import { notify } from '$lib/notificationStore';
  
  let car: Car | undefined;
  let id: number;

  // Validation error messages
  let errors = {
    marca: '',
    model: '',
    an: '',
    motor: ''
  };

  // Extract the id from the URL and find the car
  onMount(() => {
    id = parseInt(window.location.pathname.split('/').pop() || '', 10);
    cars.subscribe(carList => {
      car = carList.find(c => c.id === id);
    });
  });

  function validate() {
    let isValid = true;

    if (!car?.marca.trim()) {
      errors.marca = 'Marca is required.';
      isValid = false;
    } else {
      errors.marca = '';
    }

    if (!car?.model.trim()) {
      errors.model = 'Model is required.';
      isValid = false;
    } else {
      errors.model = '';
    }

    if (!car?.an || car.an < 1900 || car.an > new Date().getFullYear()) {
      errors.an = 'Year must be between 1900 and the current year.';
      isValid = false;
    } else {
      errors.an = '';
    }

    if (!car?.motor || car.motor <= 0) {
      errors.motor = 'Motor must be a positive number.';
      isValid = false;
    } else {
      errors.motor = '';
    }

    return isValid;
  }

  // Function to handle form submission
  function handleSubmit() {
    if (car && validate()) {
      cars.update(carList => {
        const index = carList.findIndex(c => c.id === id);
        if (index !== -1 && car) {
          carList[index] = car;
        }
        return carList; // Return the updated list
      });
      notify('Car updated successfully!');
      goto('/cars');
    } else {
      // Handle the case where car is not found or validation fails
      console.error('Car not found or validation failed');
    }
  }
</script>

{#if car}
  <div class="container">
    <h1>Edit Car</h1>
    <form on:submit|preventDefault={handleSubmit}>
      <div class="form-group">
        <label for="marca">Marca:</label>
        <input id="marca" type="text" bind:value={car.marca} required />
        {#if errors.marca}
          <span class="error">{errors.marca}</span>
        {/if}
      </div>
      <div class="form-group">
        <label for="model">Model:</label>
        <input id="model" type="text" bind:value={car.model} required />
        {#if errors.model}
          <span class="error">{errors.model}</span>
        {/if}
      </div>
      <div class="form-group">
        <label for="an">An:</label>
        <input id="an" type="number" bind:value={car.an} min="1900" max={new Date().getFullYear()} required />
        {#if errors.an}
          <span class="error">{errors.an}</span>
        {/if}
      </div>
      <div class="form-group">
        <label for="motor">Motor:</label>
        <input id="motor" type="number" bind:value={car.motor} min="1" required />
        {#if errors.motor}
          <span class="error">{errors.motor}</span>
        {/if}
      </div>
      <button type="submit">Save Changes</button>
    </form>
  </div>
{:else}
  <p>Loading...</p>
{/if}

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
    min-height: 100vh; /* Full viewport height */
    text-align: center;
  }

  h1 {
    margin-bottom: 1em;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 2fr; /* Two columns: label and input */
    gap: 1em; /* Space between columns and rows */
    align-items: center; /* Center align items vertically within each cell */
    max-width: 400px; /* Limit the form width */
    width: 100%;
  }

  .form-group {
    display: contents; /* Let the grid handle the layout */
  }

  label {
    display: block; /* Ensure labels are block elements */
    margin-bottom: 0.5em;
    text-align: right; /* Align label text to the right */
  }

  input {
    padding: 0.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%; /* Make inputs take full available width */
  }

  .error {
    color: red;
    font-size: 0.9em;
    margin-top: 0.5em;
    display: block;
  }

  button {
    grid-column: 1 / span 2; /* Span both columns for the button */
    padding: 0.5em 2em;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-size: 1em;
    margin-top: 1em;
  }

  button:hover {
    background-color: #0056b3;
  }
</style>
