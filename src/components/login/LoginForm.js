import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';

const LoginForm = (props) => {

    const ax = axios.create({
        timeout: 2000,
        baseURL: process.env.REACT_APP_BASE_URL+"/login/auth",
        headers: {}
    })

    const login = () => {
        return ax.post('', creds).then((res) => {
            loginSuccess(res.data);
        });
    }

    const {
        isOpen,
        toggle,
        loginSuccess
        } = props

    const [creds, setCreds] = useState({username: '', password: ''})

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Login</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" className="form-control" onChange={(e) => setCreds({...creds, username: e.target.value})}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="username">Password</label>
                                <input type="password" id="username" className="form-control" onChange={(e) => setCreds({...creds, password: e.target.value})}/>
                            </div>
                        </div>
                    
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={login}>Login</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default LoginForm
