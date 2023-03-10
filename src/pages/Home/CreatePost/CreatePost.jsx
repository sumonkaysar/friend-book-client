import { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthProvider";

const CreatePost = () => {
  const { user } = useContext(AuthContext);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handlePost = e => {
    e.preventDefault();

    const text = e.target.textPost.value;
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
          if (imgData?.status === 200) {
            uploaded_images.push(imgData?.data?.display_url);
            if (i === images.length - 1) {
              const postData = {
                text,
                images: uploaded_images,
                author: {
                  uid: user.uid,
                },
                time: new Date().getTime()
              }
              console.log(postData);
              fetch("https://friend-book-server.vercel.app/posts", {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(postData)
              })
                .then(res => res.json())
                .then(data => {
                  toast.success('Added post')
                  navigate("/media");

                }).catch(err => console.error(err));
            }
          }
        }).catch(err => console.error(err));

    });
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
    <section className="container mx-auto">
      <h3 className="text-2xl font-semibold text-center my-5">Create A Post:</h3>
      {
        user?.uid ? <form className="card flex-shrink-0 w-full sm:w-[500px] lg:w-[700px] mx-auto shadow-2xl bg-base-100" onSubmit={handlePost}>
        <div className="card-body">
          <div className="form-control">
            <label className="label" htmlFor="text">
              <span className="label-text">Caption</span>
            </label>
            <textarea name="textPost" className="textarea textarea-bordered"
            id="text" placeholder="What's on Your Mind..."></textarea>
          </div>
          <div className="form-control">
            <label className="label" htmlFor="images">
              <span className="label-text">Select Images</span>
            </label>
            <input onClick={handleClick} onChange={handleImageUpload} name="image" id="images" type="file" className="file-input file-input-bordered w-full" accept="image/*" multiple />
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
            <button className="btn btn-primary">Post</button>
          </div>
        </div>
      </form>:
      <h3 className="text-xl text-center my-5">To create a post you must <Link className="font-semibold text-blue-600 underline" to='/login'>login</Link> first.</h3>
      }
    </section>
  );
}

export default CreatePost;
