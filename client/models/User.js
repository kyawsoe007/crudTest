var m = require("mithril")
var initSqlJs=require ("sql.js");
var regen=require ('regenerator-runtime/runtime');
// Required to let webpack 4 know it needs to copy the wasm file to our assets
//import sqlWasm from "./node_modules/file-loader/dist/cjs.js";
let db
let arrayOfUser=[]
var User = {
    list: [],
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
          //  User.load(parseInt(e)+1)
          content[e].style.display="block";
        }
           
    },
    UserData:async ()=> {
       const SQL= await initSqlJs({locateFile:file=>`https://sql.js.org/dist/${file}`})
       db=new SQL.Database()
    
          var sqlstr = "CREATE TABLE user (id int, firstName char,lastName char); \
       INSERT INTO user VALUES (1, 'user','name'); \
       INSERT INTO user VALUES (2, 'kyaw','soe');";
       db.exec(sqlstr);
       const res = db.exec("SELECT * FROM user");
       console.log('res',res)
        if(res.length!=0){
            let userArray=[]
          for(var value in res){
                     for(var i=0;i<res[value].values.length;i++){
                        let userObj={}
                userObj['id']=res[value].values[i][0]
                userObj['firstName']=res[value].values[i][1]
                userObj['lastName']=res[value].values[i][2]
                userArray.push(userObj)
            }
            
          }
          arrayOfUser=userArray
          User.list=userArray
        }
        return arrayOfUser
    },
   

    loadList: function() {
      this.UserData
        console.log('hello4')
   return (
            User.list)
    },

    current: {},
    load: function(id) {
       // console.log('hello3',arrayOfUser)
        return m.request({
            method: "GET",
            url: "https://rem-rest-api.herokuapp.com/api/users/" + id,
            withCredentials: true,
        })
        .then(function(result) {
            console.log('idG',arrayOfUser)
            //User.UserData
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
              //  User.UserData
            let createBody={id:User.list.length+1,firstName:data.firstName,lastName:data.lastName}
           let array=Object.values(createBody)
           let sqlQueryCreate= `INSERT INTO user VALUES (${array[0]}, '${array[1]}','${array[2]}');`
            db.exec(sqlQueryCreate);
            const res = db.exec("SELECT * FROM user");
            
            if(res.length!=0){
                let userArray=[]
              for(var value in res){
                         for(var i=0;i<res[value].values.length;i++){
                            let userObj={}
                    userObj['id']=res[value].values[i][0]
                    userObj['firstName']=res[value].values[i][1]
                    userObj['lastName']=res[value].values[i][2]
                    userArray.push(userObj)
                }
                
              }
              arrayOfUser=userArray
              User.list=userArray
            }

        }
        )
    },

    delete:function(id){
      let sqlQueryDelete= `DELETE FROM user WHERE id=${id};`
      db.exec(sqlQueryDelete);
      const res = db.exec("SELECT * FROM user");
      console.log('resDelete',res)
      if(res.length!=0){
          let userArray=[]
        for(var value in res){
                   for(var i=0;i<res[value].values.length;i++){
                      let userObj={}
              userObj['id']=res[value].values[i][0]
              userObj['firstName']=res[value].values[i][1]
              userObj['lastName']=res[value].values[i][2]
              userArray.push(userObj)
          }
          
        }
        arrayOfUser=userArray
        User.list=userArray
      }
    },

    save: function(data,id) {
      let index=User.list.findIndex(x => x.id == id)
      let sqlQueryUpdate=`UPDATE user SET firstName='${data.firstName}', lastName='${data.lastName}'  WHERE id='${id}'`
     db.exec(sqlQueryUpdate)
     const res=db.exec("SELECT * FROM user");
     console.log('resU',res)
      User.list[index]=data;
       var content=document.getElementsByClassName('content');
      // console.log('id',content[index].getElementsByClassName('input1')[0].value)
      if(content[index].style.display==="block"){
        content[index].style.display="none";
      }
    }
}

module.exports = User