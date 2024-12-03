<script>
  import { cart } from '@/lib/cartStore';
  
  // Using $ to automatically subscribe to store changes
  $: cartItems = $cart;
</script>

<div class="cart-display">
  <h2 class="cart-title">Carrito de Compras</h2>
  {#if cartItems && cartItems.items.length > 0}
    <ul class="cart-list" aria-label="Items en carrito">
      {#each cartItems.items as item }
        <li class="cart-item">
          <span class="item-name">{item.name}</span>
          {#if item.quantity > 1}
            <span class="item-quantity">(x{item.quantity})</span>
          {/if}
        </li>
      {/each}
    </ul>
    <p class="cart-total">Total de items: {cartItems.items.length}</p>
  {:else}
    <p class="cart-empty">El carrito está vacío</p>
  {/if}
</div>

<style>
  .cart-display {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 1rem;
    color: #333;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .cart-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .cart-list {
    list-style-type: none;
    padding: 0;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 4px;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .item-name {
    font-weight: 500;
  }

  .item-quantity {
    font-size: 0.9rem;
    color: #666;
  }

  .cart-total {
    margin-top: 1rem;
    font-weight: bold;
  }

  .cart-empty {
    font-style: italic;
    color: #666;
  }
</style>