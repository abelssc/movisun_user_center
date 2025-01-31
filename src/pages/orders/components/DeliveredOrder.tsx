import { useEffect, useState } from "react";
import { useOrder } from "../../../context/OrderContext";
import clientAxios from "../../../config/axios";
import ToggleSwitch from "../../../components/common/ToggleSwitch";
import { GrFormPreviousLink } from "react-icons/gr";
import { toast } from "react-toastify";

type Order = {
  delivered?: boolean;
  note?: string;
};

const DeliveredOrder = () => {
  const { order, setOrder, setCurrentStep } = useOrder();
  const delivered_order = order?.delivered_order;

  const [formData, setFormData] = useState<Order>({
    delivered: false,
    note: "",
    ...delivered_order,
  });
  const [isLoading,setIsLoading]= useState<boolean>(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...delivered_order }));
  }, [delivered_order]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { delivered?: string } = {};
    if (!formData.delivered) newErrors.delivered = "Este campo es obligatorio";

    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) return;
    if (!order) return;
    setIsLoading(true);

    toast.promise(
      clientAxios.put(`/delivered_order/${order.order_id}`, formData)
        .then(({ data }) => {
          setOrder(data);
          return "¡Pedido entregado con éxito!";
        })
        .catch(() => {
          setErrors({ error: "Hubo un error" });
          throw new Error("Error al entregar el pedido");
        })
        .finally(() => {
          setIsLoading(false); // Habilita el formulario nuevamente
        }),
      {
        pending: "Guardando datos y enviado correo al cliente...",
        success: "Pedido entregado con éxito 🎉",
        error: "Error al entregar el pedido ❌",
      },{
        theme:'dark'
      }
    );
  };

  return (
    <>
      {/* back button */}
      <button onClick={() => setCurrentStep(30)} 
        className="text-lg text-gray-500 dark:text-gray-50 flex items-center gap-2"
      >
        <GrFormPreviousLink />
      </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-50">
        Marcar como entregado
      </h1>
      {errors.error && <p className="text-red-500 text-sm">{errors.error}</p>}
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={order?.order_state !== "30"}
          className={
            order?.order_state !== "30" ? "opacity-50 pointer-events-none" : ""
          }
        >
          <ToggleSwitch
            name="delivered"
            checked={Boolean(formData.delivered)}
            onChange={handleChange}
            label="Entregado"
            disabled={order?.order_state !== "30"}
            error={errors.delivered}
            required={true}
          />

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
        {order?.order_state === "30" && (
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {
                isLoading?"Guardando ...":"Guardar"
              }
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default DeliveredOrder;
