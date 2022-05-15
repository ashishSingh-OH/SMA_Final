import React, { createElement, useEffect, useState }  from 'react';
import {Card} from 'antd';
import './FeedContent.css';
import { Comment, Tooltip, Avatar, Input, Form, Button, List } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, ConsoleSqlOutlined } from '@ant-design/icons';
import axios from 'axios';
import Cookies from 'js-cookie';

const {Meta} = Card;
const {TextArea} = Input;

const FeedContent = () => {

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [commentText, setCommentText] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);
    const [posts, setPosts] = useState([]);
    // const [comments, setComments] = useState([]);

    const comments = ['wow', 'best pic', 'looking charming'];

    const CommentList = ({ comments }) => (
        <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
          itemLayout="horizontal"
          renderItem={props => <Comment {...props} />}
        />  
    );


    const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
    };

    const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
            {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
            <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        // <span key="comment-basic-reply-to">Reply to</span>
    ];

    const Editor = ({ handleCommentChange, handleCommentSubmit, submitting, commentText}) => (
        <>
          <Form.Item>
            <TextArea rows={4} onChange={handleCommentChange} value={commentText} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={handleCommentSubmit} type="primary">
              Add Comment
            </Button>
          </Form.Item>
        </>
      );

    const handleCommentChange = e => {
        setCommentText(e.target.value);
    }

    const handleCommentSubmit = () => {
        if(!commentText){
            return;
        }

        setSubmittingComment(true);

        setTimeout(()=>{
            setSubmittingComment(false);
            setCommentText("");
            // setComments(...comments, {
            //     content: <p>{commentText}</p>,
            //     datetime: moment().fromNow(),
            // });
        }, 1000);
    }

    useEffect(()=>{
        const userToken = Cookies.get("authToken");
          const userEmail = Cookies.get("userEmail");
          const headers = {
            "X-User-Email": userEmail,
            "X-User-Token": userToken,
          };
          axios
            .get("http://localhost:3000/posts/", {
              headers: headers,
            })
            .then((response) => {
                setPosts(response.data);
                console.log("all posts:", response)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    //images
    const [images, setImages] = useState();
    
    return (
    <>

        <div className='feed-content-container'>
        <h3 className='feed-heading'>Your Feed</h3>
         
            <div className='feed-content'>
                {   posts.map((post)=>{
                    return (
                    <div className='feed-card-container'>    
                        <Card
                            hoverable
                            className='feed-content-card'
                            style={{ width: 330 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title={post.title} />
                            <br/>
                            <p>{post.description}</p>
                        
                        {actions}
            
                        {comments.length > 0 && <CommentList comments={comments} />}
                        <Comment 
                            content={
                                <Editor 
                                    onChange={handleCommentChange}
                                    onSubmit={handleCommentSubmit}
                                    value={commentText}
                                />
                            }
                        />
                        </Card>
                    </div>
                    );
                })
                            
                }
            
            
            </div>
            </div>

    </>
    )
}

export default FeedContent