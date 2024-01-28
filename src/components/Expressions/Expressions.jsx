import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./expressions.css";

const Expressions = () => {
  return (
    <>
      <h1>Expressions</h1>
      <Link to="/expressions/auditory">Auditory</Link>
      <Link to="/expressions/visual">Visual</Link>
    </>
  );
};

export default Expressions;
