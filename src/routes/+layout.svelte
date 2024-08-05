<script>
    import { onMount } from 'svelte';
    import Notification from '$lib/Notification.svelte';
  </script>
  
  <Notification />
  <main>
    <slot />
  </main>
  