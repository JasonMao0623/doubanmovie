var postData=require("../../data/posts-data.js");
Page({
  data:{

  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({postList:postData.postList});
    //this.data.postList=postData.postList;
  },
  onPostTap:function(event){
    var postId=event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },
  onSwiperTap:function(event){
    var postId=event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },
  /*onShow:function(){
    var readDatas=wx.getStorageSync('read_data');
    if(readDatas){
      for(var index in readDatas){
        var reading =readDatas[index].reading;
        var collection=readDatas[index].collection;
        this.data.postList[index].reading=reading;
        this.data.postList[index].collection=collection;
      }
    }else{
      var readDatas={};
        for(var idx=0;idx++;idx<5){
          readDatas[idx].reading=0;
          readDatas[idx].collection=0
        }
      wx.setStorageSync('read_data', readDatas);
    }
  }*/
})