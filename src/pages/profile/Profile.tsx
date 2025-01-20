import { FaRegEdit } from "react-icons/fa";
import Main from "../../components/layouts/Main";
import Aside from "../../components/layouts/Aside";

const Profile = () => {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="flex">
      <Aside />
      <Main>
        <div className="bg-white rounded-lg shadow-lg py-6 px-12 min-w-96 w-fit">
          <div className="flex gap-4">
            <div>
              <div className="bg-gray-400 rounded-full size-40"></div>
              <FaRegEdit className="cursor-pointer"/>
            </div>
            <form onSubmit={submit}>
              <h1 className="text-2xl font-bold mb-4">Perfil</h1>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="mb-1">Código</p>
                  <p>9999</p>
                </div>
                <div>
                  <p className="mb-1">Correo electrónico</p>
                  <p>abelabed@gmail.com</p>
                </div>
                <div>
                  <p className="mb-1">DNI</p>
                  <input type="text" className="w-full border-b outline-none" />
                </div>
                <div>
                  <p className="mb-1">Celular</p>
                  <input type="text" className="w-full border-b outline-none" />
                </div>
                <div>
                  <p className="mb-1">Nombre y Apellido</p>
                  <input type="text" className="w-full border-b outline-none" />
                </div>
                <div>
                  <p className="mb-1">Dirección</p>
                  <input type="text" className="w-full border-b outline-none" />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg p-2 text-center"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Profile;
