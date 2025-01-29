type Order ={
  shipping_date:string,
  shipping_company:string,
  shipping_guide:string,
  shipping_url:string,
  note:string,
  email:boolean,
}

const SendOrder = () => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-50">
        Enviar Pedido
      </h1>
      <form>
        <div className="mb-4">
          <label
            className="block text-sm text-gray-600 dark:text-gray-50"
            htmlFor="shipping_date"
          >
            Fecha y hora de salida
          </label>
          <input
            type="datetime-local"
            id="shipping_date"
            name="shipping_date"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm text-gray-600 dark:text-gray-50"
            htmlFor="shipping_company"
          >
            Transportista/Empresa de envío
          </label>
          <input
            type="text"
            id="shipping_company"
            name="shipping_company"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
            placeholder="Ingrese la empresa de envío"
            list="shipping_company_list"
          />
          <datalist id="shipping_company_list">
            <option value="InDrive" />
            <option value="Marvisur" />
            <option value="Olva Courier" />
            <option value="Shalom" />
            <option value="Uber" />
          </datalist>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm text-gray-600 dark:text-gray-50"
            htmlFor="shipping_guide"
          >
            Datos de seguimiento
          </label>
          <input
            type="text"
            id="shipping_guide"
            name="shipping_guide"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
            placeholder="Ingrese el n° de guía / código"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm text-gray-600 dark:text-gray-50"
            htmlFor="shipping_url"
          >
            URL de seguimiento
          </label>
          <input
            type="url"
            id="shipping_url"
            name="shipping_url"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
            placeholder="Ingrese la url de seguimiento"
            list="shipping_url_list"
          />
          <datalist id="shipping_url_list">
            <option value="https://rastrea.shalom.pe/" />
            <option value="https://www.expresomarvisur.com/" />
            <option value="https://www.olvacourier.com/" />
          </datalist>
        </div>
        {/* observaciones */}
        <div className="mb-4">
          <label
            className="block text-sm text-gray-600 dark:text-gray-50"
            htmlFor="note"
          >
            Observaciones
          </label>
          <textarea
            name="note"
            id="note"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
            placeholder="Ingrese alguna observación"
          ></textarea>
        </div>
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

export default SendOrder;
