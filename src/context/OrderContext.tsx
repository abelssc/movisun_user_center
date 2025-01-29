import { createContext, useState } from "react";

type OrderContext={
    order:Order|null;
    setOrder:React.Dispatch<React.SetStateAction<Order|null>>;
}
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

const OrderContext = createContext<OrderContext | null>(null);

export const OrderProvider = ({children}:{children:React.ReactNode})=>{
    const [order,setOrder]=useState<Order|null>(null);
    return (
        <OrderContext.Provider value={
           {
            order,
            setOrder
           }
        }>
            {children}
        </OrderContext.Provider>
    );
}