export const stateList: { [key: string]: [string, string] } = {
    "0": ["Cancelado", "bg-gray-300"],
    "10": ["Pendiente de Pago", "bg-red-300"], //pendiente de pago
    "20": ["En espera de confirmación", "bg-orange-300"], //recibido
    "25": ["En espera de envio", "bg-yellow-300"], //enviado
    "30": ["Enviado", "bg-green-300"], //confirmado
    "40": ["Entregado", "bg-blue-300"], //entregado
  };