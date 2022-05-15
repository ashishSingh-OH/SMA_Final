import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";

const loginUrl = "http://127.0.0.1:3000/users/sign_in"

const LoginPage = (props) => {
    
    const navigate = useNavigate();
    
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const onFinish = (values: any) => {
    console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };

    const handleSignupWish = () => {
        props.setWannaSignUp(true);
        props.setWannaLogin(false);
    }



    const handleSuccessfulLogin = () => {
        

        axios.post(loginUrl,{
            
                email: loginEmail,
                password: loginPassword,
            
        }).then(res=>{
            Cookies.set("userEmail", res.data.email);
            Cookies.set("authToken", res.data.authentication_token);
            localStorage.setItem("userData", JSON.stringify(res.data));
            res.data.status !== 401 && navigate('/feed');
            // console.log(response);
        }).catch(err=>{
            console.log(err);
        })
    }

  return (
    <>
        <div className='login-container'>
            <h2>Login</h2>
            <div className='login-form'>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <Form.Item name='E-mail' label="Email" rules={[{ type: 'email', required: true, message: 'Please enter your E-mail!' }]}>
                        <Input 
                             onChange={(e)=>setLoginEmail(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password 
                             onChange={(e)=>setLoginPassword(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={handleSuccessfulLogin}>
                        Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='login-newuser?'> <p>Here for the first time?</p>
                 <Button onClick={handleSignupWish} type="primary">Register</Button>
            </div>
        </div>
    </>
  )
}

export default LoginPage