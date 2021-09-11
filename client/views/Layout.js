var m = require("mithril")

module.exports = {
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