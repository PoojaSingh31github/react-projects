import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageUser = ()=>{
    const [user, setUser ] = useState({
        username: "",
        email:"",
        password:"",
    });
    const [allUsers, setAllUsers] = useState([]);
    const [edit,setEdit] = useState({
        isedit:false, id:""
    });

    const handleChange =(e)=>{
        const {name, value} = e.target;
        setUser((prev)=>({...prev, [name] : value}));
    };

    const addUser= async()=>{
      try {
          if(edit.isedit){
            const res = await axios.put(`http://localhost:3000/api/user/updateUser/${edit.id}`, user);
            console.log(res, "resssssssssssssssssss update")
            setEdit({ isedit:false, id:""})
          }else{
              const res = await axios.post("http://localhost:3000/api/user/signup", user)
              console.log(res)
          }
        getallUser()
        setUser({username: "",email:"",password:""})
      } catch (error) {
        alert(error.response.data.message)
        console.log(error);
        
      }
    }

    const getallUser = async()=>{
        try {
            const res = await axios.get("http://localhost:3000/api/user/allusers");
            setAllUsers(res.data.user);
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleDelete =(id)=>{
        try {
            const res = axios.delete(`http://localhost:3000/api/user/userDelete/${id}`);
            alert("user delete")
            getallUser()
        } catch (error) {
            console.log(error)
        }

    }
    const handleUpdate =async(id)=>{
        try {
            
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getallUser()
    },[])

return (
    <>
        <div>
            <input type="text" placeholder="enter username " name="username" value={user.username} onChange={handleChange} />
            <input type="text" placeholder="enter email " name="email" value={user.email} onChange={handleChange} />
            <input type="password" placeholder="enter password " name="password" value={user.password} onChange={handleChange} />
            <button onClick={addUser}>{edit.isedit ? "edit user" : "add user"}</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4"> 
        {
            allUsers.length > 0 ? allUsers.map((ele,i)=>(
                <div key={i} className="border-2 border-amber-800 bg-amber-300 p-2 ">
                <h2>{ele._id}</h2>
                <h2>{ele.username}</h2>
                <h2>{ele.email}</h2>

                <div className="flex justify-around items-center text-2xl">
                    <button onClick={()=>handleDelete(ele._id)}>🗑️</button>
                    <button onClick={()=> {setEdit({isedit:true, id:ele._id}); setUser({ username:ele.username, email:ele.email, password:"" })}}>✒️</button>
                    </div>
                </div>
            )):(<>no user found</>)
        }
        </div>
    </>
)
}

export default ManageUser;