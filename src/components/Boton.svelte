<script lang="ts">
  let {id , children} = $props();
  import { actions } from 'astro:actions';
  import { addToCartStore } from '@/lib/cartStore';
  // Aquí puedes definir la función que conectará con tu acción de Astro
  async function handleClick() {
    try {
      // Aquí iría tu lógica específica de Astro
      // Por ejemplo:
      // await astro.doSomething();
      const {data, error} = await actions.addToCart(id);
      console.log('Botón clickeado '+ id);
      const product = { name: id, slug: id, gallery: ["http://www.google.es"],description: "", price: 10.95, stock: 1, categories: [], active: true, featured: false};
      const res = await addToCartStore(product, 1 );
      res? alert("item añadido "+id) : alert("fallo añadir item "+id);
    } catch (error) {
      console.error('Error:', error);
    }
  }
</script>
<button 
  onclick={handleClick}
>
{@render children()}

</button>