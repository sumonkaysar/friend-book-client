import { useContext, useEffect, useState } from "react";
import { FaCommentDots, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Post = ({ post }) => {
  const {_id, text, images, author, likers} = post;
  const { user } = useContext(AuthContext);
  const [postUser, setPostUser] = useState(null);
  
  useEffect(() => {
    fetch(`https://friend-book-server.vercel.app/users?uid=${author.uid}`)
      .then(res => res.json())
      .then(data => {
        setPostUser(data);
      }).catch(err => console.error(err));
  }, [post]);

  return (
    <div className="card w-full sm:w-[500px] lg:w-[700px] bg-base-100 shadow-xl mx-auto mb-10">
      <div className="card-body">
        <div className="flex gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={postUser?.photoURL} />
            </div>
          </div>
          <h2 className="card-title">{postUser?.name}</h2>
        </div>
        <p>{text}</p>
        {
          images && images.length === 1 && <div>
            {
              images.map((image, i) => <img
                key={i}
                className="w-full h-80 object-cover rounded-xl bg-slate-100"
                src={image}
              />)
            }
          </div>
        }
        {
          images && images.length === 2 && <div className="grid grid-cols-2 gap-1">
            {
              images.map((image, i) => <div
                key={i}
              >
                <img
                  src={image}
                  className="w-full h-60 sm:h-80 object-cover rounded-xl  bg-slate-100"
                />
              </div>)
            }
          </div>
        }
        {
          images && images.length > 2 && <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {
              images.map((image, i) => <div
                key={i}
              >
                <img
                  src={image}
                  className="w-full h-60 sm:h-80 object-cover rounded-xl  bg-slate-100"
                />
              </div>)
            }
          </div>
        }
        <div className="mt-3">
          <Link className="btn btn-primary" to={`/post-details/${_id}`}>Details</Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
