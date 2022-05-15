import React, { useState, useEffect } from 'react'
import { Card, Button, Modal, Image, Drawer, Form, Upload, Input, notification, Space } from 'antd'
import './Profile.css'
import { InboxOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import PostAction from '../../components/PostAction';
import FriendRequestAction from '../../components/FriendRequestActions';

const loggedInUrl = "http://localhost:3000/logged_in"

const createPostUrl = "http://localhost:3000/posts";

const Profile = () => {
  const [currentUser,setCurrentUser]=useState({})

  useEffect(()=>{
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData)
    setCurrentUser(userData)
  },[])

let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isFollowerModalVisible, setIsFollowerModalVisible] = useState(false);
  const [isFollowingModalVisible, setIsFollowingModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);



  const followers = [
    {
      id: 1,
      u_name: 'Cristiano Ronaldo'
    },
    {
      id: 2,
      u_name: 'Dua Lipa'
    },
    {
      id: 3,
      u_name: 'Tom Cruise'
    }
  ];

  const followings = [
      {
        id: 1,
        u_name: 'Myself'
      },
  ];

  const getAllPostHandler = () => {
    const current_user = JSON.parse(localStorage.getItem("userData"));
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
    axios
      .get("http://localhost:3000/user_posts/" + current_user.id, {
        headers: headers,
      })
      .then((response) => {
        // console.log(
        //   "Get All Post Request's Response: " + JSON.stringify(response.data)
        // );
        setPosts(JSON.parse(JSON.stringify(response.data)));
      })
      .catch((error) => {
        console.log("Error in get All Post Request: " + error);
        // alert("Unable to fetch all posts.")
      });
  };

  const showFollowerModal = () => {
    setIsFollowerModalVisible(true);

  };

  const showFollowingModal = () => {
    setIsFollowingModalVisible(true);
  };

  const handleOk = () => {
    setIsFollowerModalVisible(false);
    setIsFollowingModalVisible(false);
  };

  const handleCancel = () => {
    setIsFollowerModalVisible(false);
    setIsFollowingModalVisible(false);
  };

  //DETAILS DRAWER
  const showDetailsDrawer = () => {
    setDetailsDrawerVisible(true);
  };
  const onDetailsDrawerClose = () => {
    setDetailsDrawerVisible(false);
  };

  //uploader in form
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  // const [image, setImage] = useState(null);
  

 


  const handlePostSubmission = (e) => {
    e.preventDefault();
    const userToken = Cookies.get("authToken");
    const userEmail = Cookies.get("userEmail");
    const headers = {
      "Content-Type": "multipart/form-data",
      "X-User-Email": userEmail,
      "X-User-Token": userToken,
    };
  
    const current_user = JSON.parse(localStorage.getItem("userData"));
    
      let formData = new FormData();
      formData.append("title", caption);
      formData.append("description", description);
      formData.append("user_id", current_user.id);
      // formData.append("image", image);

    axios.post(createPostUrl, formData, {
      headers: headers
    }).then(res=>{
      navigate("/feed");
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

  const openNotification = placement => {
    notification.info({
      message: `Notification`,
      description:
        'Post Successfully Deleted!',
      placement,
    },
    window.location.reload()
    )
  };
  //delete posts
  const deletePostHandler = (id) => {
    // let isDeleteRequested = confirm("Are you sure you want to delete the post?");
    // console.log(props.id)
          const userToken = Cookies.get("authToken");
          const userEmail = Cookies.get("userEmail");
          const headers = {
            "X-User-Email": userEmail,
            "X-User-Token": userToken,
          };
          axios
            .delete("http://localhost:3000/posts/" + id , {
              headers: headers,
            })
            .then((response) => {
              openNotification('bottomRight');

            })
            .catch((error) => {
              alert("There was an error in deleting the post.");
            });
  }

  useEffect(() => {
    getAllPostHandler();
  }, []);


  //friend request actions 
  const [friendRequests, setFriendRequest] = useState([]);
  const acceptRequestHandler = async (id, requeste_id) => {
    const current_user = JSON.parse(localStorage.getItem("userData")).id;
    await axios
      .post(`http://localhost:3000/friends`, { friend: { user_id: current_user, friend_id: id } })
      .then((res) => {
        // console.log(res)
        alert("friend request accepted ");
        navigate("/profile");
      })
      .catch((err) => {
        alert("friend request can be added " + err);
      });

    await axios
      .post(`http://localhost:3000/friends`, { friend: { user_id: id, friend_id: current_user } })
      .then((res) => {
        window.location.reload(false)
      })
      .catch((err) => {
        alert("friend request can be added " + err);
      });

    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    await axios
      .delete("http://localhost:3000/friend_requests/"+requeste_id, {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        alert("There was an error while signing out: " + err.message);
      });
  };

  const deleteRequestHandler = (id) => {
    alert(id);
    const userEmail = Cookies.get("userEmail");
    const token = Cookies.get("authToken");
    alert("request deleted ");
    axios
      .delete("http://localhost:3000/friend_requests/" + id, {
        headers: {
          "X-User-Token": token,
          "X-User-Email": userEmail,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false)
      })
      .catch((err) => {
        alert("There was an error while signing out: " + err.message);
      });
  };

  return (
    <>
      <div className='profile-container'>
        <div className='profile-card-container'>
          <Card className='profile-card'>

          <div className='profile-pic'>
            <Image
              width={180}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
          <div className='profile-details'>
            <span className='pro-detail-item'><strong>Username </strong> {currentUser.username}</span>
            <span className='pro-detail-item'><strong>Email </strong>{currentUser.email}</span>
            <span className='pro-detail-item'><strong>Gender </strong>{currentUser.gender}</span>
            <span className='pro-detail-item'><strong>Posts </strong>{posts.length}</span>
            

          </div>
            <div className='pc-button-container'>
              <Button className='profile-card-button' onClick={showFollowerModal} onOk={handleOk} onCancel={handleCancel}>Friend Requests</Button>
              
            </div>
          </Card>
        </div>

        <Modal title="Followers" visible={isFollowerModalVisible} onOk={handleOk} onCancel={handleCancel}>
          {
            <FriendRequestAction 
              friendRequests={friendRequests}
              setFriendRequest={setFriendRequest}
              acceptRequestHandler={acceptRequestHandler}
              deleteRequestHandler={deleteRequestHandler}

            />
          }
        </Modal>
        <Modal title="Followings" visible={isFollowingModalVisible} onOk={handleOk} onCancel={handleCancel} width={1200}>
        {
            followings.map((following) => {
              return <div>{following.u_name}</div>
            })
        }
        </Modal>

        <div className='profile-post-container'>
          {
            isLoggedIn && 
            <Button onClick={showDetailsDrawer}>Create Post</Button>
          }
        </div>
          
        <Drawer title="Create Your Post" placement="left" onClose={onDetailsDrawerClose}  width={540} visible={detailsDrawerVisible}>
          <Form 
              className="needs-validation"
              // onSubmit={handlePostSubmission}
              encType="multipart/form-data"
          >
            <Form.Item>
              <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file here to upload</p>
                  <p className="ant-upload-hint">Supports single or bulk upload.</p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="title"
              label="Caption"
              rules={[{ required: true, message: 'Enter Caption' }]}
            >
              <Input 
                showCount maxLength={100}
                onChange={((e)=>setCaption(e.target.value))}
              />
            </Form.Item>
            <Form.Item
              name="desc"
              label="Description"
              rules={[{ required: true, message: 'Whats on your mind!?' }]}
            >
              <Input.TextArea
                showCount maxLength={100}
                onChange={((e)=>setDescription(e.target.value))}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit" style={{width: '100%'}} onClick={handlePostSubmission}>
                Post
              </Button>
            </Form.Item>
          </Form>
        </Drawer>


      </div>

      <div className='posts-main-container'>
      <h3 className='posts-heading'>My Posts</h3>
            <div className="posts-container">
              {posts.map(function (post) {
                return (
                  <div style={{display: "flex", textAlign:"center", justifyContent:"center", margin: "auto", flexDirection:"column"}}>
                    <Card key={post.id} title={post.title} bordered={false} style={{ width: 300 }}>
                      <strong>Description: </strong><p>{post.description}</p>
                      <Button type="primary" onClick={()=>{deletePostHandler(post.id)}}>Delete Post</Button>
                    </Card>
                  </div>
                );
              })}
            </div>
        </div>
    </>
  )
}

export default Profile