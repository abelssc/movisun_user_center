import { useState } from "react";
import clientAxios from "../../config/axios";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    member_name: "",
    member_passwd: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.member_name || !formData.member_passwd) {
      setError("Por favor ingresa tu nombre de usuario y contraseña.");
      return false;
    }
    setError(null); // Resetea el error si la validación es exitosa
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const {data,status} = await clientAxios.post("/login", formData);
      
      if (status === 200 && data.code === 200) {
        login(data.data.token, data.data.vendor);
      } else {
        console.error("Login failed:", data.message);
        setError(data.message || "Error desconocido. Por favor, intenta de nuevo.");
      }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            setError(error.response.data.message || "Error desconocido. Por favor, intenta de nuevo.");
        } else {
            setError("Error desconocido. Por favor, contacte con el area de sistemas.");
        }
        console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Iniciar Sesión
        </h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              name="member_name"
              value={formData.member_name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="member_passwd"
              value={formData.member_passwd}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
