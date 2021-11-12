

export default class hardwareAPIService{
    static UpdateArticle(name, unitsUsed){
        console.log(unitsUsed)
        return fetch(`/update/${name}/`,{
            'method':'PUT',
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({"unitsUsed": unitsUsed})
          })
          .then(resp => resp.json())
    }

  //   static UpdateProjects(hardware, ){
  //     return fetch(`http://127.0.0.1:5000/updateProjects/`,{
  //         'method':'PUT',
  //         headers:{
  //           'Content-Type':'application/json'
  //         },
  //         body: JSON.stringify({"unitsUsed": unitsUsed})
  //       })
  //       .then(resp => resp.json())
  // }

  static UpdateHardwareCount(hardwareName, unitSum){
    return fetch(`/updateHardwareCount/`,{
        'method':'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({"hardwareName": hardwareName, "unitSum": unitSum})
      })
      .then(resp => resp.json())
  }

  static UpdateProjects(projects){
    return fetch(`http://127.0.0.1:5000/updateProjects/`,{
        'method':'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({"projects": projects})
      })
      .then(resp => resp.json())
    }
}
