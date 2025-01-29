import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import clientAxios from "../../config/axios";
import {
  MdLocalShipping,
  MdOutlineDocumentScanner,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { convertirTimestamp, resizeImage } from "../../utils/helpers";
import { IoIosListBox, IoMdArrowRoundBack } from "react-icons/io";
import Layout from "../../components/layouts/Layout";
import ConfirmOrder from "./components/ConfirmOrder";
import SendOrder from "./components/SendOrder";
import DeliveredOrder from "./components/DeliveredOrder";
import StepOrder from "./components/StepOrder";

type Order = {
  order_id: string; // id
  order_sn: string; //° orden
  add_time: string; //recibido
  confirm_time: string; //confirmado
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
  confirm_order:false|{
    pay_sn:string,
    stock:boolean,
    email:boolean,
    shipping_date:string,
    note:string,
  };
};

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const rs = await clientAxios.get("/order/" + id);
        setOrder(rs.data);
        console.log(rs.data);
        
        setCurrentStep(Number(rs.data.order_state));
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrder();
  }, [id]);

  return (
    <>
    <Layout>
        <div className="py-4 min-w-96 max-w-4xl mx-auto">
          {/* link to back history */}
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-500 dark:text-gray-50 flex items-center gap-2 text-sm">
            <IoMdArrowRoundBack />
            Volver a mis pedidos
          </button>
        </div>
        <div className="flex gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-96 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-50">Detalles del pedido</h1>
            <div className="grid grid-cols-3 gap-4 text-sm mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 text-gray-500 dark:text-gray-300 rounded-lg">
                <p className="uppercase text-black dark:text-gray-50 flex items-center gap-2 mb-2">
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
              <div className="bg-gray-50 dark:bg-gray-700 p-4 text-gray-500 dark:text-gray-300 rounded-lg">
                <p className="uppercase text-black dark:text-gray-50 flex items-center gap-2 mb-2">
                  <MdLocalShipping />
                  Datos del envio
                </p>
                <p>{order?.reciver_info.true_name}</p>
                <p>{order?.reciver_info.carnet}</p>
                <p>{order?.reciver_info.area_info}</p>
                <p>{order?.reciver_info.domicilio}</p>
                <p>{order?.reciver_info.mob_phone}</p>
                <button className='flex items-center gap-2 text-blue-400'><IoIosListBox />Imprimir rótulo</button>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 text-gray-500 dark:text-gray-300 rounded-lg">
                <p className="uppercase text-black dark:text-gray-50 flex items-center gap-2 mb-2">
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
              <h2 className="text-xl font-bold mb-8 text-gray-700 dark:text-gray-50">Seguimiento del pedido</h2>
              <div  className="max-w-[90%] w-full mx-auto">
                <ul className="relative flex flex-col md:flex-row gap-2">
                  {order && [20, 25, 30, 40].map((step, index) => (
                    <StepOrder key={step} order={order} step={step} 
                    index={index} setStep={setCurrentStep} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-8 text-gray-700 dark:text-gray-50">Resumen del pedido</h2>
              <div className="grid grid-cols-[1fr_100px_100px] gap-4 text-sm mb-4 items-center bg-gray-100 dark:bg-gray-700 p-2 text-gray-800 dark:text-gray-50 font-medium">
                  <div>Nombre del producto</div>
                  <div>Cantidad</div>
                  <div>Precio</div>
              </div>
              {order?.goods.map((goods) => (
                <div key={goods.gid} className="grid grid-cols-[1fr_100px_100px] gap-4 text-sm mb-8 items-center  text-gray-800 dark:text-gray-50">
                  <div className="flex gap-4 items-center">
                    <img className="size-20" src={import.meta.env.VITE_PRODUCTS_IMAGE_URL + "/" + resizeImage(goods.goods_image,'240')} alt={goods.goods_name} title=
                    {goods.goods_name} />
                    <p>{goods.goods_name}</p>
                  </div>
                  <div>{goods.goods_num} und.</div>
                  <div>S/ {goods.goods_price}</div>
                </div>
              ))}
            </div>
          </div>
          {
            order && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 min-w-80">
                {(currentStep === 20 || currentStep === 25) && <ConfirmOrder order={order.confirm_order||{}} order_id={order.order_id} setOrder={setOrder} confirm_time={order.confirm_time}/>}
                {currentStep === 30 && <SendOrder />}
                {currentStep === 40 && <DeliveredOrder />}
              </div>
            )
          }
        </div>
    </Layout>
    </>
  )
}

export default OrderDetail;
