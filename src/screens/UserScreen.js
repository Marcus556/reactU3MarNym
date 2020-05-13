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
    if(!userid) return
    if (idStringCheck(userid)) {
      setUser(createUserObj(userid, userid, `${userid}.gmail.com`)) 
    } else if (!idStringCheck(userid)) {
    fetch(`http://api.softhouse.rocks/users/${userid}`)
    .then((response) => {
      if(response.status === 500) return
      return response.json()
    })
    .then((newUser) => {
      const user = createUserObj(
        newUser.name,
        newUser.username,
        newUser.email,
        newUser.address.street,
        newUser.address.zipcode,
        newUser.address.suite,
        newUser.address.city
      )
      setUser(user)
    
    })};
    }, [props.user, setUser, userid]);

    const idStringCheck = (str) => {

      return str.match("^[a-zA-Z]+$");
    }

    const createUserObj = (name = 'noName', username = 'noUsername', email = 'noEmail', street = 'noStreet', zipCode = 'noZipcode', suite = 'noSuite', city = 'noCity') => {
      const user = {
        name,
        username,
        email,
        street,
        zipCode,
        suite,
        city,
      }
      return user
    }
  

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