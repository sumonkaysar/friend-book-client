import { useQuery } from "@tanstack/react-query";
import Post from "../../Shared/Post/Post";

const PopularPosts = () => {
  const { data: posts = [], refetch } = useQuery({
    queryKey: ['posts', "mostLikes"],
    queryFn: () => fetch(`https://friend-book-server.vercel.app/posts/popular`).then(res => res.json())
  });
  return (
    <section className="container mx-auto my-28">
      <h2 className="text-2xl font-semibold text-center my-5">Top 3 Posts:</h2>
      <div>
        {
          posts.map(post => <Post
            key={post._id}
            post={post}
          />)
        }
      </div>
    </section>
  );
}

export default PopularPosts;
