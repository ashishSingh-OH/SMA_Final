import React, {useEffect, useState} from 'react'
import { Form, Input, Button, Checkbox, Select, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CSRFToken from './cookies';
const { Option } = Select;

const registerationUrl = "http://127.0.0.1:3000/users"

const SignupPage = (props) => {
    
    const navigate = useNavigate();

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const onFinish = (values: any) => {
    console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    };

    const handleLoginWish = () => {
        props.setWannaLogin(true);
        props.setWannaSignUp(false);
    }

    // const prefixSelector = (
    //     <Form.Item name="prefix" noStyle>
    //       <Select style={{ width: 70 }}>
    //         <Option value="91">+91</Option>
    //       </Select>
    //     </Form.Item>
    //   );


    // const csrf = 

    
      

    const handleSuccessfulRegisteration = ()=>{
        
//         // setCsrf(document.addEventListener("DOMContentLoaded", function(){
//         //     document.querySelector("meta[name='csrf-token']").getAttribute("content"); 
//         // }));
        


//         axios.post(registerationUrl,
//             { 
//                 user : {
//                 email,
//                 first_name: firstName,
//                 last_name: lastName,
//                 username,
//                 age,
//                 gender,
//                 password,
//                 password_confirmation: passwordConfirmation,
//             }
           
//     }).then(response=>{
//             navigate('/feed');
//             console.log(response);
//         }).catch(err=>{
//             console.log(err);
//         })
// }


                axios
                .post(`http://localhost:3000/users`, { user : {
                                    email,
                                    first_name: firstName,
                                    last_name: lastName,
                                    username,
                                    age,
                                    gender,
                                    password,
                                    password_confirmation: passwordConfirmation,
                                } 
                })
                .then((res) => {
                // console.log(res)
                alert("User was successfully created.");
                navigate("/", {
                    state: {
                    messageStatus: "success",
                    message: "User Successfully created, a confirmation mail is send to you email please click confirm email ",
                    },
                   });
                })
                    .catch((err) => {
                    alert("User can't be created due to an error: " + err);
                    });
    };
            
  return (
    <>
        <div className='signup-container'>
            <h2>Sign-Up</h2>
            <div className='signup-form'>
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
                             onChange={(e)=>setEmail(e.target.value)}
                        />
                    </Form.Item>
                    

                    {/* <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item> */}
                    <Form.Item name='username' label="Username" rules={[{required: true, message: 'Please enter your Username' }]}>
                        <Input 
                             onChange={(e)=>setUserName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name='first_name' label="First Name" rules={[{ required: true, message: 'Please enter your Firstname' }]}>
                        <Input 
                             onChange={(e)=>setFirstName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name='last_name' label="Last Name" rules={[{required: true, message: 'Please enter your Lastname' }]}>
                        <Input 
                             onChange={(e)=>setLastName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name='age' label="Age" rules={[{ type: 'number', required: true, message: 'Please enter your age' }]}>
                        <InputNumber 
                             onChange={(e)=>setAge(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item name='gender' label="Gender" rules={[{ required: true, message: 'Please enter your Gender' }]}>
                        <Input 
                             onChange={(e)=>setGender(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password 
                             onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirm_password"
                        rules={[{ required: true, message: 'Confirm Password' }]}
                    >
                        <Input.Password 
                             onChange={(e)=>setPasswordConfirmation(e.target.value)}
                        />
                    </Form.Item>
                    

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={handleSuccessfulRegisteration}>
                        Join
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='login-newuser?'> <p>Already have an account?</p>
                 <Button onClick={handleLoginWish} type="primary">Back to Login</Button>
            </div>
        </div>
    </>
  )
 }

export default SignupPage