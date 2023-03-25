import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import { URL } from '../components/helpers/helper'
import img from '../assests/img/download.png'

export default function SearchFilter() {
    //2.1 Hook Area
    const [businesses,setBusinesses] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(()=>{
        console.log('cat_name------>>',searchParams.get('cat_name'));

        fetch(`${URL}/api/businesses?populate=*&filters[business_category][name][$containsi]=${searchParams.get('cat_name')}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data.data);
            setBusinesses(data.data)
        })
        .catch(err=>{
            console.log(err)
        });
    },[]);

    //2.2 Function Defination Area

    //2.3 Return Statement
    return (
        <>
        <Row>
                <Col sm={9}>
                <h1>Search Filter</h1>
                {
                    businesses.map((cv,idx,arr)=>{
                        return  <Link key={idx} to={'/detail?restaurant_id='+cv.id}>
                                    <Card  className='p-3 mb-3'>
                                        <Row>
                                            <Col sm={4}>
                                                <Card.Img className='img-fluid' variant="top" src={ (cv.attributes.photo.data !==null) ?URL+cv.attributes.photo.data[0].attributes.url :img} />
                                            </Col>
                                            <Col sm={8}>
                                                <Card.Body>
                                                    <Card.Title>{cv.attributes.name}</Card.Title>
                                                    <Badge className='p-2 fs-4' bg="success">3.9</Badge>
                                                        <span>
                                                            <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                            <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                            <FontAwesomeIcon icon={faStar} className="text-warning" />
                                                            <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                                            <FontAwesomeIcon icon={faStar} className="text-secondary" />
                                                        </span>
                                                        <span>5,551 Rating</span>
                                                <Card.Text>
                                                    {cv.attributes.desc}
                                                </Card.Text>
                                                <a href={"tel:"+cv.attributes.phone} className='btn btn-success' onClick={(e)=>{e.stopPropagation()}}>{'+91-'+cv.attributes.phone}</a>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Link>
                    })
                }
                </Col>
                <Col sm={3}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Featured</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Cras justo odio</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
        </Row>        
        
             
        </>
    )
}
