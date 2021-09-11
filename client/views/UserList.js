var m = require("mithril")
var User = require("../models/User")
var UserForm =require("./UserForm")
var UserCreateForm=require("./UserCreateForm")
module.exports = {
    oninit: User.loadList,
    
    view: function() {
        return [m(".user-list", User.list.map(function(user,index) {
           return [
           [ m("div",{style:'display:flex'},    
            m(m.route.Link,{class:"collapsible",id:index,style:'width:90%;height:1%',
          onclick:function(e){
            User.editIndex(e.target.id)
          }
          },index+1,"|",
                 user.firstName+" "+user.lastName
                ),
                m('h3',{style:'margin-left:10px;margin-top:0px'},
                m('button', {onclick: function(){
                  User.delete(index)
                }, style: 'font-size: 15pt;height:119%;background-color:red;color:white;cursor:pointer'}, 'Delete'),
              ), 
            ),],
                m("div",{class:"content"}, 
                m(UserForm, {id:User.Index})
                ),
              ]
        })),
        m("div",m(UserCreateForm))]

    }
}