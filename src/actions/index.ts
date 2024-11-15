import { actions, defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  checkStock: defineAction({
    input: z.string(),
    handler: async (input, context): Promise<boolean> => {
      try {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              Math.random() < 0.2 ? resolve(false) : resolve(true);
              // resolve(true);
            } catch (error) {
              reject(error);
            }
          }, 2000);
        });
      } catch (error) {
        console.error('Error checking stock:', error);
        throw error; // O manejar el error de otra manera según tus necesidades
      }
    }
  }),
  addToCart: defineAction({
    input: z.string(),
    handler: async (input, context) => {
      try {
        // Verificar el stock del producto en el backend
        const {data, error} = await actions.checkStock(input);
        console.log('stockAvailable', data);
        if (!error && data) {
          // Agregar el producto al carrito
          
          console.log('item añadido');
          return true;
        } else {
          // Mostrar un mensaje de error indicando que no hay stock disponible
          console.log('Lo sentimos, no hay stock disponible de este producto.');
          return false;
        }
      } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        throw error;
        // Manejar el error apropiadamente, como mostrar un mensaje de error al usuario
      }

    }
  }),
}