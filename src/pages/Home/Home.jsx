import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const Home = () => {
  const [images, setImages] = useState([]);

  const handlePost = e => {
    e.preventDefault();

    const text = e.target.textPost;
    const uploaded_images = [];
    images.forEach((image, i) => {
      const formData = new FormData();
      formData.append(`image`, image);
        fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(imgData => {
        console.log(imgData);
        if (imgData?.status === 200) {
          uploaded_images.push(imgData?.data?.display_url);
        }
      }).catch(err => console.error(err))
    });
    console.log(uploaded_images);
    // fetch()
  }
  const handleImageUpload = e => {
    const uploaded_images = [];
    for (const image of e.target.files) {
      uploaded_images.push(image);
    }
    setImages(uploaded_images);
  }
  const handleRemoveImage = index => {
    const remained_images = images.filter((_, i) => index !== i);
    setImages(remained_images);
  }

  const handleClick = e => {
    e.target.value = null;
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
                <textarea name="textPost" className="textarea textarea-bordered" placeholder="Bio"></textarea>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input onClick={handleClick} onChange={handleImageUpload} name="image" type="file" className="file-input file-input-bordered w-full" accept="image/*" multiple />
              </div>
              <div className="flex flex-wrap gap-3">
                {
                  images && images.map((img, i) => <div
                    className="relative w-24 h-24 overflow-hidden"
                    key={i}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={URL.createObjectURL(img)}
                    />
                    <span
                      onClick={() => { handleRemoveImage(i) }}
                      className="absolute top-1 right-1 cursor-pointer text-sm text-white"
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
