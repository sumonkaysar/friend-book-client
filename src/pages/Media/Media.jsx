import { useLoaderData } from "react-router-dom";
import Post from "../Shared/Post/Post";

const Media = () => {
  const posts = useLoaderData();
  console.log(posts);

  return (
    <div className="container mx-auto">
      {
        posts.map(post => <Post
          key={post._id}
          post={post}
        />)
      }
    </div>
  );
}

export default Media;
