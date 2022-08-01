import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useForm } from "react-hook-form";
import { addUser, editUser } from "../store/slices/userSelected.slice";
import { motion } from "framer-motion";

const UsersForm = ({ showAndHideModal, deselectUser }) => {
  const userSelected = useSelector((state) => state.userSelected);
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const defaultValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    birthday: "",
  };
  useEffect(() => {
    if (userSelected !== null) {
      reset({
        first_name: userSelected.first_name,
        last_name: userSelected.last_name,
        email: userSelected.email,
        password: userSelected.password,
        birthday: userSelected.birthday,
      });
    }
  }, [userSelected, reset]);
  const submit = (data) => {
    if (userSelected === null) {
      dispatch(addUser(data));
    } else {
      dispatch(editUser(userSelected.id, data));
    }
    showAndHideModal();
    deselectUser();
    reset(defaultValues);
  };
  return (
    <div className="users-form modal">
      <motion.form
        onSubmit={handleSubmit(submit)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <motion.button
          type="button"
          className="btn-close"
          onClick={() => {
            deselectUser();
            showAndHideModal();
          }}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.8 }}
        >
          <i className="bx bx-x"></i>
        </motion.button>
        {userSelected === null ? (
          <h2>Nuevo Usuario</h2>
        ) : (
          <h2>Editar Usuario</h2>
        )}
        <div>
          <label htmlFor="first_name">Nombre</label>
          <input
            type="text"
            {...register("first_name")}
            id="first_name"
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Apellido</label>
          <input
            type="text"
            {...register("last_name")}
            id="last_name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register("email")} id="email" required />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              id="password"
              required
            />
            <button
              type="button"
              className="show-and-hide"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className="bx bx-show"></i>
            </button>
          </div>
        </div>
        <div>
          <label htmlFor="birthday">Fecha de nacimiento</label>
          <input
            type="date"
            {...register("birthday")}
            id="birthday"
            placeholder="MM/DD/YYYY"
            required
          />
        </div>
        <motion.button
          className="btn-to-accept"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.8 }}
        >
          {userSelected === null ? "Agregar nuevo usuario" : "Guardar Cambios"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default UsersForm;
