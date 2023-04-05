//1. Import Area
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { URL } from '../components/helpers/helper';


//2. Defination Area
export default function Home() {
    //2.1 Hook Area
    const [businessCategory, setBusinessCategory] = useState([]);


    useEffect(() => {
        fetch(`${URL}/api/business-categories?populate=*`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log('restaurant---->>',data[0].attributes.name)
                setBusinessCategory(data[0].attributes.name);
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
