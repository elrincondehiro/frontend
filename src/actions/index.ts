import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  checkStock: defineAction({
    input: z.string(),
    handler: async (input, context): Promise<boolean> => {
      try {
        return await new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              Math.random() < 0.5 ? resolve(false) : resolve(true);
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
}