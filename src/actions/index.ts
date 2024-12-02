import { actions, defineAction } from 'astro:actions';
import { BACK_END_URL } from 'astro:env/client';
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
        const {data, error} = await actions.checkStock(input);
        // Verificar el stock del producto en el backend
        if (data && !error) {
          // Agregar el producto al carrito
          
          console.log('item añadido en servidor');
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
  createUser: defineAction({
    accept: 'form',
    input: z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    }),
    handler: async ({ username, email, password  }) => {
      try {

        const data = {email, username, password};
        console.log(data);
        const response = await fetch(`${BACK_END_URL}/api/auth/local/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Usuario registrado:', data);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        } else {
          console.error('Error en el registro');
          console.error(response);
          console.error(response.status);
          // Aquí puedes mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error('Error:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
      /* ... */ },
  }),
}