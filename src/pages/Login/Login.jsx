import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider";

const Login = () => {
  const { login, loginWithProvider } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const googleProvider = new GoogleAuthProvider();

  const from = location?.state?.from?.pathname || '/';

  const handleLogin = e => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoginError('');
    login(email, password)
    .then(result => {
      toast.success("Logged in successfully");
      navigate(from);
    })
    .catch(err => {
      console.error(err);
      switch (err.message.split("auth/")[1].split(")")[0]) {
        case "user-not-found":
          setLoginError("The user is not registered");
          break;

        case "wrong-password":
          setLoginError("Password is Incorrect");
          break;

        case "too-many-requests":
          setLoginError(err.message.split("(auth/")[0].split(": ")[1]);
          break;
      
        default:
          setLoginError(err.message);
          break;
      }
    });
  }

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
    fetch('https://friend-book-server.vercel.app/users', {
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
    <div className="container mx-auto mb-6">
      <form onSubmit={handleLogin} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
        <div className="card-body">
          <h2 className="text-2xl text-center font-bold">Login Here</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" placeholder="email" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name="password" placeholder="password" className="input input-bordered" />
            <label className="label">
              <Link to="" className="label-text-alt link link-hover">Forgot password?</Link>
            </label>
          </div>
          {
            loginError && <p className="text-red-600">{loginError}</p>
          }
          <div className="form-control mt-4">
            <button className="btn btn-primary">Login</button>
          </div>
          <p className="text-center text-sm font-semibold text-gray-500">Don't have an account? <Link className="text-primary underline" to='/signup'>Signup here</Link></p>
          <div className="divider">OR</div>
          <div className="form-control">
            <button onClick={handleGoogleLogin} type="button" className="btn btn-primary btn-outline">Login With Google</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
