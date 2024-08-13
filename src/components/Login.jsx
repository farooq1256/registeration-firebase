import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { message } from 'antd'; // Import message and Button from antd
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const initialState = { email: "", password: "" };
  const [state, setState] = useState(initialState);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is logged in:", currentUser);
        setUser(currentUser);
      } else {
        console.log("User is logged out");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        message.success("User logged in successfully!");
        navigate("/"); 
      })
      .catch((error) => {
        message.error(`Login error: ${error.message}`); // Show error message
      });
  };


  return (
    <>
      <div className="py-5 w-100">
        <div className="container">
         
            <div className="row">
              <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <div className="card p-2 p-md-4 p-lg-5">
                  <h1 className="text-center mb-4">Login Form</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="text-center">
                      <button  className="btn btn-outline-success w-50">
                        Login
                      </button>
                    </div>
                  </form>

                  <div className="container text-center text-info mt-3">
                    <div className="row">
                      <div className="col">Need an Account? <Link to="/register">Register</Link></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
        </div>
      </div>
    </>
  );
}

export default Login;
