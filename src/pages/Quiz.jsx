import React from "react";
import { Link, Outlet } from "react-router-dom";
const Quiz = () => {
  return (
    <div>
      <h2>Quiz</h2>
      <Outlet/>
    </div>
  )
}

export default Quiz