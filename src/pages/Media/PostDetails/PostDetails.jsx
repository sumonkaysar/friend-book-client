import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { FaCommentDots, FaHeart, FaRegHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const PostDetails = () => {
  const {id} = useParams();
  const { data: post = [], refetch } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetch(`http://localhost:5000/posts/${id}`).then(res => res.json())
  });

  const {_id, text, images, author, likers} = post;
  const { user } = useContext(AuthContext);
  const [postUser, setPostUser] = useState(null);
  const [commentBox, setCommentBox] = useState("hidden");
  const [liked, setLiked] = useState(false);
  const [peopleLiked, setPeopleLiked] = useState(0);
  
  useEffect(() => {
    setLiked(likers?.includes(user?.uid));
  }, [user?.uid, likers]);
  
  useEffect(() => {
    setPeopleLiked(likers?.length);
  }, [likers]);

  useEffect(() => {
    author?.uid && fetch(`http://localhost:5000/users?uid=${author?.uid}`)
      .then(res => res.json())
      .then(data => {
        setPostUser(data);
      }).catch(err => console.error(err));
  }, [author?.uid]);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }

    fetch(`http://localhost:5000/posts/${_id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ liker: user.uid })
    })
      .then(res => res.json())
      .then(data => {
        refetch();

      }).catch(err => console.error(err));
  }

  const handleComment = () => {
    if (commentBox === 'hidden') {
      setCommentBox('flex');
    }else{
      setCommentBox('hidden');
    }
  }

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
                className="w-full h-80 object-cover rounded-xl"
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
                  className="w-full h-60 sm:h-80 object-cover rounded-xl"
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
                  className="w-full h-60 sm:h-80 object-cover rounded-xl"
                />
              </div>)
            }
          </div>
        }
        <div className="flex gap-2 text-xl items-center">
          {
            liked ? <FaHeart
              className="cursor-pointer"
              onClick={handleLike}
              color="red"
            /> :
              <FaRegHeart
                className="cursor-pointer"
                onClick={handleLike}
                color="red"
              />
          }
          <span className="text-sm mr-2">{peopleLiked} {peopleLiked >= 2 ? 'Likes': 'Like'}</span>
          <FaCommentDots onClick={handleComment} className="cursor-pointer" color="green" />
        </div>
        <form className={`gap-1 sm:gap-5 ${commentBox}`}>
          <input type="text" placeholder="Type here" className="input input-sm sm:input-md input-bordered w-full rounded-badge" />
          <button className="btn btn-sm sm:btn-md btn-primary rounded-badge" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default PostDetails;
