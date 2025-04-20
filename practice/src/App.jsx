import  React,{ useState } from 'react'
import './App.css'
import { TodoApp } from './components/todo'
import { StopWatch, TimerComp } from './components/StopPointer'
import Users from './page/user'
import Counter from './components/couter'

function App() {

  return (
    <>
<div className='h-screen'>
  {/* <Counter/> */}
  <Users/>

</div>
     <TodoApp/>
     <div>
      <StopWatch/>
      <TimerComp/>
     </div>
    </>
  )
}

export default App
