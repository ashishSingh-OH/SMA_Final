/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import Cookies from "js-cookie";
import { useState } from "react";
// import EditPostModal from "./EditPostModal";
import { useNavigate } from "react-router-dom";


const PostAction = (props) => {
//   const [showEditPostModal, setShowEditPostModal] = useState(false);
//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);

  let navigate = useNavigate();

  console.log("data",props);
  const DeletePostHandler = (props) => {
    // let isDeleteRequested = confirm("Are you sure you want to delete the post?");
    // console.log(props.id)
          const userToken = Cookies.get("authToken");
          const userEmail = Cookies.get("userEmail");
          const headers = {
            "X-User-Email": userEmail,
            "X-User-Token": userToken,
          };
          axios
            .delete("http://localhost:3000/posts/" + props.id, {
              headers: headers,
            })
            .then((response) => {
              alert("Post was successfully deleted.");
              window.location.reload();
            })
            .catch((error) => {
              alert("There was an error in deleting the post.");
            });
  }

  return (
    <div>
      {/* {showEditPostModal && (
        <EditPostModal id={props.id} title={props.title} description={props.description} image={props.image} user_id={props.user_id} show={show} setShow={setShow} />
      )} */}

      <div className="container mt-5 mb-5 space">
        <div className="row d-flex align-items-center justify-content-center ">
          <div className="col-md-6 ">
            <div className="card summary">
              <div className="d-flex justify-content-between p-2 px-3">
                <div className="d-flex flex-row align-items-center">
                  <img
                    src="https://www.pinclipart.com/picdir/big/559-5594866_necktie-drawing-vector-round-avatar-user-icon-png.png"
                    width="50"
                    className="rounded-circle"
                  />
                  <div className="d-flex flex-column ml-2">
                    <strong className="font-weight-bold">
                      {props.title.toUpperCase()}
                    </strong>
                  </div>
                </div>
              </div>
              {/* <img
                src={props.image.url}
                className="img-fluid background-image"
              /> */}
              <div className="p-2">
                <strong className="text-justify">
                  {props.description.toUpperCase()}
                </strong>
              </div>

              <div
                className="btn-group"
                role="group"
                style={{ margin: "5px", padding: "5px" }}
              >
                <button
                  type="button"
                  className="btn btn-danger"
                  style={{ margin: "5px", padding: "5px" }}
                  onClick={() => {
                    DeletePostHandler(props);
                  }}
                >
                  Delete Post
                </button>
                {/* <button
                  type="button"
                  className="btn btn-warning"
                  style={{ margin: "5px", padding: "5px" }}
                  onClick={() => {
                    //edit post handler
                    setShowEditPostModal(true);
                    handleShow()
                  }}
                >
                  Edit Post
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostAction