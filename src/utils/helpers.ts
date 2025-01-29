export function convertirTimestamp(
    timestamp: string | number,
    incluirHora = false,
    mesCorto = true
): string {
    const fechaUTC = new Date(Number(timestamp) * 1000); // Convertir a milisegundos

    // Configuración de formato con nombres completos o abreviados de mes
    const opciones: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Lima',
        year: 'numeric',
        month: mesCorto ? 'short' : 'long', // 'short' para "ene", 'long' para "enero"
        day: 'numeric',
    };

    // Agregar hora solo si incluirHora es true
    if (incluirHora) {
        opciones.hour = '2-digit';
        opciones.minute = '2-digit';
        opciones.second = '2-digit';
        opciones.hour12 = true; // Formato de 12 horas (e.g., "2:30 p. m.")
    }

    return fechaUTC.toLocaleDateString('es-PE', opciones);
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number) {
    let timeout: ReturnType<typeof setTimeout>;
  
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
}

export function resizeImage(image: string,size='60'): string {
    const extension = image.split('.').pop();
    const name = image.split('.').shift();
    return `${name}_${size}.${extension}`;
}
  