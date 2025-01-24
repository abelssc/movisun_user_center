import { FaRegEdit } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import clientAxios from "../../config/axios";
import Layout from "../../components/layouts/Layout";

const Profile = () => {
  const { user, login, token } = useAuth();
  const [name, setName] = useState<string>(user?.member_nickname || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (user?.member_nickname) {
      setName(user.member_nickname);
    }
  }, [user]);


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (!user) return;
    if (!token) return;

    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      setLoading(true);
      const res = await clientAxios.post(`/memberAvatar/${user.member_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      if (res.data.code === 200) {
        login(token, { ...user, avatar: res.data.data.avatar });
        alert("Avatar actualizado con éxito");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.error("Error al actualizar avatar:", error);
      alert("Ocurrió un error, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;
    if (!token) return;

    try {
      setLoading(true);
      const res = await clientAxios.put(
        "/member/" + user.member_id,
        {
          member_nickname: name,
        },
      );
      console.log(res);
      
      if (res.data.code === 200) {
        login(token, { ...user, member_nickname: name });
        alert("Perfil actualizado con éxito");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      alert("Ocurrió un error, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
        <div className="bg-white rounded-lg shadow-lg py-6 px-12 min-w-96 w-fit">
          <div className="flex gap-4">
            <div>
              <div className="bg-gray-400 rounded-full size-40">
                {user?.avatar && 
                  <img
                    src={import.meta.env.VITE_ROOT_URL+"/data/upload/mall/avatar/"+user.avatar}
                    alt="avatar"
                    className="rounded-full w-full h-full"
                  />
                }
              </div>
              <label>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange}/>
                <FaRegEdit className="cursor-pointer" />
              </label>
            </div>
            <form onSubmit={submit}>
              <h1 className="text-2xl font-bold mb-4">Perfil</h1>
              {error && <p className="text-red-500">{error}</p>}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="mb-1">Código</p>
                  <p>{user?.member_name}</p>
                </div>
                <div>
                  <p className="mb-1">Correo electrónico</p>
                  <p>{user?.member_email}</p>
                </div>
                <div>
                  <p className="mb-1">Nombre y Apellido</p>
                  <input
                    type="text"
                    className="w-full border-b outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-4 bg-blue-500 text-white rounded-lg p-2 text-center disabled:bg-blue-300"
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </form>
          </div>
        </div>
    </Layout>
  );
};

export default Profile;
