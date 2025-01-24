export function convertirTimestamp(timestamp: string | number, incluirHora = false): string {
    const fechaUTC = new Date(Number(timestamp) * 1000); // Convertir a milisegundos

    // Configuración de formato con tipado explícito
    const opciones: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Lima',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    // Agregar hora solo si incluirHora es true
    if (incluirHora) {
        opciones.hour = '2-digit';
        opciones.minute = '2-digit';
        opciones.second = '2-digit';
    }

    return fechaUTC.toLocaleString('es-PE', opciones);
}
