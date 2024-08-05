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
  
  <div class="header">
    <h1 class="title">Cars</h1>
    <button class="add-car" on:click={handleAdd}>Add Car</button>
  </div>
  
  {#if carList.length > 0}
    <table>
      <thead>
        <tr>
          <th>Marca</th>
          <th>Model</th>
          <th>Motor</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each carList as car}
          <tr>
            <td>{car.marca}</td>
            <td>{car.model}</td>
            <td>{car.motor}</td>
            <td>{car.an}</td>
            <td>
              <button on:click={() => handleEdit(car.id)}>Edit</button>
              <button on:click={() => handleDelete(car.id)}>Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>No cars available.</p>
  {/if}
  
  <style>
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start; /* Align items at the start of the flex container */
      margin-bottom: 16px;
    }
  
    .title {
      margin: 0;
      flex: 1;
      text-align: center;
    }
  
    .add-car {
      align-self: flex-end; /* Align the button to the bottom of the flex container */
    }
  
    table {
      width: 100%;
      border-collapse: collapse;
    }
  
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
  
    th {
      background-color: #f2f2f2;
    }
  
    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  </style>
  