import { useEffect, useState } from "react";
import ToggleSwitch from "../../../components/common/ToggleSwitch";
import clientAxios from "../../../config/axios";
import { useOrder } from "../../../context/OrderContext";
import { GrFormNextLink } from "react-icons/gr";
import { toast } from "react-toastify";

type Order = {
  pay_sn?: string;
  stock?: boolean;
  shipping_date?: string;
  note?: string;
};

const ConfirmOrder = () => {
  const { order, setOrder, setCurrentStep } = useOrder();
  const confirm_order = order?.confirm_order;
  const [formData, setFormData] = useState<Order>({
    pay_sn: "",
    stock: false,
    shipping_date: "",
    note: "",
    ...confirm_order, // Se fusiona con `order` para asegurar valores
  });
  const [isLoading,setIsLoading]= useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const today = new Date().toISOString().split("T")[0];

  // Actualizar el estado si `order` cambia
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...confirm_order }));
  }, [confirm_order]);

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
      pay_sn?: string;
      shipping_date?: string;
      stock?: string;
    } = {};
    if (!formData.pay_sn) newErrors.pay_sn = "Este campo es obligatorio";
    if (!formData.shipping_date)
      newErrors.shipping_date = "Este campo es obligatorio";
    if (!formData.stock) newErrors.stock = "Este campo es obligatorio";

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;
    if (!order) return;
    setIsLoading(true);
    toast.promise(
      clientAxios.put(`/confirm_order/${order.order_id}`, formData)
        .then(({ data }) => {
          setOrder(data);
          return "¡Orden confirmada con éxito!";
        })
        .catch(() => {
          setErrors({ error: "Hubo un error" });
          throw new Error("Error al confirmar la orden");
        })
        .finally(() => {
          setIsLoading(false); // Habilita el formulario nuevamente
        }),
      {
        pending: "Guardando datos y enviado correo al cliente...",
        success: "Pedido confirmado con éxito 🎉",
        error: "Error al confirmar el pedido ❌",
      },{
        theme:'dark'
      }
    );
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-50">
        Confirmar pedido
      </h1>
      {errors.error && <p className="text-red-500 text-sm">{errors.error}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={order?.order_state !== "20"}
          className={
            order?.order_state !== "20" ? "opacity-50 pointer-events-none" : ""
          }
        >
          {/* Validación de pago */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 dark:text-gray-50">
            <span className="text-red-500 ml-1">*</span> Validación de pago
            </label>
            <input
              type="text"
              name="pay_sn"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
              placeholder="Ingrese el n° de pago"
              value={formData.pay_sn}
              onChange={handleChange}
            />
            {errors.pay_sn && (
              <p className="text-red-500 text-sm">{errors.pay_sn}</p>
            )}
          </div>

          {/* Validación de Stock */}
          <ToggleSwitch
            name="stock"
            checked={Boolean(formData.stock)}
            onChange={handleChange}
            label="Validación de Stock"
            error={errors.stock}
            disabled={order?.order_state !== "20"}
            required={true}
          />

          {/* Fecha estimada de envío */}
          <div className="mb-4">
            <label
              className="block text-sm text-gray-600 dark:text-gray-50"
              htmlFor="shipping_date"
            >
              <span className="text-red-500 ml-1">*</span> Fecha estimada de llegada al cliente
            </label>
            <input
              type="date"
              id="shipping_date"
              name="shipping_date"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
              value={formData.shipping_date}
              onChange={handleChange}
              min={today}
            />
            {errors.shipping_date && (
              <p className="text-red-500 text-sm">{errors.shipping_date}</p>
            )}
          </div>

          {/* Observaciones */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600 dark:text-gray-50">
              Observaciones
            </label>
            <textarea
              name="note"
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
          {order?.order_state === "20" ? (
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={
                !formData.pay_sn || !formData.shipping_date || !formData.stock || isLoading
              }
            >
              {
                isLoading?"Guardando ...":"Guardar"
              }
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(30)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-200"
            >
              <GrFormNextLink size={24} />
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ConfirmOrder;
