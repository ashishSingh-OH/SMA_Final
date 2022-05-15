import axios from "axios";
import { useEffect, useState } from "react";
import { Layout, Badge, Card } from 'antd';
import Cookies from "js-cookie";
import './FeedLayout.css';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import FeedContent from './FeedContent';
import ChatDrawer from './ChatDrawer';

const { Sider, Content } = Layout;

const FeedLayout = () => {
    const [friends, setFriends] = useState([]);
    const current_user = JSON.parse(localStorage.getItem("userData")).id;

    const [collapsed, setCollapsed] = useState(false);
    const [visible, setVisible] = useState(false);
    const [currentId, setCurrentId] = useState(0);


    const toggleSiderView = ()=>{
        setCollapsed(!collapsed);
    }

    const showChatDrawer = (event) => {
        setCurrentId(event.currentTarget.dataset.id);
        setVisible(true);
    };
    const friendRequestHandler = (id) => {
        console.log("friend request id => ", id);
        console.log("current use id => ", current_user);
        const userEmail = Cookies.get("userEmail");
        const token = Cookies.get("authToken");
        const friend_request = {
          user_id: id,
          friend_id: current_user,
        };
        axios
          .post(`http://localhost:3000/friend_requests`, {
            friend_request,
            headers: {
              "X-User-Token": token,
              "X-User-Email": userEmail,
            },
          })
          .then((res) => {
            console.log(res);
            alert("Friend request Send successfully ")
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
    useEffect(() => {
        const userEmail = Cookies.get("userEmail");
        const token = Cookies.get("authToken");
        axios
          .get("http://localhost:3000/addfriend", {
            headers: {
              "X-User-Token": token,
              "X-User-Email": userEmail,
            },
          })
          .then(function (response) {
            setFriends(response.data);
            console.log(response.data);
          });
      }, []);

  return (
    <>
     <div className="feed-layout-container">
        <Layout className='feed-layout'>
            <Sider trigger={null} collapsible collapsed={collapsed} width="300" className="feed-layout-sider">
            <div className='sider-header-container'>
                {
                    !collapsed && <h3 className='sider-header'>Add Friends</h3>
                }      
                {
                    collapsed ? <button className="sider-toggle-button" onClick={toggleSiderView}><MenuUnfoldOutlined /></button> : 
                    <button className="sider-toggle-button" onClick={toggleSiderView}><MenuFoldOutlined /></button>
                }
            </div>
            
            { !collapsed &&
                <div className='sider-menu'>
                    <ul>
                        {
                            friends.map((friend)=>{
                                return (
                                    <Badge.Ribbon text="Active" color="green">
                                        <button key={friend.id} onClick={() =>{ friendRequestHandler(friend.id);}} className="friend-list-item" >
                                            {friend.first_name}
                                            
                                            {/* {setFriendId(friend.id)}  */}
                                        </button>
                                    </Badge.Ribbon>
                                )
                            })
                        }
                    </ul>
                </div>
            }
            </Sider>

            {/* <ChatDrawer  friendId={currentId}  visible={visible} setVisible={setVisible} /> */}

            <Layout className="site-layout">
            
            <Content
                className="site-layout-background"
                style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
                }}
            >
                <FeedContent />
            </Content>
            </Layout>
            </Layout>
        </div>
    </>
  )
}

export default FeedLayout