import { Link } from "react-router-dom";

const SignUp = () => {

  const handleSignup = e => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSignup} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mx-auto">
        <div className="card-body">
          <div className="form-control">
            <input name="name" type="text" placeholder="Your Name" className="input input-bordered" />
          </div>
          <div className="form-control">
            <input name="email" type="email" placeholder="Your Email" className="input input-bordered" />
          </div>
          <div className="form-control">
            <input name="password" type="password" placeholder="Password" className="input input-bordered" />
          </div>
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
