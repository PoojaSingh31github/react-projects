import React, { useEffect, useState } from "react";

export const TodoApp =()=>{
    const [list, setList] = useState({title:"", desc:"", status : "pending"});
    const [todo, setTodo] = useState( JSON.parse(localStorage.getItem("tododata"))|| []);
    const [isEdit, setIsEdit] = useState(null);

    const handleChnage = (e)=>{
        const {name, value} = e.target;
        setList({...list,[name]:value})
        console.log(list)
    }

    const handleDelete = (id)=>{
        const UpdatedTodo = todo.filter((ele,i)=>i!==id)
        setTodo(UpdatedTodo)
    }
    const handleEdit = (i)=>{
        setIsEdit(i)
        setList(todo[i])
    }

    console.log(list, "listtt")

    const addTodos =()=>{
        if (isEdit != null){
            todo[isEdit] = list
            setIsEdit(null)

        }else{
            setTodo([...todo, list])
        }
        setList({title:"", desc:"", status : "pending"})
    }
    useEffect(()=>{
        localStorage.setItem("tododata",JSON.stringify(todo))

    },[todo, isEdit])

    const handleFilterdata =(e)=>{
        const {value} = e.target
        const filterdata =[...todo]
        const filtered= filterdata.filter((ele,i)=> ele.status ==value)
        setTodo(filtered)
    }
    const handlezsort =(e)=>{
        const {value} = e.target
        const filterdata =[...todo]
        setTodo(filterdata.sort((a,b)=> {
            if(value=="a-b"){
                let val1 = a.title
                let val2 = b.title
                val2.toLowerCase()
                val1.toLowerCase()
              return  val1.localeCompare(val2);
            }else{
                let val1 = a.title
                let val2 = b.title
                val2.toLowerCase()
                val1.toLowerCase()
              return  val2.localeCompare(val1)
            }
        }))
    }

    return(
        <div className="p-10 bg-pink-400  flex flex-col justify-center items-center">
            <input className="py-2 border-2 border-pink-500 px-3 my-2" type="text" placeholder="enter title" value={list.title} name="title" onChange={handleChnage} /> <br />
            <input className="py-2 border-2 border-pink-500 px-3 my-2" type="text" placeholder="enter desction" value={list.desc} name="desc" onChange={handleChnage} /> <br />
            <select className="py-2 border-2 border-pink-500 px-3 my-2" name="status" id="" onChange={handleChnage}>
                <option className="py-1 border-2 border-pink-500 px-3" value="pending">pending</option>
                <option className="py-1 border-2 border-pink-500 px-3" value="complete">complete</option>
            </select>
            <button  className="bg-black py-2 px-4 rounded-md text-white  text-3xl my-5 w-full" onClick={()=>addTodos()}>add todo</button>

            <h1 className="text-4xl font-extralight my-2 text-pink-950">all todo list </h1>
            <select name="" id="" onChange={handlezsort}>
                <option value="a-b">a-b</option>
                <option value="b-a">b-a</option>
            </select>
            <select name="" id="" onChange={handleFilterdata}>
                <option value="pending">pending</option>
                <option value="complete">complete</option>
            </select>

            {
                todo.length>0 ? todo.map((ele,i)=>(
                    <div key={i} className="w-full text-2xl border-2 gap-10 my-3 border-pink-950 p-2 ">
                    <h2 className="font-bold">{ele.title}</h2>
                    <p>{ele.desc}</p>
                    <p>{ele.status}</p>
                    <div>
                        <button onClick={()=>handleDelete(i)}>🗑️</button>
                        <button onClick={()=>handleEdit(i)}>✒️</button>
                    </div>
                    </div>
                )) : <h2 className="text-3xl font-light text-pink-900">add todo is empty  </h2>
            }
        </div>
    )
}