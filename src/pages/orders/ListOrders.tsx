// import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // Usamos useSearchParams para obtener los parámetros de la URL
// import SelectInput from "../../components/common/SelectInput";
// import SortableColumn from "../../components/common/SortableColumn";
// import TextInput from "../../components/common/TextInput";
// import { debounce } from "../../utils/debounce";
// import useFilters from '../../hooks/useFilters';
import { convertirTimestamp, resizeImage } from '../../utils/helpers';
import { stateList } from '../../utils/stateList';
import { FaEye } from 'react-icons/fa';
// import { IoDocumentOutline } from 'react-icons/io5';
// import { HiDocumentText } from 'react-icons/hi';
import { IoIosListBox } from 'react-icons/io';

type Order = {
  order_id: string; // id
  order_sn: string; //° orden
  add_time: string; //date
  order_amount: string; //total
  shipping_fee: string; //envio
  order_state: string; //status
  pay_sn: string; // n° pago
  goods: {
    gid: string; //id
    goods_name: string;
    goods_price: string;
    goods_num: string;
    goods_image: string;
  }[];
};

const ListOrders = ({ orders }: { orders: Order[] }) => {
  // const navigate = useNavigate();
  
  // const [searchParams, setSearchParams] = useSearchParams();

  // const {filters, updateFilters} = useFilters();


  // const handleChange = debounce((name: string, value: string) => {
  //   setQueryParams((prevParams) => {
  //     const updatedParams = { ...prevParams, [name]: value };
  //     if (value === '') delete updatedParams[name]; // Elimina el parámetro si el valor es vacío
  //     return updatedParams;
  //   });

  //   // Actualiza los parámetros de la URL sin recargar la página
  //   setSearchParams(queryParams);
  //   // Navega a la misma ruta con los nuevos parámetros
  //   navigate({
  //     pathname: import.meta.env.VITE_BASE_URL + '/orders',
  //     search: new URLSearchParams(queryParams as Record<string, string>).toString(),
  //   });
  // }, 300);

  return (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      <thead className='text-xs text-gray-700 uppercase bg-white dark:bg-gray-800 dark:text-gray-400 border-b-2 border-gray-500'>
        <tr className='text-nowrap'>
          <th className='px-3 py-4'></th>
          <th className='px-3 py-4'></th>
          <th className='px-3 py-4'>
            {/* <TextInput
              placeholder="Project Name"
              className='w-full text-sm'
              defaultValue={queryParams.name}
              onChange={(e) => handleChange('name', e.target.value)}
            /> */}
          </th>
          <th className='px-3 py-4'>
            {/* <SelectInput
              className='w-full text-sm'
              defaultValue={queryParams.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value=''>All</option>
              {
                Object.keys(PROJECT_STATUS_TEXT_MAP).map(key => (
                  <option key={key} value={key}>{PROJECT_STATUS_TEXT_MAP[key]}</option>
                ))
              }
            </SelectInput> */}
          </th>
          <th className='px-3 py-4'></th>
          <th className='px-3 py-4'></th>
          <th className='px-3 py-4'></th>
          <th className='px-3 py-4 text-right'></th>
        </tr>
      </thead>
      <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400 border-b-2 border-gray-500'>
        <tr className='text-nowrap'>
          <th className='px-3 py-4'>#</th>
          <th className='px-3 py-4'>Productos</th>
          <th className='px-3 py-4'></th>
          <th className='px-3 py-4'>Total</th>
          <th className='px-3 py-4'>Envio</th>
          <th className='px-3 py-4'>Fecha</th>
          <th className='px-3 py-4'>Estado</th>
          <th className='px-3 py-4 text-right'>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          orders.map(order => (
            <tr key={order.order_id} className='border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'>
              <td className='px-3 py-4'>{order.order_id}</td>
              <td className='px-3 py-4'>
                <div className='grid grid-cols-2 gap-2'>
                  {
                    order.goods.map(good => (
                      <img key={good.gid} src={import.meta.env.VITE_PRODUCTS_IMAGE_URL+"/"+resizeImage(good.goods_image)} title={good.goods_name} className='w-10 h-10 object-cover rounded-lg' />
                    ))
                  }
                </div>
              </td>
              <td className='px-3 py-4'>
                <div>
                  {
                    order.goods.map(good => (
                      <p key={good.gid} className='text-sm'>{good.goods_name}</p>
                    ))
                  }
                </div>
              </td>
              <td className='px-3 py-4'>S/ {order.order_amount}</td>
              <td className='px-3 py-4'>S/ {order.shipping_fee}</td>
              <td className='px-3 py-4'>{convertirTimestamp(order.add_time,false,true)}</td>
              <td className='px-3 py-4'>
                <div className='flex items-center gap-2'>
                  <span className={`size-4 rounded-full inline-block ${stateList[order.order_state][1]}`}></span>
                  <span className={`text-xs font-semibold uppercase`}>{stateList[order.order_state][0]}</span>
                </div>
              </td>
              <td className='px-3 py-4 text-right'>
                <Link to={import.meta.env.BASE_URL+`/orders/${order.order_id}`} className='flex items-center gap-2 hover:text-blue-400'><FaEye /> Ver detalles</Link>
                <button className='flex items-center gap-2 hover:text-blue-400'><IoIosListBox />Imprimir rótulo</button>
              </td>
            </tr>
          ))

        }
      </tbody>
    </table>
  );
};

export default ListOrders;
