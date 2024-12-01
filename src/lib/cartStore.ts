import {map} from 'nanostores';
import debounce from 'lodash/debounce';

import { type CartItem, CartItemSchema, type Product, type Cart, CartSchema } from '@/types/global';


export const cart = map<Cart>({items: [], total: 0});
// export const cartStore = atom<Cart>({items: [], total: 0});



const CarToCookies = (cart: Cart) => {
  let items = "";
  let carrito:{[key: string]: number} = {};
  cart.items.map((item) => {
    const nombre = item.slug;
    if (carrito[nombre] ) {
      carrito[nombre] += item.quantity;
    }else{
      carrito[nombre] = item.quantity;
    }
    items += `${item.slug}-${item.quantity},`;
    
  });

  items += `total-${cart.total}`;
  document.cookie = `carrito=${items};path=/;max-age=604800`; // 7 días
  document.cookie = `carrito2=${JSON.stringify(carrito)};path=/;max-age=604800`; // 7 días
}

const saveToStorage = (cart: Cart ) => {
  try {
    localStorage.setItem('carrito', JSON.stringify(cart));

    CarToCookies(cart);
    // cookies.set('carrito', JSON.stringify(cart), {path: '/carrito', maxAge: 604800}); // 7 días
    // document.cookie = `carrito=${JSON.stringify(cart)};path=/;max-age=604800`; // 7 días
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

// Función debounced para sincronización
const syncCartDebounced = debounce(async (cart: Cart) => {
  console.log('🔄 Iniciando sincronización del carrito...');
  
  // Primero guardamos en storage local
  saveToStorage(cart);
  console.log('✅ Carrito guardado en storage local');
  

}, 1000); // Espera 1 segundo de inactividad

export const addToCartStore = async (product: Product, qty: number) => {
  const currentCart = cart.get();
  const cartItem : CartItem = CartItemSchema.parse({name : product.name, slug: product.slug, imageSrc: product.gallery[0], price: product.price, quantity: qty, description: product.description});

  const updatedCart = {
    items: [...currentCart.items, cartItem],
    total: currentCart.total + (cartItem.price * cartItem.quantity),
  };
  cart.set(updatedCart);
  syncCartDebounced(updatedCart);
  return true;
}
export const initializeCart = async () => {
  const savedCart = localStorage.getItem('carrito');
  if (savedCart) {
    const parsedCart = CartSchema.parse(JSON.parse(savedCart));
    cart.set(parsedCart);
    console.log('Cart restored from local storage:', parsedCart);
  }
}
