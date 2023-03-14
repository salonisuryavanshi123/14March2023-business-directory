//1. Import Area
import React, { useEffect, useState } from 'react'
import { Container, Nav } from 'react-bootstrap'
import Footer from '../components/ui/Footer'
import Header from '../components/ui/Header'

//2. Defination Area
export default function Home() {
    //2.1 Hook Area
    const [businessCategory,setBusinessCategory] = useState([]);


    useEffect(()=>{
        fetch(`http://localhost:1337/api/business-categories?populate=*`)
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            setBusinessCategory(data.data);
        })
        .catch(()=>{

        });
    },[]);

    //2.2 Function Defination Area

    //2.3 Return Statement
    return (
        <>
            <h1>Home Page</h1>
            <ul className="nav">
                {
                    businessCategory.map((cv,idx,arr)=>{
                        return <li key={idx} className='me-3'>
                                    <a href='#'>
                                        <img src={'http://localhost:1337'+cv.attributes.Logo.data.attributes.url} /><br />
                                        {cv.attributes.name}
                                    </a>
                                </li>
                    })
                }
                
            </ul>
        </>
    )
}

//3. Export Area
