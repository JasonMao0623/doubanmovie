// pages/welcome/welcome.js
Page({
  onTap:function(event){
    wx.switchTab({
      url: "/pages/post/post"
    })
  },
  onShareAppMessage: function (event) {
        return {
            title: '离思五首·其四',
            desc: '曾经沧海难为水，除却巫山不是云',
            path: '/pages/posts/post-detail/post-detail?id=0'
        }
    }
})