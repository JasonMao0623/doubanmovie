var postsData = require("../../../data/posts-data.js");
var app = getApp();
Page({
  data: {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id;
    //this.data.postId = postId;
    this.setData({
      postId: postId,
    })
    var postData = postsData.postList[postId];
    //this.data.postData = postData;
    this.setData({
      postData: postData
    })
    //首先获取缓存“post_collected”里面的数据
    var postscollected = wx.getStorageSync('posts_collected');
    //判断缓存是否存在
    //如果缓存存在，拿到缓存里面的数据（根据postid拿），并且更新data文件
    //设置显示的样式
    if (postscollected) {
      var postcollected = postscollected[postId];
      this.setData({
        collected: postcollected
      })
    }
    //否则创建一个缓存的对象，设置缓存对象中对应的值为false
    //跟新缓存
    else {
      var postscollected = [];
      postscollected[postId] = false;
      wx.setStorageSync('posts_collected', postscollected);
    }
    //创建一个全局变量设置其他页面。。。。。
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true,
      })
    } else {
      this.setData({
        isPlayingMusic: false,
      })
    }
    this.setMusicMonitor();
  },
  //创建音乐监听
  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = that.data.postId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    })
  },
  //设置触摸的函数
  onCollectionTap: function (event) {
    //获取缓存对象
    var postscollected = wx.getStorageSync('posts_collected');
    //获取缓存中所选中的页面的值
    //this.data.postId从data数据中取
    var postcollected = postscollected[this.data.postId];
    //取反
    postcollected = !postcollected;
    this.showToast(postscollected, postcollected);
    //this.showModal(postscollected,postcollected);
  },
  /*showModal: function (postscollected,postcollected) {
    var that=this;
    wx.showModal({
      title: "收藏",
      content: postcollected ? "收藏该文章" : "取消收藏该文章",
      showCancel: "true",
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确定",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          //更新缓存
          postscollected[that.data.postId] = postcollected;
          wx.setStorageSync('posts_collected', postscollected);
          //跟新data数据,实现图片的切换
          that.setData({
            collected: postcollected
          });
        }
      }
    })
  },*/
  showToast: function (postscollected, postcollected) {
    //更新缓存
    postscollected[this.data.postId] = postcollected;
    wx.setStorageSync('posts_collected', postscollected);
    //跟新data数据,实现图片的切换
    this.setData({
      collected: postcollected
    });
    wx.showToast({
      title: postcollected ? "收藏成功" : "取消成功",
      duration: 1000
    })
  },
  onShareTap: function (event) {
    var itemList = [
      "分享到微博",
      "分享到微信",
      "分享到QQ",
      "分享到微信朋友圈"
    ];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        wx.showModal({
          title: "用户" + itemList[res.tapIndex],
          content: "取消的属性" + res.cancel
        })
      }
    })
  },
  onMusicTap: function (event) {
    var postId = this.data.postId;
    var postData = postsData.postList[postId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.imgUrl
      }),
        this.setData({
          isPlayingMusic: true
        })
    }

  },
  onShareAppMessage: function (event) {
    return {
      title: '离思五首·其四',
      desc: '曾经沧海难为水，除却巫山不是云',
      path: '/pages/posts/post-detail/post-detail'
    }
  }
  /* onUnload: function () {
     var readDatas = wx.getStorageSync('read_data'); 
     readDatas[this.data.postId].reading += 1; 
     readDatas[this.data.postId].collection += 1; 
     postsData.postList[this.data.postId].reading = readDatas[this.data.postId].reading;
      postsData.postList[this.data.postId].collection = readDatas[this.data.postId].collection; 
      wx.setStorageSync('read_data', readDatas);
   }*/
})