import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase";
import { doc, setDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


function Register() {
  const initialState = { fullName: "", email: "", password: "" };
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password } = state;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save fullName, email, and uid to Firestore
      await setDoc(doc(firestore, "users", user.uid), { 
        fullName, 
        email: user.email, 
        uid: user.uid 
      });
      message.success("User registered successfully!"); // Show success message
      navigate("/");
    } catch (error) {
      message.error(`Registration error: ${error.message}`); // Show error message
    }
  };
  

  return (
    <main>
      <div className="py-5 w-100">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
              <div className="card p-2 p-md-4 p-lg-5">
                <h1 className="text-center mb-4">Register Form</h1>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="fullName"
                      className="form-control"
                      placeholder="Full Name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-outline-success w-50">
                      Register
                    </button>
                  </div>
                </form>
                <div className="container text-center text-info mt-3">
                  <div className="row">
                    <div className="col">Already have an Account? <Link to="/login">Login</Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;
