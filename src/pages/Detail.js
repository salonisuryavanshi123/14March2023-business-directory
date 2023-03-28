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
                                                            "users_permissions_use": [
                                                                2
                                                              ],
                                                            "businesses": [
                                                                13
                                                            ]
                                                            }
                                                        });
    const [busDetail,setBusDetail] = useState([]);
    const [busPhotos,setBusPhotos] = useState([]);
    const [busName,setBusName] = useState('');


    useEffect(()=>{
        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                users_permissions_user:parseInt(window.localStorage.getItem('user_id'))
            }   

        });

        console.log('business_id------>>',searchParams.get('business_id'));
        let restaurantid = searchParams.get('business_id')
        fetch(`${URL}/api/businesses?populate=*&filters[id][$eq]=`+restaurantid)
        .then(res=>res.json())
        .then(data=>{
            console.log('Business details------>>',data.data);
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
    const handleSubmit = (value) => {
        console.log(value);
        setReviewPayload({
            ...reviewPayload,
            data:{
                ...reviewPayload.data,
                description:value
            }

        });
    }
    function matches(elem, filter) {
        if (elem && elem.nodeType === 1) {
          if (filter) {
            return elem.matches(filter);
          }
          return true;
        }
        return false;
      }
      function getPreviousSiblings(elem, filter) {
        var sibs = [];
        while (elem = elem.previousSibling) {
          if (matches(elem, filter)) {
            sibs.push(elem);
          }
        }
        return sibs;
      }
      function getAllSiblings(elem, filter) {
        var sibs = [];
        elem = elem.parentNode.firstChild;
        while (elem = elem.nextSibling) {
          if (matches(elem, filter)) {
            sibs.push(elem);
          }
        } 
        return sibs;
      }

      let star2 = (e) => {
        console.log(e.target);
        console.log(e.target.classList);
        let elem = e.target;

        var allSibs = getAllSiblings(elem, 'svg.fa-star');
        console.log('index--->', allSibs.length);

        allSibs.forEach(element =>  {
            console.log('allSibs------>>',element);
            element.classList.remove('text-warning')
            element.classList.add('text-secondary')
        });
      }

    let star= (e)=>{
        console.log(e.target);
        console.log(e.target.classList);
        let desc = document.querySelector('textarea.review_desc').value;
        let elem = e.target;
        //console.log(elem.getAttribute("data-rateno"))

        var prevSibs = getPreviousSiblings(elem, 'svg.fa-star');
        console.log('index--->', prevSibs.length);

        prevSibs.forEach(element =>  {
            console.log('prevSibs------>>',element);
            element.classList.remove('text-secondary')
            element.classList.add('text-warning')
        });

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

        fetch(`${URL}/api/reviews`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+window.localStorage.getItem('jwt_token')
            },
            body:JSON.stringify(reviewPayload)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })
        .catch(err=>err);
    }
    return (
        <>
            <h2>Detail Page</h2>
            <h2>{busName}</h2>
            <Carousel className='w-50' indicators={false}>
                {
                    busPhotos && busPhotos.map((cv,idx,arr)=>{
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
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="1" onMouseLeave={(e)=>{ star(e) }} onMouseEnter={(e)=>{ star2(e) }}/>
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="2" onMouseLeave={(e)=>{ star(e) }} onMouseEnter={(e)=>{ star2(e) }}/>
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="3" onMouseLeave={(e)=>{ star(e) }} onMouseEnter={(e)=>{ star2(e) }}/>
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="4" onMouseLeave={(e)=>{ star(e) }} onMouseEnter={(e)=>{ star2(e) }}/>
                            <FontAwesomeIcon icon={faStar} className="text-secondary fs-2" data-rateno="5" onMouseLeave={(e)=>{ star(e) }} onMouseEnter={(e)=>{ star2(e) }}/>
                        </Form.Label>
                    </Form.Group>  
                    <Form.Group className="mb-3">
                        <Form.Label>Tell us about your experience</Form.Label>
                        <Form.Control className='review_desc form-control' as="textarea" rows={3} onChange={e => handleSubmit(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={(e)=>{submitReview(e)}}>
                        Submit
                    </Button>
                </Form>
        </>
    )
}

//Export Area
