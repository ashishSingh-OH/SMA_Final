import React, {useState} from 'react'
import { Button, Drawer } from 'antd';
import LoginPage from '../LoginPage/LoginPage';
import LandingDrawer from '../../components/LandingDrawer';

const LandingPage = () => {
    
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    // const onClose = () => {
    //     setVisible(false);
    // };

    return (
    <>
        <div className='landing-container'>
            <div className='landing-left-content'>
                <h1 className='landing-main-header'>
                    Social Media App
                </h1>


                <Button type="primary" onClick={showDrawer}>Get Started</Button>
            </div>
            
            <LandingDrawer visible={visible} setVisible={setVisible}/>

            {/* <Drawer title="Join our family" placement="right" width={690} onClose={onClose} visible={visible}>
                <LoginPage />
            </Drawer> */}

        </div>
    </>
  )
}

export default LandingPage