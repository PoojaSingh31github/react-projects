import React, { useCallback, useMemo, useRef, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [debounc, setdebounce] =useState(0)
  const [trotle, settrotle] =useState(0)


  const fecthdata =async()=>{
    const mutation = useMutation(newPost => {
      return fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
      }).then(res => res.json());
    });
  
    const res =await fetch("https://jsonplaceholder.typicode.com/todos/");
    const data = await res.json()
    console.log(data)
  }
  fecthdata()
  let debouceTimer = useRef(0);
  let trottleTimer = useRef(0);

  const handleincreace = () => {

    setInterval(() => {
      const newCount = count + 1;
      debugger;
      console.log(newCount)
      setCount(newCount);
    }, 500);
  };

  const debounce = useCallback((fun,delay)=>{
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer =setTimeout(() => {
            fun(...args);
        }, delay);
    }
  },[])
  const trottleFunc = useCallback((func,delay)=>{
    let timer;
    return (...args)=>{
        if(!timer){
            func(...args);
            timer = setTimeout(() => {
                timer = null
            }, delay);

        }
    }
  },[])

  const handledebTimer =()=>{
    debouceTimer.current = debouceTimer.current+1
    
  }
  const handletroTimer =()=>{
    trottleTimer.current = trottleTimer.current+1
  }

  const handleChange =(e)=>{
    // console.log(e.target.value)
    setdebounce(debouceTimer.current)
  }

  const handlesecondChange =(e)=>{
    // console.log(e.target.value)
    console.log(trotle)
    settrotle(trottleTimer.current)
  }

  
  // const deb = useCallback(debounce(handleChange,500),[])
  // const tro = useCallback(trottleFunc(handlesecondChange,500),[])
  const deb = useMemo(()=>debounce(handleChange,500),[])
  const tro = useMemo(()=>trottleFunc(handlesecondChange,500),[])
  return (
    <>
      <h1>{count}</h1>
      <span>debounce: {debounc}</span> <br />
      <span>trottle: {trotle}</span> <br />
      <div className="bg-red-600 p-3 ">

      <button onClick={()=>{deb();handledebTimer()}}>deb start</button> <br />
      <button onClick={()=>{tro();handletroTimer()}}>tro start</button> <br />

      </div>

      <input className="py-1 px-2 border-2 border-gray-700" type="text" onChange={deb} /> <br />
      <input className="py-1 px-2 border-2 border-gray-700" type="text" onChange={tro} /> <br />
      <button onClick={handleincreace}>start counter</button>
    </>
  );
};

export default Counter;
