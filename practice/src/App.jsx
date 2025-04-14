import  React,{ useState } from 'react'
import './App.css'
import { TodoApp } from './components/todo'
import { StopWatch, TimerComp } from './components/StopPointer'

function App() {

  return (
    <>

     <TodoApp/>
     <div>
      <StopWatch/>
      <TimerComp/>
     </div>
    </>
  )
}

export default App
