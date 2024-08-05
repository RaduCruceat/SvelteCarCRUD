<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import Notification from '$lib/Notification.svelte';
</script>
<Notification />
<h1>Welcome to the Car Management App</h1>
<button><a href="/cars">View All Cars</a></button>
