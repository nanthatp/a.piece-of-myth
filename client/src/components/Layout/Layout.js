import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";

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
        <Header />
        <main style={{minHeight:'130vh'}}>{children}</main>
        <Footer />
    </div>
  )
}

Layout.defaultProps = {
  title: "a.piece-of-myth - shop now",
  description: "CPE final Project",
  keywords: "a.piece-of-myth",
  author: "Two of the most beautiful girls of the world"
}
export default Layout