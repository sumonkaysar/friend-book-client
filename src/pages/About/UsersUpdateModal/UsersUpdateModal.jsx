import { toast } from "react-toastify";

const UsersUpdateModal = ({ currentUser, refetch, setShowModal }) => {

  const { uid, name, email, photoURL, university, address } = currentUser;

  const handleUpdateDetails = e => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const university = form.university.value;
    const address = form.address.value;

    if (name) {
      const user = {
        name,
        university,
        address
      }

      fetch(`https://friend-book-server.vercel.app/users/${uid}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
          if (data.acknowledged && data.modifiedCount > 0) {
            setShowModal(false);
            toast.success('Updated Successfully')
            refetch();
          }

        }).catch(err => console.error(err));
    }
  }

  return (
    <div>
      <input type="checkbox" id="updatingModal" className="modal-toggle" />
      <form onSubmit={handleUpdateDetails} className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Edit Your Details:</h3>
          <div className="form-control">
            <label className="label" htmlFor="name">
              <span className="label-text">Your Name</span>
            </label>
            <input name="name" type="text" id="name" placeholder="Name" className="input input-bordered" defaultValue={name} />
          </div>
          <div className="form-control mt-2">
            <label className="label" htmlFor="email">
              <span className="label-text">Your Email</span>
            </label>
            <input name="email" type="email" id="email" placeholder="Email" className="input input-bordered" defaultValue={email} disabled />
          </div>
          <div className="form-control mt-2">
            <label className="label" htmlFor="university">
              <span className="label-text">Your University</span>
            </label>
            <input name="university" type="text" id="university" placeholder="University Name" className="input input-bordered" defaultValue={university} />
          </div>
          <div className="form-control mt-2">
            <label className="label" htmlFor="address">
              <span className="label-text">Your Address</span>
            </label>
            <input name="address" type="text" id="address" placeholder="Address" className="input input-bordered" defaultValue={address} />
          </div>
          <div className="modal-action justify-start">
            <button className="btn btn-primary" type="submit">Save</button>
            <label onClick={() => setShowModal(false)} htmlFor="updatingModal" className="btn">Cancel</label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UsersUpdateModal;
