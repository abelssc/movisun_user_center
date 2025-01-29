import { useEffect, useState, Dispatch, SetStateAction } from "react";
import ToggleSwitch from "../../../components/common/ToggleSwitch";
import clientAxios from "../../../config/axios";

type Order = {
  pay_sn?: string;
  stock?: boolean;
  email?: boolean;
  shipping_date?: string;
  note?: string;
};

const ConfirmOrder = ({ order,order_id, setOrder }: { order: Order,order_id: string, setOrder:Dispatch<SetStateAction<Order | null>>  }) => {
  const [formData, setFormData] = useState<Order>({
    pay_sn: "",
    stock: false,
    email: false,
    shipping_date: "",
    note: "",
    ...order, // Se fusiona con `order` para asegurar valores
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Actualizar el estado si `order` cambia
  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...order }));
  }, [order]);

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
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors : { pay_sn?: string, shipping_date?: string, stock?: string } = {} ;
    if (!formData.pay_sn) newErrors.pay_sn = "Este campo es obligatorio";
    if (!formData.shipping_date) newErrors.shipping_date = "Este campo es obligatorio";
    if (!formData.stock) newErrors.stock = "Este campo es obligatorio";
    
    setErrors(newErrors); 
    
    if (Object.keys(newErrors).length !== 0)  return;
    // Enviar formulario
    try {
        const {data}=await clientAxios.put(`/confirm_order/${order_id}`, formData);
        setOrder(data);
    } catch (error) {
        console.log(error);
        setErrors({ 'error': error.response.data.error || 'Hubo un error' });
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-50">
        Confirmar pedido
      </h1>
      {errors.error && <p className="text-red-500 text-sm">{errors.error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Validación de pago */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 dark:text-gray-50">
            Validación de pago
          </label>
          <input
            type="text"
            name="pay_sn"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
            placeholder="Ingrese el n° de pago"
            value={formData.pay_sn}
            onChange={handleChange}
          />
          {errors.pay_sn && <p className="text-red-500 text-sm">{errors.pay_sn}</p>}
        </div>

        {/* Validación de Stock */}
        <ToggleSwitch
          name="stock"
          checked={Boolean(formData.stock)}
          onChange={handleChange}
          label="Validación de Stock"
          error={errors.stock}
        />
        
        {/* Fecha estimada de envío */}
        <ToggleSwitch
          name="email"
          checked={Boolean(formData.email)}
          onChange={handleChange}
          label="Envío de correo automático"
          description="El sistema enviará un correo automático al cliente al confirmar el pedido."
        />

        {/* Fecha estimada de envío */}
        <div className="mb-4">
          <label
            className="block text-sm text-gray-600 dark:text-gray-50"
            htmlFor="shipping_date"
          >
            Fecha estimada de envío
          </label>
          <input
            type="date"
            id="shipping_date"
            name="shipping_date"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2"
            value={formData.shipping_date}
            onChange={handleChange}
          />
         {errors.shipping_date && <p className="text-red-500 text-sm">{errors.shipping_date}</p>}
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
        </div>

        {/* Botón de enviar */}
        {

          <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!formData.pay_sn || !formData.shipping_date || !formData.stock}
          >
            Guardar
          </button>
          </div>
        }
      </form>
    </>
  );
};

export default ConfirmOrder;
