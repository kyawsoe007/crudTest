var m = require("mithril")
var User = require("../models/User")

module.exports = {
    oninit: function(vnode) {console.log('vnode',vnode,User.current)},
    oncreate:(vnode)=>{console.log('vnodeC',vnode)},
    onupate:(vnode)=>{console.log('vnodeU',vnode)},
    view: function(vnode) {
        User.current['id']=vnode.attrs.id
        User.current['firstName']=vnode.attrs.firstName
        User.current['lastName']=vnode.attrs.lastName
        let index=User.list.findIndex(x => x.id == vnode.attrs.id)
        var content=document.getElementsByClassName('content');
        
        return m("form", {
                style:{display:"flex"},
                onsubmit: function(e) {
                    e.preventDefault()
                    console.log('idForm',content[index])
                    let data={id:vnode.attrs.id,firstName:content[index].getElementsByClassName('input1')[0].value,
                    lastName:content[index].getElementsByClassName('input2')[0].value}
                    User.save(data,vnode.attrs.id)
                   // console.log('user',document.getElementById('input1').value)
                }
            }, 
            [
            m("input.input[type=text][placeholder=First name]", {
              // oninput: function (e) {vnode.attrs.firstName.add(e.target.value)},
                class:'input1',
                value: vnode.attrs.firstName,
                style:'margin-right:30px'
            }),
            m("input.input[placeholder=Last name]", {
                class:'input2',
                //oninput: function (e) {e.target.value},
                value:vnode.attrs.lastName,
                style:'margin-right:20px'
            }),
            m("button.button[type=submit]",{value:`btn+${User.current['id']}`,style:'width:10%;margin-right:9%;cursor:pointer;border-color:aqua;background-color:beige'}, "Update"),
        ]
        )
    }
}