import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
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
import { useOrder } from "../../context/OrderContext";
import { FaCopy } from "react-icons/fa";
import { Flip, toast } from "react-toastify";
import { stateList } from "../../utils/stateList";
import CancelOrder from "./components/CancelOrder";


const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {order,steps,currentStep,setCurrentStep,fetchOrder} = useOrder();

  useEffect(() => {
    (()=>{
      if (!id) return;
      fetchOrder(id);
    })();
  }, [id]);

  const handleCopy = () => {
    if (order?.buyer_email) {
      navigator.clipboard.writeText(order.buyer_email);
      toast.success('✉️ Correo copiado!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        delay:0
        });

    }
  };

  return (
    <>
    <Layout>
        {/* link to back history */}
        <div className="py-4 lg:min-w-96 max-w-6xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-500 dark:text-gray-50 flex items-center gap-2 text-sm">
            <IoMdArrowRoundBack />
            Volver a mis pedidos
          </button>
        </div>
        <div className="flex gap-8 flex-col lg:flex-row">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:min-w-96 max-w-4xl mx-auto">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-50">
                Detalles del pedido  N° {order?.order_id}
                    {
                      order?.order_state &&
                      <div className='flex items-center gap-2'>
                        <span className={`size-4 rounded-full inline-block ${stateList[order?.order_state][1]}`}></span>
                        <span className={`text-xs font-semibold uppercase`}>{stateList[order?.order_state][0]}</span>
                      </div>
                    }
              </h1>
              <button className="text-xs text-red-400" onClick={()=>setCurrentStep(-10)}>Cancelar Pedido</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-8">
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
                <p className="flex gap-2 text-blue-400 break-all">
                  {order?.buyer_email}
                  <FaCopy className="cursor-pointer hover:text-blue-300" onClick={handleCopy}/>
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
                  {steps.map((step, index) => (
                    <StepOrder key={step} step={step} index={index} />
                  ))}
                </ul>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-8 text-gray-700 dark:text-gray-50">Resumen del pedido</h2>
              <div className="grid grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_100px_100px] gap-4 text-sm mb-4 items-center bg-gray-100 dark:bg-gray-700 p-2 text-gray-800 dark:text-gray-50 font-medium">
                  <div>Nombre del producto</div>
                  <div>Cantidad</div>
                  <div>Precio</div>
              </div>
              {order?.goods.map((goods) => (
                <div key={goods.gid} className="grid grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_100px_100px] gap-4 text-sm mb-8 items-center  text-gray-800 dark:text-gray-50">
                  <div className="flex gap-4 items-center">
                    <img className="size-20" src={import.meta.env.VITE_PRODUCTS_IMAGE_URL + "/" + resizeImage(goods.goods_image,'240')} alt={goods.goods_name} title=
                    {goods.goods_name} />
                    <p className="hidden md:block">{goods.goods_name}</p>
                  </div>
                  <div>{goods.goods_num} und.</div>
                  <div>S/ {goods.goods_price}</div>
                  <p className="col-span-full md:hidden">{goods.goods_name}</p>
                </div>
              ))}
            </div>
          </div>
          {
            (
              <div className="overflow-hidden relative lg:w-96 max-w-full">
                <div
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 
                  transform transition-all duration-500 ease-in-out 
                  ${(currentStep >= 25 || currentStep===-10) ? " translate-x-0 opacity-100" : " translate-x-full opacity-0"}`}
                >
                  {currentStep === 25 && <ConfirmOrder />}
                  {currentStep === 30 && <SendOrder />}
                  {currentStep === 40 && <DeliveredOrder />}
                  {currentStep === -10 && <CancelOrder />}
                </div>
              </div>
            )
          }
        </div>
    </Layout>
    </>
  )
}

export default OrderDetail;
