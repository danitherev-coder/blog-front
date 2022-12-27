import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res;
        if (cat) {
          res = await axios.get(`https://blog-mysql-api-production.up.railway.app/api/posts${cat}&page=${page}&?pageSize=${pageSize}`);
        } else {
          res = await axios.get(`https://blog-mysql-api-production.up.railway.app/api/posts?page=${page}&pageSize=${pageSize}`);
        }
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();    
  }, [cat, page, pageSize]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  function handleChange(event) {
    event.preventDefault();
    setQuery(event.target.value);
  }

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(query.toLowerCase());
  });


  const loadMore = async () => {
    try {
      setPage(page + 1);
      let res;
      if (cat) {
        res = await axios.get(`https://blog-mysql-api-production.up.railway.app/api/posts${cat}&page=${page}&pageSize=${pageSize}`);
      } else {
        res = await axios.get(`https://blog-mysql-api-production.up.railway.app/api/posts?page=${page}&pageSize=${pageSize}`);
      }
      
      setPosts([...posts, ...res.data]);
    } catch (err) {
      console.log(err);
    }
  };
  
  

  return (
    <div className="home">
      <form>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
      </form>
      <div className="posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img
                  // src={`../upload/${post.img}`}
                  src={`http://res.cloudinary.com/dpvk1flpp/image/upload/v1672158335/${post.img}`}
                  alt=""
                  style={{ width: "400px", height: "250px" }}
                />
              </div>
              <div className="content">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.desc)}</p>
                <Link className="link" to={`/post/${post.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No results</p>
        )}
        {filteredPosts.length === pageSize && (
          <button onClick={loadMore}>Mostrar más</button>
        )}
      </div>
    </div>
  );
};

export default Home;
