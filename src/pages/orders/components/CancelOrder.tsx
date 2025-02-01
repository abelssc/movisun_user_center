import { useEffect, useState } from "react";
import { useOrder } from "../../../context/OrderContext";
import clientAxios from "../../../config/axios";
import { GrFormPreviousLink } from "react-icons/gr";
import { toast } from "react-toastify";

type Order = {
  note: string;
};

type Step = -10 | 0 | 10 | 20 | 25 | 30 | 40;

const CancelOrder = () => {
  const { order, setOrder, setCurrentStep } = useOrder();
  const cancel_order = order?.cancel_order;

  const [formData, setFormData] = useState<Order>({
    note: "",
    ...cancel_order, // Se fusiona con `order` para asegurar valores
  });
  const [errors,setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading,setIsLoading]= useState<boolean>(false);

  // Actualizar el estado si `order` cambia
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...cancel_order }));
  }, [cancel_order]);

  // Manejo del submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors:{note?:string}={};
    if(!formData.note) newErrors.note="Este campo es obligatorio";

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;
    if (!order) return;

    setIsLoading(true);

    toast.promise(
      clientAxios.put(`/cancel_order/${order.order_id}`, formData)
        .then(({ data }) => {
          setOrder(data);
          return "Pedido cancelado!";
        })
        .catch(() => {
          setErrors({ error: "Hubo un error" });
          throw new Error("Error al eliminar el pedido");
        })
        .finally(() => {
          setIsLoading(false); // Habilita el formulario nuevamente
        }),
      {
        pending: "Guardando datos y enviado correo al cliente...",
        success: "Pedido cancelado",
        error: "Error al cancelado el pedido ❌",
      },{
        theme:'dark'
      }
    );
  };

  return (
    <>
      {/* back button */}
      <button
        onClick={() => setCurrentStep(order ? (Number(order.order_state) as Step) : 0 as Step)}
        className="text-lg text-gray-500 dark:text-gray-50 flex items-center gap-2"
      >
        <GrFormPreviousLink />
      </button>
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-50">
        Cancelar Pedido
      </h1>
      {errors.error && <p className="text-red-500 text-sm">{errors.error}</p>}
      <p className="text-sm text-gray-400">
        Al cancelar un pedido no podrás volverlo a activar.
      </p>
      <form onSubmit={handleSubmit}>
        {/* Observaciones */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 dark:text-gray-50">
            Observaciones
          </label>
          <textarea
            required
            minLength={5}
            name="note"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
            placeholder="Ingrese la razón de su cancelación"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          ></textarea>
          {errors.note &&  <p className="text-red-500 text-sm">{errors.pay_sn}</p>}
        </div>
        {
        order?.order_state !== "-10" && (
          <button 
              disabled={formData.note.length<5 || isLoading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">
            {
              isLoading?"Cancelando pedido ...":"Cancelar pedido"
            }
          </button>
        )}
      </form>
    </>
  );
};

export default CancelOrder;
