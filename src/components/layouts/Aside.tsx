import { NavLink } from "react-router";

const Aside = () => {
  const base_url:string=import.meta.env.VITE_BASE_URL;
  return (
    <div className="flex flex-col gap-4 p-4 sticky top-0 h-fit">
      <div className="flex flex-col gap-2">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-gray-700 dark:text-gray-50 font-medium" : "text-gray-500 dark:text-gray-400"
          }
          to={base_url+"/orders"}
        >
          Mis Pedidos
        </NavLink>
      </div>
    </div>
  );
};

export default Aside;
