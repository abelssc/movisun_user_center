import { NavLink } from "react-router";

const Aside = () => {
  const base_url:string=import.meta.env.VITE_BASE_URL;
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">Mis Datos</p>
        <ul className="flex flex-col gap-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
            to={base_url+"/profile"}
          >
            Perfil
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
            to={base_url+"/password"}
          >
            Contraseña
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
            to={base_url+"/my-addresss"}
          >
            Direcciones
          </NavLink>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-red-500" : "text-black"
          }
          to={base_url+"/orders"}
        >
          Mis Pedidos
        </NavLink>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-bold">Mis intereses</p>
        <ul className="flex flex-col gap-2">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
            to={base_url+"/favorites"}
          >
            Favoritos
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-black"
            }
            to={base_url+"/reviews"}
          >
            Reseñas
          </NavLink>
        </ul>
      </div>
      <div className="flex flex-col gap-2">
        <p>Reembolsos</p>
      </div>
    </div>
  );
};

export default Aside;
