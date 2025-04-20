// components/ManageUser.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, createUser, deleteUser, updateUser } from "../redux-toolkit/reducer";

const ManageUser = () => {
  const dispatch = useDispatch();
  const { data: allUsers, loading } = useSelector((state) => state.counter);
  console.log(allUsers,"data")

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [edit, setEdit] = useState({ isedit: false, id: "" });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const addUser = () => {
    try {
      if (edit.isedit) {
        dispatch(updateUser({ id: edit.id, userdata: user }));
        setEdit({ isedit: false, id: "" });
      } else {
        dispatch(createUser(user));
      }
      dispatch(getAllUsers());
      setUser({ username: "", email: "", password: "" });
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    dispatch(getAllUsers());
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="px-10">
      <div className="border-amber-800 bg-amber-300 py-3 px-10 rounded-2xl border-2 w-3xl flex flex-col justify-center mx-auto my-10">
        <h2 className="text-2xl text-amber-900 text-center my-2">Create Users</h2>
        <input className="border-2 border-amber-800 bg-yellow-200 p-2 rounded-xl my-2 " type="text" placeholder="enter username " name="username" value={user.username} onChange={handleChange} /> <br />
        <input className="border-2 border-amber-800 bg-yellow-200 p-2 rounded-xl my-2 " type="text" placeholder="enter email " name="email" value={user.email} onChange={handleChange} /> <br />
        <input className="border-2 border-amber-800 bg-yellow-200 p-2 rounded-xl my-2 " type="password" placeholder="enter password " name="password" value={user.password} onChange={handleChange} /> <br />
        <button className="px-4 py-2 border-2 border-amber-800 bg-yellow-200 w-[200px] mx-auto rounded-2xl" onClick={addUser}>{edit.isedit ? "Edit User" : "Add User"}</button>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {allUsers?.user?.length > 0 ? (
            allUsers.user.map((ele, i) => (
              <div key={i} className="border-2 border-amber-800 bg-amber-300 p-3 rounded-2xl ">
                <h2>{ele._id}</h2>
                <h2>{ele.username}</h2>
                <h2>{ele.email}</h2>

                <div className="flex justify-around items-center text-2xl text-amber-950 mt-3">
                  <button className="bg-yellow-400 border-amber-800 border-2 rounded-xl p-1" onClick={() => handleDelete(ele._id)}>🗑️</button> 
                  <button className="bg-yellow-400 border-amber-800 border-2 rounded-xl p-1" onClick={() => {setEdit({ isedit: true, id: ele._id });setUser({ username: ele.username, email: ele.email, password: "" }); }}> ✒️</button>
                </div>
              </div>
            ))
          ) : (
            <>No user found</>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUser;
