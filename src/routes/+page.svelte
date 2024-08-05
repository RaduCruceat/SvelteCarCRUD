<script>
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
</script>

<h1>Welcome to the Car Management App</h1>
<p><a href="/cars">View All Cars</a></p>
<p><a href="/addCar">Add New Car</a></p>

<nav>
   
    <ul>
        <li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
            <a href="/">Home</a>
        </li>
        <li aria-current={$page.url.pathname === '/cars' ? 'page' : undefined}>
            <a href="/cars">About</a>
        </li>
        <li aria-current={$page.url.pathname.startsWith('/addCar') ? 'page' : undefined}>
            <a href="/addCar">Sverdle</a>
        </li>
    </ul>
   
</nav>