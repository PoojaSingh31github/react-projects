import  React,{ useState } from 'react'
import './App.css'
import { TodoApp } from './components/todo'
import { StopWatch, TimerComp } from './components/StopPointer'
import Users from './page/user'
import Counter from './components/couter'
import  { CursorMoveComponent, SnakeCursor, SnakeCursor2 } from './components/cursor'
import Mainnn from './components/Mainnn'

function App() {

  return (
    <>
<div className='h-screen'>
  <Mainnn/>
  {/* <Counter/> */}
  {/* <CursorMoveComponent/> */}
  {/* <SnakeCursor/> */}
  <SnakeCursor2/>
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
