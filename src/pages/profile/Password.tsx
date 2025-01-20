import Aside from "../../components/layouts/Aside";
import Main from "../../components/layouts/Main";


const Password = () => {
  return (
    <div className="flex">
      <Aside />
      <Main>
        <div className="bg-white rounded-lg shadow-lg p-6 min-w-96 w-min">
          <h1 className="text-2xl font-bold mb-4">Cambiar contraseña</h1>
          <div>
            <label>Contraseña actual</label>
            <input
              type="text"
              placeholder="********"
              className="w-full border-b outline-none"
            />
            <label>Nueva contraseña</label>
            <input
              type="text"
              placeholder="********"
              className="w-full border-b outline-none"
            />
            <label>Confirmar nueva contraseña</label>
            <input
              type="text"
              placeholder="********"
              className="w-full border-b outline-none"
            />
            <button className="bg-blue-500 text-white rounded-lg p-2 text-center mt-4">
              Guardar
            </button>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default Password;
