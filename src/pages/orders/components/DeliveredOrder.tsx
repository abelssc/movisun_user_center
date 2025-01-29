type Order={
  email:boolean
}


const DeliveredOrder = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-50">
        Marcar como entregado
      </h1>
      <form>
        <div className="mb-4">
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Envío de correo automático
            </span>
          </label>
          <p className="text-gray-400 text-xs max-w-80">
            El sistema enviara un correo automático al cliente al guardar el
            formulario
          </p>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
          >
            Guardar
          </button>
        </div>
      </form>
    </>
  );
};

export default DeliveredOrder;
