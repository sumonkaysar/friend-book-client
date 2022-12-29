import CreatePost from "./CreatePost/CreatePost";
import PopularPosts from "./PopularPosts/PopularPosts";

const Home = () => {

  return (
    <div>
      <div className="container mx-auto">
        <CreatePost />
        <PopularPosts />
      </div>
    </div>
  );
}

export default Home;
