import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import clientAxios from "../../config/axios";
import {
  MdLocalShipping,
  MdOutlineDocumentScanner,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { convertirTimestamp } from "../../utils/helpers";
import { stateList } from "../../utils/stateList";
import { IoMdArrowRoundBack } from "react-icons/io";
import Layout from "../../components/layouts/Layout";

type Order = {
  order_id: string; // id
  order_sn: string; //° orden
  add_time: string; //recibido
  delay_time: string; //enviado
  finnshed_time: string; //entregado
  shipping_fee: string; //envio
  goods_amount: string; //productos
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
  /**
   * "address": "Cusco|Acomayo|Acomayo Enrique Montenegro Sector 5, Perú, Mz ñ1 Lt 8",
		"phone": "995765034",
		"address_id": "62",
		"member_id": "51",
		"true_name": "Abel Anthony Silva Santa Cruz",
		"area_id": "1701",
		"city_id": "169",
		"area_info": "Cusco|Acomayo|Acomayo",
		"domicilio": "Enrique Montenegro Sector 5, Perú, Mz ñ1 Lt 8",
		"carnet": "74392950",
		"tel_phone": null,
		"mob_phone": "995765034",
		"zip_code": null
   */
  /**
   * "invoice_info": {
		"inv_id": "63",
		"member_id": "51",
		"inv_state": "1",
		"inv_title": "Abel Anthony Silva Santa Cruz",
		"inv_content": "DNI",
		"inv_company": "boleta",
		"inv_code": "74392950",
		"inv_reg_addr": "Lima, Peru, Enrique montenegro, SJL mz abc",
		"inv_reg_phone": "",
		"inv_reg_bname": "",
		"inv_reg_baccount": "",
		"inv_rec_name": "",
		"inv_rec_mobphone": "",
		"inv_rec_province": "",
		"inv_goto_addr": "",
		"Tipo": "Factura general   ",
		"Título": "Abel Anthony Silva Santa Cruz",
		"Número de impuesto": "74392950",
		"Contenido": "DNI"
	}
   */
  reciver_info: {
    address: string;
    true_name: string;
    area_info: string; //departamento|provincia|distrito
    domicilio: string;
    carnet: string;
    mob_phone: string;
  };
  invoice_info: {
    inv_company: string; //tipo de comprobante (boleta, factura)
    inv_content: string; //tipo de documento
    inv_code: string; //n° documento
    inv_title: string; //razon social
    inv_reg_addr: string; //direccion
  };
};

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const rs = await clientAxios.get("/order/" + id);
        setOrder(rs.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [id]);

  return (
    <Layout>
        <div className="py-4 min-w-96 max-w-4xl mx-auto">
          <Link 
            to={import.meta.env.BASE_URL+"/orders"}
            className="text-gray-500 flex items-center gap-2 text-sm">
            <IoMdArrowRoundBack />
            Volver a mis pedidos
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 min-w-96 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Detalles del pedido</h1>
          <div className="grid grid-cols-3 gap-4 text-sm mb-8">
            <div className="bg-gray-50 p-4 text-gray-500">
              <p className="uppercase text-black flex items-center gap-2 mb-2">
                <MdOutlineShoppingBag /> Datos del pedido
              </p>
              <p>N° de pedido: {order?.order_sn}</p>
              <p className="mb-4">
                Fecha de compra: {convertirTimestamp(order?.add_time ?? "")}
              </p>
              <p>
                Costo de envio: S/ {order?.shipping_fee}
              </p>
              <p>
                Producto(s): S/ {order?.goods_amount}
              </p>
              <p>
                Total: S/ {order?.order_amount}
              </p>
            </div>
            <div className="bg-gray-50 p-4 text-gray-500">
              <p className="uppercase text-black flex items-center gap-2 mb-2">
                <MdLocalShipping />
                Datos del envio
              </p>
              <p>{order?.reciver_info.true_name}</p>
              <p>{order?.reciver_info.carnet}</p>
              <p>{order?.reciver_info.area_info}</p>
              <p>{order?.reciver_info.domicilio}</p>
              <p>{order?.reciver_info.mob_phone}</p>
            </div>
            <div className="bg-gray-50 p-4 text-gray-500">
              <p className="uppercase text-black flex items-center gap-2 mb-2">
                <MdOutlineDocumentScanner />
                Datos del comprobante
              </p>
              <p>Tipo: {order?.invoice_info.inv_company}</p>
              <p>
                {order?.invoice_info.inv_content}:{" "}
                {order?.invoice_info.inv_code}
              </p>
              <p>{order?.invoice_info.inv_title}</p>
              <p>{order?.invoice_info.inv_reg_addr}</p>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-8">Seguimiento del pedido</h2>
            <div  className="max-w-[90%] w-full mx-auto">
              <ul className="relative flex flex-col md:flex-row gap-2">
                <li className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
                  <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
                    <span
                      className={
                        "size-7 flex justify-center items-center shrink-0 font-medium rounded-full " +
                        (order?.order_state === "20" ||
                        order?.order_state === "30" ||
                        order?.order_state === "40"
                          ? "bg-blue-500 text-white "
                          : "bg-gray-100 text-gray-800 ")
                            
                      }
                    >
                      1
                    </span>
                    <div
                      className={
                        "mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 group-last:hidden " +
                        (order?.order_state === "20" ||
                        order?.order_state === "30" ||
                        order?.order_state === "40"
                          ? "bg-blue-500 "
                          : "bg-gray-200 ")
                      }
                    ></div>
                  </div>
                  <div className="grow md:grow-0 md:mt-3 pb-5">
                    <span className="block text-sm font-medium text-gray-800">
                      Recibido
                    </span>
                    {
                      (order?.order_state === "20" ||
                      order?.order_state === "30" ||
                      order?.order_state === "40") 
                      ?
                      <p className="text-sm text-gray-500">
                        {convertirTimestamp(order?.add_time ?? "")}
                      </p>
                      : 
                      <p className="text-sm text-red-500">
                        {order?.order_state ? stateList[order.order_state][0] || "" : ""}
                      </p>
                    }
                  </div>
                </li>

                <li className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
                  <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
                    <span
                      className={
                        "size-7 flex justify-center items-center shrink-0  font-medium  rounded-full " +
                        (order?.order_state === "25" ||
                        order?.order_state === "30" ||
                        order?.order_state === "40"
                          ? "bg-blue-500 text-white "
                          : "bg-gray-100 text-gray-800 ")
                      }
                    >
                      2
                    </span>
                    <div
                      className={
                        "mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1  group-last:hidden " +
                       (order?.order_state === "25" ||
                        order?.order_state === "30" ||
                        order?.order_state === "40"
                          ? "bg-blue-500 "
                          : "bg-gray-200 ")
                      }
                    ></div>
                  </div>
                  <div className="grow md:grow-0 md:mt-3 pb-5">
                    <span className="block text-sm font-medium text-gray-800">
                      Confirmado
                    </span>
                    {
                      (order?.order_state === "25" || order?.order_state === "30" || order?.order_state === "40") &&
                      <p className="text-sm text-gray-500">
                        {/* {convertirTimestamp(order?. ?? "")} */}
                      </p>
                    }
                  </div>
                </li>

                <li className="md:shrink md:basis-0 flex-1 group flex gap-x-2 md:block">
                  <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
                    <span
                      className={
                        "size-7 flex justify-center items-center shrink-0 font-medium rounded-full " +
                      (order?.order_state === "30" ||
                        order?.order_state === "40"
                          ? "bg-blue-500 text-white "
                          : "bg-gray-100 text-gray-800 ")
                            
                      }
                    >
                      3
                    </span>
                    <div
                      className={
                        "mt-2 w-px h-full md:mt-0 md:ms-2 md:w-full md:h-px md:flex-1 group-last:hidden "+
                        (order?.order_state === "30" ||
                        order?.order_state === "40"
                          ? "bg-blue-500 "
                          : "bg-gray-200 ")
                      }
                    ></div>
                  </div>
                  <div className="grow md:grow-0 md:mt-3 pb-5">
                    <span className="block text-sm font-medium text-gray-800">
                      En camino
                    </span>
                    {
                      (order?.order_state === "30" ||  order?.order_state === "40") 
                        &&
                    <p className="text-sm text-gray-500">
                      {convertirTimestamp(order?.delay_time ?? "", true)}
                    </p>
                    }
                  </div>
                </li>

                <li className="group flex gap-x-2 md:block">
                  <div className="min-w-7 min-h-7 flex flex-col items-center md:w-full md:inline-flex md:flex-wrap md:flex-row text-xs align-middle">
                    <span
                      className={
                        "size-7 flex justify-center items-center shrink-0 font-medium rounded-full " +
                        (order?.order_state === "40"
                          ? "bg-blue-500 text-white "
                          : "bg-gray-100 text-gray-800 ")
                            
                      }
                    >
                      4
                    </span>
                  </div>
                  <div className="grow md:grow-0 md:mt-3 pb-5">
                    <span className="block text-sm font-medium text-gray-800">
                      Entregado
                    </span>
                    { 
                      order?.order_state === "40" &&
                      <p className="text-sm text-gray-500">
                      {convertirTimestamp(order?.finnshed_time ?? "", true)}
                    </p>
                    }
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-8">Resumen del pedido</h2>
            <div className="grid grid-cols-[1fr_100px_100px] gap-4 text-sm mb-4 items-center bg-gray-100 p-2 text-gray-800 font-medium">
                <div>Nombre del producto</div>
                <div>Cantidad</div>
                <div>Precio</div>
            </div>
            {order?.goods.map((goods) => (
              <div key={goods.gid} className="grid grid-cols-[1fr_100px_100px] gap-4 text-sm mb-8 items-center">
                <div className="flex gap-4 items-center">
                  <img className="size-20" src={import.meta.env.VITE_PRODUCTS_IMAGE_URL + "/" + goods.goods_image} alt={goods.goods_name} title=
                  {goods.goods_name} />
                  <p>{goods.goods_name}</p>
                </div>
                <div>{goods.goods_num} und.</div>
                <div>S/ {goods.goods_price}</div>
              </div>
            ))}
          </div>
        </div>
    </Layout>
  )
}

export default OrderDetail;
