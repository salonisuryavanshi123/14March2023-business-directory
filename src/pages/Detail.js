//1. Import Area
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react'
import { Button, Carousel, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import { URL } from '../components/helpers/helper';

//2. Defination Area
export default function Detail() {
    //2.1 Hook Area
    const [searchParams, setSearchParams] = useSearchParams()
    const [reviewPayload,setReviewPayload] = useState({
                                                            "data": {
                                                            "rate_scale": 5,
                                                            "description": "VeryGood",
                                                            "businesses": [
                                                                13
                                                            ]
                                                            }
                                                        });
    const [busDetail,setBusDetail] = useState([]);
    const [busPhotos,setBusPhotos] = useState([]);
    const [busName,setBusName] = useState('');


    useEffect(()=>{
        console.log('restaurant_id------>>',searchParams.get('restaurant_id'));
        let restaurantid = searchParams.get('restaurant_id')
        fetch(`http://localhost:1337/api/businesses?populate=*&filters[id][$eq]=`+restaurantid)
        .then(res=>res.json())
        .then(data=>{
            console.log('Restaurant details------>>',data.data);
            if(data.data.length > 0){
                setBusName(data.data[0].attributes.name)
                setBusDetail(data.data);
                setBusPhotos(data.data[0].attributes.photo.data);
            }else{

            }
        })
        .catch(err=>err);
    },[]);

    //2.2
    let star= (e)=>{
        console.log(e.target);
        console.log(e.target.classList);
        let desc = document.querySelector('textarea.review_desc').value;
        let elem = e.target;
        console.log(elem.getAttribute("data-rateno"))
        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                rate_scale:parseInt(elem.getAttribute("data-rateno")),
                description:desc
            }
            

        })

        elem.classList.remove('text-secondary')
        elem.classList.add('text-warning')
    }

    let submitReview = (e)=>{
        let desc = document.querySelector('textarea.review_desc').value;
        console.log('desc',desc)
        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                description:desc
            }
            

        });
        console.log(reviewPayload);
    }
    return (
        <>
            <h2>Detail Page</h2>
            <h2>{busName}</h2>
            <Carousel className='w-50' indicators={false}>
                {
                    busPhotos.map((cv,idx,arr)=>{
                        return  <Carousel.Item key={idx}>
                                    <img
                                    className="d-block w-100"
                                    src={URL+cv.attributes.url}
                                    alt="First slide"
                                    />
                                    
                                </Carousel.Item>
                    })
                }
                
                </Carousel>
                <Form>
                    <Form.Group className="mb-3 mt-5">
                        <Form.Label>
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="1" onMouseEnter={(e)=>{ star(e) }}/>
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="2" onMouseEnter={(e)=>{ star(e) }}/>
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="3" onMouseEnter={(e)=>{ star(e) }}/>
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="4" onMouseEnter={(e)=>{ star(e) }}/>
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="5" onMouseEnter={(e)=>{ star(e) }}/>
                        </Form.Label>
                    </Form.Group>  
                    <Form.Group className="mb-3">
                        <Form.Label>Tell us about your experience</Form.Label>
                        <Form.Control className='review_desc form-control' as="textarea" rows={3} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={(e)=>{submitReview(e)}}>
                        Submit
                    </Button>
                    <Button variant="primary" type="button" onClick={(e)=>{console.log(reviewPayload )}}>
                        Get Payload
                    </Button>
                </Form>
        </>
    )
}

//Export Area
