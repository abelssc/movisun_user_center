import { useEffect, useState } from "react";
import ListOrders from "./ListOrders";
import Layout from "../../components/layouts/Layout";
import { Link } from "react-router"; // 🟢 Usa "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import clientAxios from "../../config/axios";
import Pagination from "../../components/common/Pagination";
import useFilters from "../../hooks/useFilters";

type Order = {
  order_id: string; // id
  order_sn: string; //° orden
  add_time: string; //date
  order_amount: string; //total
  shipping_fee: string; //envio
  order_state: string; //status
  pay_sn: string; // n° pago
  goods: {
    gid: string;
    goods_name: string;
    goods_price: string;
    goods_num: string;
    goods_image: string;
  }[];
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const { filters}=useFilters();

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const { data } = await clientAxios.get(`/orders`, {
          params: filters,
        });
        setOrders(data.orders);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [user, filters]); // 🔥 Se ejecuta cuando `page` o `state` cambian

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-96 max-w-screen-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-700 dark:text-gray-50">Pedidos</h1>
        <ul className="flex gap-4 mb-6 justify-between font-medium max-w-screen-lg mx-auto">
          <li>
            <Link to="?page=1&state=all" className={filters.state === "all" ? "text-gray-700 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"}>
              Todos Mis Pedidos
            </Link>
          </li>
          <li>
            <Link to="?page=1&state=30" className={filters.state === "30" ? "text-gray-700 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"}>
              Pedidos en Curso
            </Link>
          </li>
          <li>
            <Link to="?page=1&state=40" className={filters.state === "40" ? "text-gray-700 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"}>
              Pedidos Entregados
            </Link>
          </li>
          <li>
            <Link to="?page=1&state=0" className={filters.state === "0" ? "text-gray-700 dark:text-gray-50" : "text-gray-500 dark:text-gray-400"}>
              Pedidos Cancelados
            </Link>
          </li>
        </ul>
        <ListOrders orders={orders} />
        <Pagination totalPages={totalPages} currentPage={Number(filters?.page) || 1} />
      </div>
    </Layout>
  );
};

export default Orders;
