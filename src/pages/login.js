//1. Import Area
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { URL } from '../components/helpers/helper';

//2. Defination Area
export default function Login() {
    //2.1 Hook Area

    //2.2 Function Defination Area
    let myLogin = ()=>{
        //alert('Hello');

        let payload = {
            "identifier": document.querySelector('input[type=email]').value,
            "password": document.querySelector('input[type=password]').value
          }
          console.log(payload);

          fetch(`${URL}/api/auth/local`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
          })
          .then(res=>res.json())
          .then((data)=>{
            if(data["jwt"] !== undefined){
                console.log('token ------>' ,data["jwt"]);
                alert('Welcome');
                window.location.href = '/business_register';

                //Store the token in LocalStorage
                window.localStorage.setItem('jwt_token',data["jwt"])
                window.localStorage.setItem('user_id',data["user"].id)
            }else{
                alert('Get Out');
            }
            console.log(data);
          })
          .catch(err=>err);


    }


    //2.3 Return Statement
    return (
        <>
            <h1 className='text-center mt-3'>Login Page</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="button" onClick={()=>{myLogin()}}>
                    Submit
                </Button>
            </Form>

        </>
    )
}

//3. Export Area
