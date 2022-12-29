import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthProvider";

const SignUp = () => {
  const {signup, updateUser} = useContext(AuthContext);
  const [signupError, setSignupError] = useState('');

  const navigate = useNavigate();

  const handleSignup = e => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    
    signup(email, password)
    .then(result => {
      toast.success('User created Successfully');
      const userInfo = {
        displayName: name
      }
      updateUser(userInfo)
      .then(() => {
        saveUser({
          name,
          email,
          uid: result.user.uid,
          photoURL: 'https://i.ibb.co/Qj8XhH5/user.png'
        })
      })
      .catch(err => console.error(err));
    }).catch(err => {
      console.error(err);
      switch (err.message.split("auth/")[1].split(")")[0]) {
        case "email-already-in-use":
          setSignupError("The user is already registered");
          break;

        default:
          setSignupError(err.message)
          break;
      }
    })
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
      navigate("/");
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="container mx-auto mb-6">
      <form onSubmit={handleSignup} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
        <div className="card-body">
          <h2 className="text-2xl text-center font-bold mb-2">Signup Here</h2>
          <div className="form-control">
            <input name="name" type="text" placeholder="Your Name" className="input input-bordered" />
          </div>
          <div className="form-control">
            <input name="email" type="email" placeholder="Your Email" className="input input-bordered" />
          </div>
          <div className="form-control">
            <input name="password" type="password" placeholder="Password" className="input input-bordered" />
          </div>
          {
            signupError && <p className="text-red-600">{signupError}</p>
          }
          <div className="form-control mt-4">
            <button className="btn btn-primary">Signup</button>
          </div>
          <p className="text-center text-sm font-semibold text-gray-500">Already have an account? <Link className="text-primary underline" to='/login'>Login here</Link></p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
