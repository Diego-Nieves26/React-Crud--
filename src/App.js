import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IsLoading, UsersForm, UsersList } from "./components";
import { getUsers } from "./store/slices/users.slice";
import { setUserDeleted } from "./store/slices/userDeleted.slice";
import { setUserSelected } from "./store/slices/userSelected.slice";
import { motion } from "framer-motion";
import "./App.css";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  const users = useSelector((state) => state.users);
  const userDeleted = useSelector((state) => state.userDeleted);
  const [modalForm, setModalForm] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const showAndHideModal = () => {
    setModalForm(!modalForm);
  };
  const selectUser = (user) => {
    dispatch(setUserSelected(user));
    setModalForm(!modalForm);
  };
  const deselectUser = () => dispatch(setUserSelected(null));
  return (
    <div className="App">
      {isLoading && <IsLoading />}
      <nav>
        <h1>Usuarios</h1>
        <motion.button
          onClick={showAndHideModal}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          <i className="bx bx-plus"></i> Crear nuevo usuario
        </motion.button>
      </nav>
      <UsersList users={users} selectUser={selectUser} />
      {modalForm && (
        <UsersForm
          showAndHideModal={showAndHideModal}
          deselectUser={deselectUser}
        />
      )}
      {userDeleted !== null && (
        <div className="modal">
          <motion.div
            className="modal-remove"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <motion.button
              className="btn-close"
              onClick={() => dispatch(setUserDeleted(null))}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
            >
              <i className="bx bx-x"></i>
            </motion.button>
            <h1>Eliminar Usuario</h1>
            <p>
              El usuario <b>{userDeleted}</b> se ha eliminado
            </p>
            <motion.button
              className="btn-to-accept"
              onClick={() => dispatch(setUserDeleted(null))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
            >
              Aceptar
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;
