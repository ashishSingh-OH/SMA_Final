import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router";

const FriendRequestAction = (props) => {
  const navigate = useNavigate();
  

  useEffect(() => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    axios
      .get("http://localhost:3000/requests/" + current_user, {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log("the friend request", res.data);
        props.setFriendRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {props.friendRequests.length === 0 && <h1>no friends requests</h1>}
      {props.friendRequests.map((friend) => {
        return (
          <div className="container mx-5 " key={friend.requeste_id}>
            <ul className="list-group m-1">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                {friend.username} send you a friend Request
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      props.acceptRequestHandler(friend.user_id, friend.requeste_id);
                    }}
                    className="btn btn-success"
                  >
                    Accept request
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      props.deleteRequestHandler(friend.requeste_id);
                    }}
                    className="btn btn-danger mx-2"
                  >
                    Delete request
                  </button>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
};

export default FriendRequestAction;
