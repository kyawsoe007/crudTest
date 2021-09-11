var m = require("mithril")
var User = require("../models/User")

module.exports = {
  //  oninit: function(vnode) {User.load(vnode.attrs.id,console.log('vnode',vnode))},
    view: function() {
        return m("form", {
                style:{display:"flex"},
                onsubmit: function(e) {
                    e.preventDefault()
                    User.save()
                }
            }, 
            [
            m("input.input[type=text][placeholder=First name]", {
                oninput: function (e) {User.current.firstName = e.target.value},
                value: User.current.firstName,
                style:'margin-right:30px'
            }),
            m("input.input[placeholder=Last name]", {
                oninput: function (e) {User.current.lastName = e.target.value},
                value: User.current.lastName,
                style:'margin-right:20px'
            }),
            m("button.button[type=submit]",{style:'width:10%;margin-right:9%;cursor:pointer;border-color:aqua;background-color:beige'}, "Update"),
        ]
        )
    }
}