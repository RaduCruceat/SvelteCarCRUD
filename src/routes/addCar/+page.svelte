<script lang="ts">
  import { cars } from '$lib/store';
  import { goto } from '$app/navigation';
  import type { Car } from '$lib/cars';
  import { notify } from '$lib/notificationStore';

  let marca = '';
  let model = '';
  let an = 2020;
  let motor = 1800;

  // Validation error messages
  let errors = {
    marca: '',
    model: '',
    an: '',
    motor: ''
  };

  function validate() {
    let isValid = true;

    if (!marca.trim()) {
      errors.marca = 'Marca is required.';
      isValid = false;
    } else {
      errors.marca = '';
    }

    if (!model.trim()) {
      errors.model = 'Model is required.';
      isValid = false;
    } else {
      errors.model = '';
    }

    if (!an || an < 1900 || an > new Date().getFullYear()) {
      errors.an = 'Year must be between 1900 and the current year.';
      isValid = false;
    } else {
      errors.an = '';
    }

    if (!motor || motor <= 0) {
      errors.motor = 'Motor must be a positive number.';
      isValid = false;
    } else {
      errors.motor = '';
    }

    return isValid;
  }

  function handleSubmit() {
    if (validate()) {
      const newCar: Car = {
        id: Math.floor(Math.random() * 1000), // Simple ID generation, ideally this would be more robust
        marca,
        model,
        an,
        motor,
      };

      cars.update(carList => [...carList, newCar]); // Update the store with the new car
      notify('Car added successfully!');
      goto('/cars');
    }
  }
</script>

<div class="container">
  <h1>Add Car</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="marca">Marca:</label>
      <input id="marca" type="text" bind:value={marca} required />
      {#if errors.marca}
        <span class="error">{errors.marca}</span>
      {/if}
    </div>
    <div class="form-group">
      <label for="model">Model:</label>
      <input id="model" type="text" bind:value={model} required />
      {#if errors.model}
        <span class="error">{errors.model}</span>
      {/if}
    </div>
    <div class="form-group">
      <label for="an">An:</label>
      <input id="an" type="number" bind:value={an} min="1900" max={new Date().getFullYear()} required />
      {#if errors.an}
        <span class="error">{errors.an}</span>
      {/if}
    </div>
    <div class="form-group">
      <label for="motor">Motor:</label>
      <input id="motor" type="number" bind:value={motor} min="1" required />
      {#if errors.motor}
        <span class="error">{errors.motor}</span>
      {/if}
    </div>
    <button type="submit">Add Car</button>
  </form>
</div>

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
