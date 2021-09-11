var m = require("mithril")
var User = require("../models/User")
var UserData={id:0,firstName:"",lastName:""}
module.exports = {
    
    view: function() {
       
        function firstNameChanged(ev) {
            UserData.firstName = ev.target.value;
          }
          function lastNameChanged(ev) {
            UserData.lastName = ev.target.value;
          } 
        return m("form", {
            style:{display:"flex"},
                onsubmit: function(e) {
                    e.preventDefault()
                    User.create(UserData)
                    .then(
                    function(){UserData.id=0;
                    UserData.firstName="";
                    UserData.lastName="";
                    })}
            }, 
            [
            m("input.input[type=text][placeholder=First name]", {
                type:'text',
                onchange: firstNameChanged,
                value: UserData.firstName,
                style:'margin-right:6px'
            }),
            m("input.input[placeholder=Last name]", {
                onchange:lastNameChanged,
                value: UserData.lastName,
                style:'margin-right:17px'
            }),
            m("button.button[type=submit]",{style:'width:10%;cursor:pointer;border-color:aqua;background-color:beige'}, "Add"),
        ]
        )
    }
}