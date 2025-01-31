import { createContext, useContext, useState } from "react";
import clientAxios from "../config/axios";

type OrderContext={
    order:Order|null;
    setOrder:React.Dispatch<React.SetStateAction<Order|null>>;
    currentStep:Step;
    setCurrentStep:React.Dispatch<React.SetStateAction<Step>>;
    steps:number[];
    fetchOrder:($id:string)=>void;
}
type Order = {
    order_id: string; // id
    buyer_email:string;// email
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
      shipping_date:string,
      note:string,
    };
    send_order:false|{
        shipping_date:string,
        shipping_company:string,
        shipping_guide:string,
        shipping_url:string,
        note:string,

    };
    delivered_order:false|{

        delivered:boolean,
        note:string,
    };
    cancel_order:false|{
        note:string,
    };
};

type Step = 0 | 10 | 20 | 25 | 30 | 40;

const OrderContext = createContext<OrderContext | null>(null);

export const OrderProvider = ({children}:{children:React.ReactNode})=>{
    const [order,setOrder]=useState<Order|null>(null);
    // currentStep aunque al inicio depende de order.order_state, se puede cambiar manualmente con los botones de estado StepOrder, estos no hacen peticiones al servidor ni actualizan Order  (setOrder) por ello se maneja un estado Step independiente a order
    const [currentStep,setCurrentStep]=useState<Step>(0);

    const steps=[20,25,30,40];

    const fetchOrder = async ($id:string) =>{
        try {
            const {data} = await clientAxios.get("/order/" + $id);
            setOrder(data);
            setCurrentStep(Number(data.order_state) as Step);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <OrderContext.Provider value={
           {
            order,
            setOrder,
            steps,
            currentStep,
            setCurrentStep,
            fetchOrder
           }
        }>
            {children}
        </OrderContext.Provider>
    );
}

export const useOrder = ()=>{
    const context = useContext(OrderContext);
    if(!context){
        throw new Error('useOrder debe estar dentro del proveedor OrderProvider');
    }
    return context;
}