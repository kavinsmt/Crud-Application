import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    work: "",
    location: "",
    gender: "",
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { name, email, age, mobile, work, location, gender } = formDetails;

    const res = await fetch("http://1to21.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSON.stringify({
        name,
        email,
        work,
        gender,
        age,
        mobile,
        location,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      toast.success("User Created !", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      navigate("/");
    }
  };

  return (
    <div className="container">
      <h3 className="mt-5">Add User</h3>
      <form className="mt-4">
        <div className="row">
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              type="text"
              value={formDetails.name}
              onChange={setdata}
              name="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Email
            </label>
            <input
              type="email"
              value={formDetails.email}
              onChange={setdata}
              name="email"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Age
            </label>
            <input
              type="text"
              value={formDetails.age}
              onChange={setdata}
              name="age"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={formDetails.mobile}
              onChange={setdata}
              name="mobile"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Work
            </label>
            <input
              type="text"
              value={formDetails.work}
              onChange={setdata}
              name="work"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Location
            </label>
            <input
              type="text"
              value={formDetails.location}
              onChange={setdata}
              name="location"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-lg-12 col-md-12 col-12">
            <label for="exampleInputPassword1" class="form-label">
              Gender
            </label>
            <input
              name="gender"
              value={formDetails.gender}
              onChange={setdata}
              className="form-control"
              id=""
              cols="30"
              rows="5"
            ></input>
            <button
              style={{ width: "200px" }}
              type="submit"
              onClick={submitForm}
              class="btn btn-primary mt-5"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
