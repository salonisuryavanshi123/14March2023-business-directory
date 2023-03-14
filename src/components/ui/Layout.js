import React from 'react'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
    return (
        <>
            <Container className='s_tbdr'>
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </Container>
        </>
    )
}
