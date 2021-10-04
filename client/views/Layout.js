var m = require("mithril")
var User=require("../models/User")
module.exports = {
   // oninit:User.UserData,
    // oncreate:User.UserData,
    // onupdate:User.UserData,
    view: function(vnode) {
        return m("main.layout", [
            m("nav.menu", [
               m("h1",{href:"/list"},"Users")
                // m(m.route.Link, {href: "/list"}, "Users")
            ]),
            m("section", vnode.children)
        ])
    }
}