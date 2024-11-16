<script lang="ts">
  import { actions } from 'astro:actions';
  // Aquí puedes definir la función que conectará con tu acción de Astro
  async function handleClick() {
    try {
      // Aquí iría tu lógica específica de Astro
      // Por ejemplo:
      // await astro.doSomething();
      const {data, error} =await actions.addToCart('123');
      console.log('Botón clickeado'+data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>

<button 
  on:click={handleClick}
  class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition-colors"
>
  Ejecutar Acción
</button>