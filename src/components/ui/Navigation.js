import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
        <>
            <Nav>
                <Nav.Item>
                    <Link to="/" className='btn btn-link'>Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/login" className='btn btn-link'>Login</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/register" className='btn btn-link'>Register</Link>
                </Nav.Item>
            </Nav>
        </>
    )
}
