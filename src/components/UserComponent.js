import React from "react";
import { Link } from "react-router-dom";

function UserComponent(props) {
  let users = props.users;
  let color = props.color;

  //Skapar en array userList genom att mappa users-arrayen och lägga en <li> tag för varje instans med user och key.
  const userList = users.map((user, i) => {
      return (
        <li key={i}>
          <Link to={`/user/${user.id}`} style={{color: color}}>{user.name}</Link>
        </li>
      );

  });

  //returnerar vår nya Userlist och sätter color efter vår let color.
  return (
    <div>
      <ul style={{color: color}}>{userList}</ul>
    </div>
  );
}

export default UserComponent;
