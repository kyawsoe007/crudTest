var m = require("mithril")

var User = {
    list: [{id:1,firstName:"Kyaw",lastName:"Soe"},{id:2,firstName:"Soe",lastName:"Ye"}],
    Index:1,
    editIndex:function editIndex(e){
        //Index=parseInt(e)
        var rowData=document.getElementById(e)
        rowData.classList.toggle("active");
        console.log('rowData',rowData)
        var content=document.getElementsByClassName('content');
        console.log('content',content)
        if(content[e].style.display==="block"){
          content[e].style.display="none";
        }else {
            User.load(parseInt(e)+1)
          content[e].style.display="block";
        }
           
    },
    loadList: function() {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users",
            withCredentials: true,
        })
        .then(function(result) {
            User.list
        })
    },

    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + id,
            withCredentials: true,
        })
        .then(function(result) {
            console.log('idG',User.Index)
            let index=User.list.findIndex(x => x.id == id)
            User.current = User.list[index]
        })
    },

    create:function(data){
        return m.request({
            method: "POST",
            url: "https://rem-rest-api.herokuapp.com/api/users/",
            body: data,
        })
        .then(
            function(result){
            let createBody={id:User.list.length+1,firstName:data.firstName,lastName:data.lastName}
            User.list.push(createBody)
        }
        )
    },

    delete:function(id){
        return m.request({
            method: "DELETE",
            url: "https://rem-rest-api.herokuapp.com/api/users/"+id,
           // withCredentials:true,
        })
        .then(function(result){
           // let index=User.list.findIndex(x => x.id == id)
           User.list.splice(id,1)
        })
    },

    save: function() {
        return m.request({
            method: "PUT",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + User.current.id,
            body: User.current,
            withCredentials: true,
        })
        .then(function(result){
            //console.log('id',User.current)
            let index=User.list.findIndex(x => x.id == User.current.id)
            User.list[index]=User.current;
            var content=document.getElementsByClassName('content');
            if(content[index].style.display==="block"){
              content[index].style.display="none";
            }else {
              content[index].style.display="block";
              User.load(parseInt(index)+1)
              //editId=editId+1
            }

        })
    }
}

module.exports = User