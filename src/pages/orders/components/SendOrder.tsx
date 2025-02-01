import { useEffect, useState } from "react";
import { useOrder } from "../../../context/OrderContext";
import clientAxios from "../../../config/axios";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
import { toHumanDate } from "../../../utils/helpers";

type Order = {
  shipping_date: string;
  shipping_company: string;
  shipping_guide: string;
  shipping_url: string;
  note: string;
};

const SendOrder = () => {
  const { order, setOrder, setCurrentStep } = useOrder();
  const send_order = order?.send_order;
  const [formData, setFormData] = useState<Order>({
    shipping_date: "",
    shipping_company: "",
    shipping_guide: "",
    shipping_url: "",
    note: "",
    ...send_order,
  });
  const [isLoading,setIsLoading]= useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const today = new Date().toISOString().split("T")[0];

  // Actualizar el estado si `order` cambia
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...send_order }));
  }, [send_order]);

  // Manejar cambios en los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Manejo del submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: {
      shipping_date?: string;
      shipping_company?: string;
    } = {};
    if (!formData.shipping_date)
      newErrors.shipping_date = "Este campo es obligatorio";
    if (!formData.shipping_company)
      newErrors.shipping_company = "Este campo es obligatorio";

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;
    if (!order) return;
    setIsLoading(true);

    toast.promise(
      clientAxios.put(`/send_order/${order.order_id}`, formData)
        .then(({ data }) => {
          setOrder(data);
          return "¡Pedido enviado con éxito!";
        })
        .catch(() => {
          setErrors({ error: "Hubo un error" });
          throw new Error("Error al enviar el pedido");
        })
        .finally(() => {
          setIsLoading(false); // Habilita el formulario nuevamente
        }),
      {
        pending: "Guardando datos y enviado correo al cliente...",
        success: "Pedido enviado con éxito 🎉",
        error: "Error al enviar el pedido ❌",
      },{
        theme:'dark'
      }
    );
  };
  console.log(formData.shipping_date);
  

  const sendMsgToWhatsapp = () => {
    if (!order || !order.send_order) return;

    const message = `
    🚀*¡Tu pedido está en camino!*🚀

    🛍️ *Pedido N°:* ${order.order_sn}
    📅 *Fecha estimada de entrega:* ${toHumanDate(order.send_order.shipping_date)}

    📦 Sigue el estado de tu pedido en tiempo real aquí:
    🔗 [www.movisunshop.com]

    ¡Gracias por tu compra! Si tienes alguna consulta, estamos aquí para ayudarte.`;
    
    const encodedMessage = encodeURIComponent(message);
    const url="https://web.whatsapp.com/send/?phone=51995765034&text="+encodedMessage;
    window.open(url, "_blank");
};


  return (
    <>
        {/* back button */}
        <button
          onClick={() => setCurrentStep(25)}
          className="text-lg text-gray-500 dark:text-gray-50 flex items-center gap-2"
        >
          <GrFormPreviousLink />
        </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-50">
        Enviar Pedido
      </h1>
      {errors.error && <p className="text-red-500 text-sm">{errors.error}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={order?.order_state !== "25"}
          className={
            order?.order_state !== "25" ? "opacity-50 pointer-events-none" : ""
          }
        >
          <div className="mb-4">
            <label className="block text-sm text-gray-600 dark:text-gray-50">
            <span className="text-red-500 ml-1">*</span> Fecha estimada de llegada al cliente
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
              name="shipping_date"
              value={formData.shipping_date}
              onChange={handleChange}
              min={today}
            />
            {errors.shipping_date && (
              <p className="text-red-500 text-sm">{errors.shipping_date}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-sm text-gray-600 dark:text-gray-50"
              htmlFor="shipping_company"
            >
               <span className="text-red-500 ml-1">*</span> Transportista/Empresa de envío
            </label>
            <input
              type="text"
              id="shipping_company"
              name="shipping_company"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
              placeholder="Ingrese la empresa de envío"
              list="shipping_company_list"
              value={formData.shipping_company}
              onChange={handleChange}
            />
            {errors.shipping_company && (
              <p className="text-red-500 text-sm">{errors.shipping_company}</p>
            )}
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
              value={formData.shipping_guide}
              onChange={handleChange}
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
              value={formData.shipping_url}
              onChange={handleChange}
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
              value={formData.note}
              onChange={handleChange}
            ></textarea>
            <p className="text-xs text-gray-400 max-w-80">
              Estas observaciones son para procesos internos. El cliente no recibira este detalle.
            </p>
          </div>
        </fieldset>
        {/* Botón de enviar */}
        <div className="mb-4">
          {order?.order_state === "25" ? (
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {
                isLoading?"Guardando ...":"Guardar"
              }
            </button>
          ) : (
           <div className="flex justify-between">
             <button
              type="button"
              onClick={() => setCurrentStep(40)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-200"
            >
              <GrFormNextLink size={24} />
            </button>
            <button
              type="button"
              onClick={()=>sendMsgToWhatsapp()}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 hover:scale-110 transition-all duration-200"
              title="Enviar Mensaje de envio al cliente"
            >
              <FaWhatsapp size={24}/>
            </button>
           
           </div>
          )}
        </div>
      </form>
    </>
  );
};

export default SendOrder;
