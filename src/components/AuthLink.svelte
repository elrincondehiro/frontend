<script>
  import { onMount } from 'svelte';

  let isLoggedIn = false;

  onMount(() => {
    isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('access_token='));
  });
</script>

<a href={isLoggedIn ? "/mi-cuenta" : "/login"} class="auth-link">
  {isLoggedIn ? "Mi Cuenta" : "Log In"}
</a>

<style>
  .auth-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #4a5568;
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
  }

  .auth-link:hover {
    background-color: #2d3748;
  }
</style>