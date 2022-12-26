import React, { useState } from "react";
import hljs from 'highlight.js'
import "highlight.js/styles/base16/monokai.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";




const Write = () => {

  hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'rust'],
  })

  const modules = {
    syntax: {
      // highlight: text => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'code-block': true }, 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean'],
      [{ 'color': [] }],
    ]
  }


  const formats = [
    'header', 'bold', 'italic', 'underline', 'list', 'bullet', 'align', 'link', 'image', 'color', 'code-block', 'blockquote'
  ]


  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("https://blog-mysql-api-production.up.railway.app/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      if (state) {
        // Actualizar post
        await axios.put(`https://blog-mysql-api-production.up.railway.app/api/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : state.img,
          updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
        Swal.fire({
          icon: 'success',
          title: 'Post actualizado',
          text: 'Se ha actualizado el post con éxito',
        });
        navigate('/')
      } else {
        // Crear nuevo post
        e.preventDefault()
        await axios.post(`https://blog-mysql-api-production.up.railway.app/api/posts`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });

        Swal.fire({
          icon: 'success',
          title: 'Post creado',
          text: 'Se ha creado el post con éxito',
        });
      }

      navigate("/");

    } catch (err) {
      // Manejar errores aquí
      let errores = err.response.data.message.map(error => error.msg)
      Swal.fire({
        icon: 'error',
        title: 'Hubo un error',
        // text: errores.join(', ')+'\n',
        // text: errores.join('<ul><li>'),
        html: '<ul style="list-style: none;font-size:15px"><li>' + errores.join('</li><li>') + '</li></ul>'
      })

      if (err.response.data.code === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error',
          text: 'INTERNAL SERVER ERROR',
        })
      }
    }

  };



  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          // onChange={(e) => setTitle(e.target.value)}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />


        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;