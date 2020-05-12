import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router";
import CardComponent from "../components/CardComponent";


const UserScreen = (props) => {
  const { userid } = useParams();
  const [user, setUser] = useState([]);

  // fetchar user efter id
  // Hade stora problem med att få in res datan direkt i ett objekt. name, username och email gick bra,
  // men address krånglade som fan, hur jag än försökte, så fick plocka ur de ur datan och göra ett obj av det 
  // och sen passa in det.
  useEffect(() => {
    if (!userid) return
    fetch(`http://api.softhouse.rocks/users/${userid}`)
    .then((response) => {
      return response.json()
    })
    .then((newUser) => {

      const user = {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        street: newUser.address.street,
        zipCode: newUser.address.zipcode,
        suite: newUser.address.suite,
        city: newUser.address.city
      }
      setUser(user)
    });
    }, [setUser, userid]);
  

    const userAddress = () => {
      return (
        <Fragment>
        <h5>{user.street}</h5>
        <h5>{user.suite}</h5>
        <h5>{user.zipCode}</h5>
        <h5>{user.city}</h5>
        </Fragment>
      )
    }

  if (userid === undefined) {
    return (
      <CardComponent>
      <div>
        <h3>No selected users</h3>
      </div>
      </CardComponent>
    );
  } else {
    return (
      <CardComponent userAddress = {userAddress()}>
      <div>
      <img src={`https://robohash.org/${user.username}.png?set=set3`} alt="profPic"></img>
        <h3>{user.name}</h3>
        <h3>{user.username}</h3>
        <h3>{user.email}</h3>
      </div>
      </CardComponent>
    );
  }

};


export default UserScreen;