

export default class APIService{
    static UpdateArticle(name, unitsUsed){
        console.log(unitsUsed)
        return fetch(`http://127.0.0.1:5000/update/${name}/`,{
            'method':'PUT',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({"unitsUsed": unitsUsed})
          })
          .then(resp => resp.json())
    }

    static DeleteArticle(name){
        return fetch(`http://127.0.0.1:5000/delete/${name}/`,{
            'method':'DELETE',
            headers:{
              'Content-Type':'application/json'
            },
          })
    }
}
