import { useEffect, useState } from "react";
import clientAxios from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import { HiOutlineRefresh } from "react-icons/hi";
import { convertirTimestamp } from "../../utils/helpers";
import { TbPigMoney, TbShoppingBagX } from "react-icons/tb";
import { Link } from "react-router";
import { stateList } from "../../utils/stateList";
type Order = {
  order_id: string; // id
  order_sn: string; //° orden
  add_time: string; //date
  order_amount: string; //total
  order_state: string; //status
  pay_sn: string; //n° pago
  goods: {
    gid: string; //id
    goods_name: string;
    goods_price: string;
    goods_num: string;
    goods_image: string;
  }[];
};

const ListOrders = ({state}:{state:string}) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user) return;
        const rs = await clientAxios.get("/orders/" + user.member_id,{
            params:{
                state
            }
        });
        console.log(rs.data);
        setOrders(rs.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, [state]);
  return (
    <>
      {orders.map((order: Order) => (
        <div
          key={order.order_sn}
          className="rounded-2xl overflow-hidden border border-gray-200 mb-4"
        >
          <div className="grid grid-cols-[210px_150px_150px_1fr] gap-8 p-4 bg-gray-50">
            <div className="">
              <p>N° de pedido:</p>
              <p className="font-semibold">{order.order_sn}</p>
            </div>
            <div className="">
              <p>Fecha del pedido:</p>
              <p className="font-semibold">
                {convertirTimestamp(order.add_time)}
              </p>
            </div>
            <div>
              <p>Total:</p>
              <p className="font-semibold">S/ {order.order_amount}</p>
            </div>
          </div>
          <div className="grid grid-cols-[210px_150px_150px_1fr] gap-8 p-4 pt-0 items-center text-sm">
            <div className="grid grid-cols-2 gap-4">
              {order.goods.map((goods) => (
                <div key={goods.gid} className="flex gap-4">
                  <img
                    className="size-24"
                    src={
                      import.meta.env.VITE_PRODUCTS_IMAGE_URL +
                      "/" +
                      goods.goods_image
                    }
                    alt={goods.goods_name}
                    title={goods.goods_name}
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-gray-600 text-xs">Método de entrega</p>
              <p className="font-semibold">Despacho a domicilio</p>
            </div>
            <div>
              <div
                className={`rounded-md px-2 py-0.5 ${
                    stateList[order.order_state][1]
                } w-fit mb-2`}
              >
                {stateList[order.order_state][0]}
              </div>
            </div>
            <div className="flex gap-2 flex-col self-end ml-auto">
                {
                    order.order_state ==='40' && (
                        <a 
                            href={import.meta.env.VITE_ROOT_URL
                                + `/index.php?app=comments&mod=add&order_id=${order.order_id}`
                            }
                            target="_blank"
                            className="border border-gray-400 py-1.5 px-4 rounded-full hover:bg-gray-100 text-center"
                        >
                            Escribir una reseña
                        </a>
                    )
              }
              {order.order_state === "10" && (
                <a
                  href={
                    import.meta.env.VITE_ROOT_URL +
                    `/index.php?app=buy&mod=pay&pay_sn=${order.pay_sn}&order_id=${order.order_id}`
                  }
                  target="_blank"
                  className="border border-gray-400 font-semibold py-1.5 px-4 rounded-full flex gap-1 items-center justify-center hover:bg-gray-100  min-w-48"
                >
                  <TbPigMoney /> Pagar Pedido
                </a>
              )}
              <Link to={import.meta.env.VITE_BASE_URL+`/orders/${order.order_id}`} className="border border-gray-400 py-1.5 px-4 rounded-full hover:bg-gray-100 text-center">
                Ver Detalles
              </Link>
              {order.order_state !=='10' && (
                <a
                    href={
                    import.meta.env.VITE_ROOT_URL +
                    `/index.php?app=buy&mod=buy_again&order_id=${order.order_id}`
                    }
                    target="_blank"
                    className="border border-gray-200 bg-yellow-400 py-1.5 px-4 rounded-full flex gap-1 items-center hover:bg-yellow-300"
                >
                    <HiOutlineRefresh /> Comprar nuevamente
                </a>
              )}
              
            </div>
          </div>
        </div>
      ))}
      {
          orders.length === 0 && (
              <div className="flex items-center justify-center gap-4 flex-col">
                    <TbShoppingBagX className="text-9xl text-gray-300" />
                    <span>No encontramos pedidos que cumplan con tu criterio de búsqueda</span>
                </div>
            )
      }
    </>
  );
};

export default ListOrders;
