import { useEffect, useState } from "react";
import ListOrders from "./ListOrders";
import Layout from "../../components/layouts/Layout";
import { Link, useSearchParams } from "react-router"; // 🟢 Usa "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import clientAxios from "../../config/axios";
import Pagination from "../../components/common/Pagination";

type Order = {
  order_id: string;
  order_sn: string;
  add_time: string;
  order_amount: string;
  order_state: string;
  pay_sn: string;
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
  const [searchParams] = useSearchParams(); // ❌ No uses setSearchParams si no lo necesitas

  const [totalPages, setTotalPages] = useState(1);
  const page = searchParams.get("page") || "1";
  const state = searchParams.get("state") || "all";

  useEffect(() => {
    if (!user) return;

    console.log("Fetching orders for", { page, state });

    const fetchOrders = async () => {
      try {
        const { data } = await clientAxios.get(`/orders/${user.member_id}`, {
          params: { page, state },
        });
        setOrders(data.orders);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [user, page, state]); // 🔥 Se ejecuta cuando `page` o `state` cambian

  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-96 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Pedidos</h1>
        <ul className="flex gap-4 mb-6 justify-between font-medium">
          <li>
            <Link to="?page=1&state=all" className={state === "all" ? "text-black" : "text-gray-600"}>
              Todos Mis Pedidos
            </Link>
          </li>
          <li>
            <Link to="?page=1&state=30" className={state === "30" ? "text-black" : "text-gray-600"}>
              Pedidos en Curso
            </Link>
          </li>
          <li>
            <Link to="?page=1&state=40" className={state === "40" ? "text-black" : "text-gray-600"}>
              Pedidos Entregados
            </Link>
          </li>
          <li>
            <Link to="?page=1&state=0" className={state === "0" ? "text-black" : "text-gray-600"}>
              Pedidos Cancelados
            </Link>
          </li>
        </ul>
        <ListOrders orders={orders} />
        <Pagination totalPages={totalPages} currentPage={parseInt(page)} />
      </div>
    </Layout>
  );
};

export default Orders;
