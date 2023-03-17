import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import Profile from '../assets/profile.png';
import {toast} from "react-toastify"

const Details = () => {
  const [getuserdata, setUserdata] = useState([]);
  // console.log(getuserdata);

  const { id } = useParams('');
  // console.log(id);

  const history = useNavigate();

  const getdata = async () => {
    const res = await fetch(`http://1to21.com/api/getuser/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      console.log('error ');
    } else {
      setUserdata(data);
      // console.log('get data');
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://1to21.com/api/deleteuser/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deletedata = await res2.json();
    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log('error');
    } else {
      toast.success("User Deleted !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      history('/');
    }
  };

  return (
    <div className="container mt-3">
      <div className="add_btn">
        <NavLink to={`/edit/${getuserdata._id}`}>
          {' '}
          <button className="btn btn-primary mx-2">Edit</button>
        </NavLink>
        <button className="btn btn-danger" onClick={() => deleteuser(getuserdata._id)}>Delete</button>
      </div>
      <div className="row">
        <div className="left_view col-lg-6 col-md-6 col-12">
          <img className='mt-3' src={Profile} style={{ width: 50 }} alt="profile" />
          <h3 className="mt-3">
            Name: <span>{getuserdata.name}</span>
          </h3>
          <h3 className="mt-3">
            Age: <span>{getuserdata.age}</span>
          </h3>
          <p className="mt-3">
            Email: <span>{getuserdata.email}</span>
          </p>
          <p className="mt-3">
            Occuption: <span>{getuserdata.work}</span>
          </p>
        </div>
        <div className="right_view  col-lg-6 col-md-6 col-12">
          <p className="mt-5">
            Mobile: <span>+91 {getuserdata.mobile}</span>
          </p>
          <p className="mt-3">
            Gender: <span>{getuserdata.gender}</span>
          </p>
          <p className="mt-3">
            Location: <span>{getuserdata.location}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
