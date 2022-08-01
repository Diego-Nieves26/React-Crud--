import { useDispatch } from "react-redux/es/exports";
import { motion } from "framer-motion";
import { removeUser } from "../store/slices/userDeleted.slice";

const UsersList = ({ users, selectUser }) => {
  const dispatch = useDispatch();

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 },
  };
  return (
    <motion.ul
      className="user-list"
      variants={containerAnimation}
      initial="hidden"
      animate="show"
    >
      {users.map((user) => (
        <motion.li className="user-card" key={user.id} variants={itemAnimation}>
          <h2>{user.first_name + " " + user.last_name}</h2>
          <div className="user-info">
            <h4>CORREO</h4>
            <span>{user.email}</span>
            <h4>CUMPLEAÑOS</h4>
            <span>
              <i className="bx bx-gift"></i> {user.birthday}
            </span>
          </div>
          <div className="btn-card">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              type="button"
              onClick={() =>
                dispatch(
                  removeUser(user.id, user.first_name + " " + user.last_name)
                )
              }
            >
              <i className="bx bx-trash"></i>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              type="button"
              onClick={() => selectUser(user)}
            >
              <i className="bx bx-pencil"></i>
            </motion.button>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default UsersList;
