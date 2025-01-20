import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import Aside from "../../components/layouts/Aside";
import Main from "../../components/layouts/Main";


const Address = () => {
  return (
    <div className="flex">
      <Aside />
      <Main>
        <div className="bg-white rounded-lg shadow-lg p-6 min-w-96 w-min">
            <h1 className="text-2xl font-bold mb-4">Mis direcciones</h1>
            <div>
                <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">Dirección 1</p>
                    <div>
                    <FaRegEdit className="cursor-pointer" />
                    <FaTrashAlt className="cursor-pointer" />
                    </div>
                </div>
                <p>Av. Lima 123</p>
                <p>San Juan de Lurigancho, Lima</p>
            </div>
        </div>
      </Main>
    </div>
  );
};

export default Address;
