//1. Import Area
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { URL } from '../components/helpers/helper';
import { Carousel, Col, Row } from 'react-bootstrap';


//2. Defination Area
export default function Home() {
    //2.1 Hook Area
    const [businessCategory, setBusinessCategory] = useState([]);
    const [mainSlider, setMainSlider] = useState([]);

    useEffect(() => {
        fetch(`${URL}/api/business-categories?populate=*`,{})
            .then((response) => {
                return response.json()
            })
            .then((res) => {
                console.log('restaurant---->>',res.data[0].attributes.name)
                setBusinessCategory(res.data);
            })
            .catch((err) => {
                return err;

            });

            fetch(`${URL}/api/website-frontend?populate[mainslidercom][populate]=*`,{})
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log('mainslidercomponent---->>',data.data.attributes.mainslidercom)
                setMainSlider(data.data.attributes.mainslidercom);
            })
            .catch((err) => {
                return err;

            });
    }, []);

    //2.2 Function Defination Area

    //2.3 Return Statement
    return (
        <>
            <h1>Home Page</h1>
            <Row>
                <Col className='s_tbdr2 mb-5' xs={6}>
                    <Carousel>
                        {
                            mainSlider && mainSlider.map((cv,idx,arr)=>{
                                
                                return <Carousel.Item key={idx}>
                                            {console.log(cv.business_categories.data[0])}
                                            <Link to={'/search?cat_name='+cv.business_categories.data[0].attributes.name}>
                                                <img
                                                className="d-block w-100"
                                                src={URL+cv.image.data[0].attributes.url}
                                                alt="First slide"
                                                />
                                            </Link>
                                            
                                        </Carousel.Item>
                            })
                        }
                        
                    </Carousel>
                </Col>
                <Col className='s_tbdr2' xs={6}>B</Col>
            </Row>
            <ul className="nav">
                {
                    businessCategory && businessCategory.map((cv, idx, arr) => {
                        return <li key={idx} className='me-3 list-style'>
                                    <Link to={"/search?cat_name="+cv.attributes.name} className='me-3 list-style'>
                                        <img className='img-style' src={`${URL}` + cv.attributes.image.data.attributes.url} /><br />
                                        {cv.attributes.name}
                                    </Link>
                                </li>
                    })

                }


            </ul>

        </>
    )
}

//3. Export Area
