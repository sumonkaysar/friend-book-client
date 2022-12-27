import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Home = () => {
  const [images, setImages] = useState([]);
  let uploaded_images = [];

  const handlePost = e => {
    e.preventDefault();

    const form = e.target;
  }
  const handleImageUpload = e => {
    for (const image of e.target.files) {
      uploaded_images.push(URL.createObjectURL(image));
    }
    setImages(uploaded_images);
  }
  const handleRemoveImage = index => {
    uploaded_images = images.filter((_, i) => index !== i);
    console.log(index, uploaded_images);
    setImages(uploaded_images);
  }

  return (
    <div>
      <div className="container mx-auto">
        <section>
          <form className="card flex-shrink-0 w-full shadow-2xl bg-base-100" onSubmit={handlePost}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                {/* <textarea className="input input-bordered" name="" id="" cols="30" rows="10"></textarea> */}
                <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input onChange={handleImageUpload} name="image" type="file" className="file-input file-input-bordered w-full" accept="image/*" multiple />
              </div>
              <div className="grid grid-cols-5">
                {
                  images && images.map((img, i) => <div className="relative" key={i}>
                    <img
                      className="h-24 w-24 object-cover"
                      src={img}
                    />
                    <span
                      onClick={() => { handleRemoveImage(i) }}
                      className="absolute top-1 right-6 cursor-pointer text-sm text-white"
                    ><FaTimes /></span>
                  </div>)
                }
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Home;
