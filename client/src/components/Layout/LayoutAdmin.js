import React from 'react'
import  HeaderAdmin from './HeaderAdmin'
import AdminMenu from './AdminMenu';
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children,title,description,keywords,author}) => {

    return (
        <div>
            <Helmet>
            <meta charSet="utf-8" />      
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
            <meta name="author" content={author}/>
            <title>{title}</title>
            </Helmet>
            
            <main style={{minHeight:'130vh'}}>
            <ToastContainer />
            {children}
            </main>
        </div>
    )

    


}

Layout.defaultProps = {
  title: "Happiness Club - shop now",
  description: "CPE final Project",
  keywords: "Happiness Club",
  author: "Two of the most beautiful girls of the world"
}
export default Layout