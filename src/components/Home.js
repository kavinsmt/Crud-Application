import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {toast} from "react-toastify"

export const Home = () => {
  const [data, setData] = useState([]);
  const getAllData = async () => {
    const res = await fetch('http://1to21.com/api/getusers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://1to21.com/api/deleteuser/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const deletedata = await res2.json();
    // console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log('error');
    } else {
      toast.success("User Deleted !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      getAllData();
    }
  };

  return (
    <div className="mt-5 container-md">
      <div className="d-flex flex-row">
        <div>
          <NavLink to="/register" className="btn btn-primary mb-5">
            Add User +
          </NavLink>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-dark" scope="col">
              ID
            </th>
            <th className="table-dark" scope="col">
              Name
            </th>
            <th className="table-dark" scope="col">
              Email
            </th>
            <th className="table-dark" scope="col">
              Work
            </th>
            <th className="table-dark" scope="col">
              Mobile
            </th>
            <th className="table-dark" scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.work}</td>
                <td>{item.mobile}</td>
                <td className="d-flex justify-content-around">
                  <NavLink to={`view/${item._id}`}>
                    {' '}
                    <button className="btn btn-success">View</button>
                  </NavLink>
                  <NavLink to={`edit/${item._id}`}>
                    {' '}
                    <button className="btn btn-primary">Edit</button>
                  </NavLink>
                  <button className="btn btn-danger" onClick={() => deleteuser(item._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
