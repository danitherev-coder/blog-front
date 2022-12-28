import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import DisqusComments from "../components/Disqus";
import Swal from "sweetalert2";


const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://blog-mysql-api-production.up.railway.app/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);


  // const updatedAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  // const timeSinceUpdate = moment(updatedAt).fromNow();

  const handleDelete = async () => {

    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás recuperar este elemento una vez eliminado',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar',
      }).then(async (result) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user.token;
        if (result.value) {         
          // Ejecutar acción de eliminación aquí
          await axios.delete(`https://blog-mysql-api-production.up.railway.app/api/posts/${postId}`, {
            headers: {
              "x-access-token": token,
            }
          });
          navigate("/")
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El elemento ha sido eliminado',
          })
        }
      });

    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal',
      })

    }
  }

  // const getText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html")
  //   return doc.body.textContent
  // }

  return (
    <div className="single">
      <div className="content">
        <img src={`http://res.cloudinary.com/dpvk1flpp/image/upload/v1672158335/${post?.img}`} />
        <div className="user">
          {post.userImg && <img
            src={post.userImg}
            alt="a"
          />}
          <div className="info">
            <span>{post.username}</span>
            {/* // si no edite el post, que se muestre la fecha de creacion, sino que aparezca el mensaje de actualizo el:  */}
            {post.updatedAt ? <p>Actualizado {moment(post.updatedAt).fromNow()}</p> : <p>Publicado {moment(post.createdAt).fromNow()}</p>}
            {/* <p>Posted {moment(post.date).fromNow()}</p> */}
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
        <hr />
        <div id="disqus_thread"></div>
        {/* <DiscussionEmbed
          shortname='example'
          config={{
            url: `https://localhost:3000`,
            identifier: post.id,
            title: post.title,
          }}
        /> */}
        <DisqusComments />
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;

