import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';

const HomePage = () => {
  const [auth, setAuth] = useAuth()
  return (
    <Layout title = {"All Product - Best offers "}>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-9'></div>
      </div>
    </Layout>
  )
}

export default HomePage