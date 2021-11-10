import './App.css';
import './Hardware.css';
import {useState, useEffect} from "react";
import HardwareList from './components/HardwareList';
import Form from './components/Form';
import ProjectList from './components/ProjectList';
import Dropdown from './components/Dropdown';
import {Navbar} from "./Toolbar.jsx"


export function Hardware () {

  const [articles, setArticles] = useState([])
  const [editedArticle, setEditedArticle] = useState(null)

  const [projects, setProjects] = useState([])
  const [project , setProject] = useState([])


  useEffect(() => {
    console.log("hi im in useeffect")
    fetch("http://127.0.0.1:5000/get",{
      'method':"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))

  },[])

  useEffect(() => {
    console.log("Hi im in loading Projects")
    fetch("http://127.0.0.1:5000/getProjects",{
      'method':"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(resp => resp.json())
    .then(resp => setProjects(resp))
    .catch(error => console.log(error))

  },[])

  const editArticle = (article) => {
    // console.log("Hello World")
    setEditedArticle(article)
  }

  const updatedData = (article) => {
    const new_article = articles.map(my_article => {
      if (my_article.name === article.name){
        return article
      }else{
        return my_article
      }
    })
    setArticles(new_article)
  }

  const deleteArticle = (article) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.name === article.name){
        return false;
      }else{
        return true;
      }
    })
    setArticles(new_articles)
  }

  let handleProjectChange = (e) => {
    setProject(e.target.value)
  }


  return (
    
    <div>
        <Navbar/>
      {/* <h1> Flask and React Course </h1> */}
      <div className = "big_container">
        <div className = "container1">
            <HardwareList articles = {articles} editArticle = {editArticle} deleteArticle = {deleteArticle} projects = {projects}/>
            {/* {editedArticle ? <Form article = {editedArticle} updatedData = {updatedData} projects = {projects}/> : null} */}
        </div>

        <div className = "container2">
          {editedArticle ? <Form article = {editedArticle} updatedData = {updatedData} projects = {projects}/> : null}
            {/* <ProjectList projects = {projects}/> */}
        </div>
      </div>


      

      {/* {project}
      <br/>
      <select onChange = {handleProjectChange}>
        <option value = "Select a Project"> Select a Project</option>
        {projects.map((project) => <option key = {project.projectName}>{project.projectName} and {project.funds}</option>)}
      </select> */}
    </div>
  );
}

