import { useState } from "react";
import ListOrders from "./ListOrders";
import Layout from "../../components/layouts/Layout";

const Orders = () => {
  const [state, setState] = useState("all");

  /**
   * "0": ["Cancelado", "bg-red-500"],
    "10": ["Pendiente de Pago", "bg-gray-500"],
    "20": ["Pagado", "bg-yellow"],
    "30": ["Enviado", "bg-blue-500"],
    "40": ["Entregado", "bg-green-500"],
   */

  return (
    <Layout>
        <div className="bg-white rounded-lg shadow-lg p-6 min-w-96 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Pedidos</h1>
          <div>
            <ul className="flex gap-4 mb-6 justify-between font-medium">
              <li
                onClick={() => setState("all")}
                className={`cursor-pointer ${
                  state=== "all" ? "text-black" : "text-gray-600"
                }`}
              >
                Todos Mis Pedidos
              </li>
              <li
                onClick={() => setState("30")}
                className={`cursor-pointer ${
                  state=== "30" ? "text-black" : "text-gray-600 "
                }`}
              >
                Pedidos en Curso
              </li>
              <li
                onClick={() => setState("40")}
                className={`cursor-pointer ${
                  state=== "40" ? "text-black" : "text-gray-600 "
                }`}
              >
                Pedidos Entregados
              </li>
              <li
                onClick={() => setState("0")}
                className={`cursor-pointer ${
                  state=== "0" ? "text-black" : "text-gray-600"
                }`}
              >
                Pedidos Cancelados
              </li>
            </ul>
            <div>
              <ListOrders state={state}/>
            </div>
          </div>
        </div>
    </Layout>
  );
};

export default Orders;
