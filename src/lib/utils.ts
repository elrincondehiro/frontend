
//funcion para normalizar el path
export function normalizePath(path: string): string {
  // Si el path está vacío, devolvemos una barra
  if (!path) return '/';
  
  // Preservamos el protocolo si existe
  const protocolMatch = path.match(/^(https?:\/\/)/i);
  const protocol = protocolMatch ? protocolMatch[1] : '';
  
  // Si hay protocolo, lo removemos temporalmente para procesar el resto del path
  const pathWithoutProtocol = protocol ? path.slice(protocol.length) : path;
  
  // Normalizamos el path reemplazando múltiples slashes con uno solo
  const normalizedPath = pathWithoutProtocol.replace(/\/+/g, '/');
  
  // Devolvemos el path completo con el protocolo si existía
  return protocol + normalizedPath;
}