import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const { login, loginWithProvider } = useContext(AuthContext);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    loginWithProvider(googleProvider)
      .then(result => {
        toast.success('Logged in Successfully');
        saveUser({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid
        });
      }).catch(err => console.error(err))
  }

  const saveUser = (user) => {
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      navigate('/');
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="container mx-auto">
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
        <div className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="text" placeholder="email" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="text" placeholder="password" className="input input-bordered" />
            <label className="label">
              <Link to="" className="label-text-alt link link-hover">Forgot password?</Link>
            </label>
          </div>
          <div className="form-control mt-4">
            <button className="btn btn-primary">Login</button>
          </div>
          <p className="text-center text-sm font-semibold text-gray-500">Don't have an account? <Link className="text-primary underline" to='/signup'>Signup here</Link></p>
          <div className="divider">OR</div>
          <div className="form-control">
            <button onClick={handleGoogleLogin} type="button" className="btn btn-primary btn-outline">Login With Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
