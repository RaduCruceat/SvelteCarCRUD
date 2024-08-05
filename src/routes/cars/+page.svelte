<script lang="ts">
    import { cars } from '$lib/store';
    import { goto } from '$app/navigation';
    import type { Car } from '$lib/cars';
    import { onDestroy } from 'svelte';
    import { notify } from '$lib/notificationStore';
    import Notification from '$lib/Notification.svelte';

    let carList: Car[] = [];

    const unsubscribe = cars.subscribe(value => {
        carList = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleAction(carId: number, action: string, selectElement: HTMLSelectElement) {
        if (action === 'edit') {
            goto(`/editCar/${carId}`);
        } else if (action === 'delete') {
            if (confirm('Are you sure you want to delete this car?')) {
                cars.update(carList => {
                    const updatedList = carList.filter(car => car.id !== carId);
                    if (updatedList.length < carList.length) {
                        notify('Car deleted successfully!');
                    }
                    return updatedList;
                });
            }
        }
        // Reset the dropdown after action
        selectElement.selectedIndex = 0;
    }

    function handleSelectChange(event: Event, carId: number) {
        const selectElement = event.target as HTMLSelectElement;
        if (selectElement) {
            handleAction(carId, selectElement.value, selectElement);
        }
    }

    function handleAdd() {
        goto('/addCar');
    }
</script>

  
<Notification />

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
                        <select on:change={(e) => handleSelectChange(e, car.id)}>
                            <option value="" disabled selected>Select action</option>
                            <option value="edit">Edit</option>
                            <option value="delete">Delete</option>
                        </select>
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
  
    select {
        border: 1px solid #ddd;
        padding: 4px;
    }
</style>
