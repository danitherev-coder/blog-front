import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import _ from "lodash";

// const Menu = () => {
//   // Retrieve current post id from URL parameters
//   const { id } = useParams();

//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("/posts");
//         // Filter out current post and shuffle remaining posts randomly
//         const otherPosts = _.shuffle(res.data.filter((post) => post.id !== id));
//         // Take the first four elements from the shuffled array
//         setPosts(otherPosts.slice(0, 3));
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetchData();
//   }, [id]);

const Menu = ({ cat }) => {
  // Retrieve current post id from URL parameters
  const { id } = useParams();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blog-mysql-api-production.up.railway.app/api/posts/?cat=${cat}`);
        // Filter out current post from list of other posts
        const otherPosts = _.shuffle(res.data.filter((post) => post.id !== id));
        setPosts(otherPosts.slice(0, 3))
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  if (!posts.length) return null; // Return nothing if there are no posts

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <Link className="link" to={`/post/${post.id}`}>
            <img src={`http://res.cloudinary.com/dpvk1flpp/image/upload/v1672158335/${post?.img}`} alt="" />
            <h2>{post.title}</h2>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;
