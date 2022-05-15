import React, {useState} from 'react'
import { Drawer } from 'antd';
import LoginPage from '../pages/LoginPage/LoginPage';
import SignupPage from '../pages/SignupPage/SignupPage';


const LandingDrawer = (props) => {

    const [wannaSignup, setWannaSignUp] = useState(false);
    const [wannaLogin, setWannaLogin] = useState(false);
    

    const onClose = () => {
        props.setVisible(false);
    };

  return (
    <>
        <Drawer title="Join our family" placement="right" width={690} onClose={onClose} visible={props.visible}>
                {
                    (wannaSignup && !wannaLogin) ? <SignupPage wannaLogin={wannaLogin} setWannaLogin={setWannaLogin} wannaSignup={wannaSignup} setWannaSignUp={setWannaSignUp}/> 
                                :   
                    <LoginPage wannaSignup={wannaSignup} setWannaSignUp={setWannaSignUp} wannaLogin={wannaLogin} setWannaLogin={setWannaLogin}/>
                }
                
        </Drawer>
    </>
  )
}

export default LandingDrawer