//1. Import Area
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import swal from 'sweetalert';
import { URL } from '../components/helpers/url';

//2. Defination Area
export default function BusinessRegister() {
    //2.1 Hooks Area
    const [cities,setCities] = useState([]);
    const [businessCategories,setBusinessCategories] = useState([]);
    

    useEffect(()=>{
        //Call the City Api
        fetch(`${URL}/api/cities`,{})
        .then((res)=>{
            return res.json()
        })
        .then((cityData)=>{
            console.log('City ------>>',cityData.data);
            setCities(cityData.data);
        })
        .catch((err)=>{
            return err;
        });


        //Call the Business Category Api
        fetch(`${URL}/api/business-categories`,{})
        .then((res)=>{
            return res.json()
        })
        .then((businessCatData)=>{
            console.log('Business-Category ----->>',businessCatData.data);
            setBusinessCategories(businessCatData.data);
        })
        .catch((err)=>{
            return err
        });
    },[]);




    //2.2 Function Defination Area
    let BusReg =(e)=>{
        e.preventDefault();
        //alert('Hyyyy')
        let payload = {
                        "data": {
                        "name": document.querySelector('input[name="business_name"]').value,
                        "business_category": document.querySelector('select[name="bus_cat_id"]').value,
                        "cities": [
                            document.querySelector('select[name="city_id"]').value,
                        ]
                        }
                      };

        //Call the Api
        fetch(`${URL}/api/businesses`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            console.log(data);
            swal("Good job!", "Business Register Sucessfully!", "success");
        })
        .catch((err)=>{
            return err
        });
    }
    
    //2.3 Return Statement
    return (
        <>
            <h1 className='text-center mt-3'>Business Register</h1>
            {/* {console.log('set City ---->>',cities)} */}
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>City</Form.Label>
                    <Form.Select name='city_id' aria-label="Default select example">
                        {
                            cities.map((cv,idx,arr)=>{
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                            })
                        }
                        
                        </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Business Category</Form.Label>
                    <Form.Select name='bus_cat_id' aria-label="Default select example">
                    {
                            businessCategories.map((cv,idx,arr)=>{
                                return <option key={idx} value={cv.id}>{cv.attributes.name}</option>
                            })
                        }
                        
                        </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control name='business_name' type="text" placeholder="Enter Business Name" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={(e)=>{BusReg(e)}}>
                    Register Business
                </Button>
            </Form>
        </>
    )
}
