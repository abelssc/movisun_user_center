import { useState } from "react";
import clientAxios from "../../config/axios";
import { useAuth } from "../../context/AuthContext";
import Layout from "../../components/layouts/Layout";

const Password = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    try {
      const res= await clientAxios.put(
        "/changePassword/"+user.member_id,
        {
          "current_password":password,
          "password":newPassword,
          "password_confirm":confirmPassword,
        },
      );
      console.log(res);
      if (res.data.code === 200) {
        alert("Contraseña actualizada con éxito");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      alert("Ocurrió un error, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <Layout>
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-96 w-min">
        <h1 className="text-2xl font-bold mb-4">Cambiar contraseña</h1>
        <form onSubmit={submit}>
          {error && <p className="text-red-500">{error}</p>}
          <label>Contraseña actual</label>
          <input
            type={checked ? "text" : "password"}
            placeholder="********"
            className="w-full border-b outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Nueva contraseña</label>
          <input
            type={checked ? "text" : "password"}
            placeholder="********"
            className="w-full border-b outline-none"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label>Confirmar nueva contraseña</label>
          <input
            type={checked ? "text" : "password"}
            placeholder="********"
            className="w-full border-b outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" checked={checked} onChange={(e) => setChecked(e.target.checked)} /> Mostrar contraseña
          </label>
          <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-blue-500 text-white rounded-lg p-2 text-center disabled:bg-blue-300"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
        </form>
      </div>
    </Layout>
  );
};

export default Password;
