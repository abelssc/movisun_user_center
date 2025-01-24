import { NavLink } from "react-router";

const Aside = () => {
  const base_url:string=import.meta.env.VITE_BASE_URL;
  return (
    <div className="flex flex-col gap-4 p-4 sticky top-0 h-fit">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">Mis Datos</p>
        <ul className="flex flex-col gap-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-gray-800 font-medium" : "text-gray-500"
            }
            to={base_url+"/profile"}
          >
            Perfil
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-gray-800 font-medium" : "text-gray-500"
            }
            to={base_url+"/password"}
          >
            Contraseña
          </NavLink>
          {/* <NavLink
            className={({ isActive }) =>
              isActive ? "text-gray-800 font-medium" : "text-gray-500"
            }
            to={base_url+"/my-address"}
          >
            Direcciones
          </NavLink> */}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-gray-800 font-medium" : "text-gray-500"
          }
          to={base_url+"/orders"}
        >
          Mis Pedidos
        </NavLink>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">Mis intereses</p>
        <ul className="flex flex-col gap-2">
          {/* <NavLink
            className={({ isActive }) =>
              isActive ? "text-gray-800 font-medium" : "text-gray-500"
            }
            to={base_url+"/favorites"}
          >
            Favoritos
          </NavLink> */}
          {/* <NavLink
            className={({ isActive }) =>
              isActive ? "text-gray-800 font-medium" : "text-gray-500"
            }
            to={base_url+"/reviews"}
          >
            Reseñas
          </NavLink> */}
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <NavLink
            className={({ isActive }) =>
              isActive ? "text-gray-800 font-medium" : "text-gray-500"
            }
            to={base_url+"/refunds"}
          >
            Reembolsos
          </NavLink>
      </div>
    </div>
  );
};

export default Aside;
