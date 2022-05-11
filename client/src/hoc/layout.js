import React, { Component } from 'react'
import Footer from '../components/Footer/footer';
import Header from '../components/Header/header';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="page_container">
                     {this.props.children}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Layout;