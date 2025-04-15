import React, { useRef, useState } from "react";

export const TimerComp =()=>{
const [timer , setTimer] = useState(0);
let ref = useRef(null);

const handleTimer =()=>{
    console.log(ref.current)
    if (ref.current != null){
        return
    }

    ref.current = setInterval(() => {
            console.log(timer,"timerrr in side setinterval")
            setTimer((prev)=> prev >= 10 ? 0 : prev += 1)
     } , 1000);
}

const handleStop =()=>{
    // setIsRunning(false)
    clearInterval(ref.current)
    ref.current = null
}

const handleReset =()=>{
    // setIsRunning(false)
    setTimer(0)
    clearInterval(ref.current)
    ref.current = null
}



    return(
        <div className="flex flex-col my-2 w-[300px] px-10">
            <button className="py-1 px-3 bg-black text-white rounded-2xl" onClick={handleTimer}>start timer</button>
            <button className="py-1 px-3 bg-black text-white rounded-2xl" onClick={handleStop}>stop timer</button>
            <button className="py-1 px-3 bg-black text-white rounded-2xl" onClick={handleReset}>reset timer</button>
            {
                <h2 className="text-4xl font-semibold text-pink-950">{timer}</h2>
            }
        </div>
    )
}


export const StopWatch =()=>{
    const [timer, setTimer] = useState({
        "hour" : 0,  
        "min" : 0,
        "sec" : 0
    })
    const [isRunning , setIsRunning] = useState(false);
    const [time, setTime] = useState(0)

    const stopwatchref = useRef(null);

    const handleChange =(e)=>{
        const {name, value} = e.target;
        setTimer({...timer, [name]:value})

    }

    const setTimerFunc =()=>{
        const hour = parseInt(timer.hour)||0
        const min = parseInt(timer.min)||0
        const sec = parseInt(timer.sec)||0
        if (hour < 0 || min >= 60 || min < 0 || sec >= 60 ||sec < 0){
            alert("please add valid time")
            return;
        }
        setTime(hour*3600 + min*60 + sec)
    }

    const formatTime =(second)=>{
        const hrs = String(Math.floor(second / 3600)).padStart(2,"0")
        const min= String(Math.floor((second % 3600) / 60)).padStart(2,"0")
        const sec = String(Math.floor(second % 60)).padStart(2,"0")
        return `${hrs}:${min}:${sec}`
    }

    const startStopwatch =()=>{
        if(time<=0){
            alert("plase enter time first")
            return
        }
        if(!isRunning){
            setIsRunning(true);
            stopwatchref.current = setInterval(() => {
                setTime((prev)=>prev-1)
            }, 1000);

        }
    }
    const resetStopwatch =()=>{
        clearInterval(stopwatchref.current)
        setIsRunning(false)
        setTime(0)
    }

    const stopStopwatch =()=>{
       clearInterval(stopwatchref.current)
       setIsRunning(false)
    }



    return (
        <div className="px-10 py-20 bg-amber-300">
            <h2 className="text-5xl font-light text-amber-950 font-stretch-150% text-center pb-10">{formatTime(time)}</h2>
            <div className="bg-amber-400 border-2 border-amber-500 p-6 flex flex-col justify-center items-center rounded-2xl">
                <input className="border rounded-xl p-2 w-1/2" type="number" placeholder="enter hour" name="hour" min={0}  value={timer.hour} onChange={handleChange} /> <br />
                <input className="border rounded-xl p-2 w-1/2" type="number" placeholder="enter min" name="min" min={0} max={60} value={timer.min} onChange={handleChange} /><br />
                <input className="border rounded-xl p-2 w-1/2" type="number" placeholder="enter sec" name="sec" min={0} max={60} value={timer.sec} onChange={handleChange} /><br />
                <button className="bg-green-500 rounded-xl text-white py-2 px-7 text-2xl mr-2" onClick={setTimerFunc}> set time for stop watch</button>
            <div className="my-5">
                <button className="bg-green-500 rounded-xl text-white py-2 px-7 text-2xl mr-2" onClick={startStopwatch}>start watch</button>
                <button className="bg-green-500 rounded-xl text-white py-2 px-7 text-2xl mr-2" onClick={resetStopwatch} disabled={isRunning}>reset watch</button>
                <button className="bg-green-500 rounded-xl text-white py-2 px-7 text-2xl mr-2" onClick={stopStopwatch} disabled={!isRunning}>stop watch</button>
            </div>
            </div>



        </div>
    )
}