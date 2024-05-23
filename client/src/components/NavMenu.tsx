import React from "react";
import { useNavigate } from "react-router-dom";

function NavMenu() {
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li onClick={() => {navigate(`/`)}}>Home</li>
        <li onClick={() => {navigate(`/chats`)}}>Chats</li>
      </ul>
    </nav>
  );
}

export default NavMenu;
