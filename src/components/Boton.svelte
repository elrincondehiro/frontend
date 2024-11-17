<script lang="ts">
  let {id , children} = $props();
  import { actions } from 'astro:actions';
  // Aquí puedes definir la función que conectará con tu acción de Astro
  async function handleClick() {
    try {
      // Aquí iría tu lógica específica de Astro
      // Por ejemplo:
      // await astro.doSomething();
      const {data, error} = await actions.addToCart(id);
      console.log('Botón clickeado '+ id);
      data? alert("item añadido "+id) : alert("fallo añadir item "+id);
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>
<button 
  onclick={handleClick}
  class=""
>
{@render children()}

</button>