import { IoExitOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import clientAxios from "../../config/axios";

type Category = {
  gc_id: string;
  gc_name_en: string;
  child: {
    gc_id: string;
    gc_name_en: string;
  }[];
};

const Header = () => {
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await clientAxios.get("/category");
        setCategories(res.data.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = async () => {
    try {
      const { data } = await clientAxios.delete("/logout");
      if (data.code === 200) {
        logout();
        window.location.href = import.meta.env.VITE_BASE_URL + '/auth/login';
      }
    } catch (error) {
      alert("Error al cerrar sesión. Por favor, intenta de nuevo.");
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-sm pl-4 pr-8 py-2">
      <div className="flex justify-between items-center">
        <a href={import.meta.env.VITE_ROOT_URL}>
          <img
            src={
              import.meta.env.VITE_ROOT_URL +
              "/data/upload/mall/common/07454565052334767.png"
            }
            className="w-40"
            alt="logo"
          />
        </a>
        <div className="hidden lg:block">
          <ul className="flex gap-4">
            {categories?.map((category) => (
              <li
                key={category.gc_id}
                className="relative group rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <a
                  className="text-gray-800 dark:text-gray-100 px-4 py-2 inline-block hover:bg-gray-200 dark:hover:bg-gray-700"
                  href={
                    import.meta.env.VITE_ROOT_URL +
                    "/index.php?app=goodslist&gc_id=" +
                    category.gc_id
                  }
                >
                  {category.gc_name_en}
                </a>
                <ul className="absolute left-0 hidden group-hover:block bg-white dark:bg-gray-800 shadow-md rounded-md pt-2">
                  {category.child?.map((child) => (
                    <li key={child.gc_id}>
                      <a
                        className="block px-4 py-2 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                        href={
                          import.meta.env.VITE_ROOT_URL +
                          "/index.php?app=goodslist&gc_id=" +
                          child.gc_id
                        }
                      >
                        {child.gc_name_en}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4 items-center">
          <p>
            <span className="text-gray-800 dark:text-gray-100">Bienvenido,</span>{" "}
            <span className="font-bold text-blue-900 dark:text-blue-300 text-lg">
              {user?.member_name}
            </span>
          </p>
          <button onClick={handleLogout}>
            <IoExitOutline className="text-gray-800 dark:text-gray-100 text-2xl hover:text-gray-500 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
