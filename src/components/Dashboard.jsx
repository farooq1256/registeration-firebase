import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container py-5 text-center">
      <h1 className='text-center'>Dashboard</h1>
      <p>Welcome to your Dashboard!</p>
      <button className='btn btn-info'><Link to="/">Home</Link></button>
    </div>
  );
}

export default Dashboard;
