var util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    movies: {},
    requestUrl: {},
    totalData: 0,
    isEmpty:true
  },
  onLoad: function (option) {
    var category = option.category;
    this.setData({
      navigateTitle: category
    })
    console.log(category);
    var dataUrl = "";
    switch (category) {
      case "正在热映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase + "/v2/movie/coming_soon"
        break;
      case "豆瓣TOP250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250"
        break;
    };
    this.setData({
      requestUrl: dataUrl
    })
    util.http(dataUrl, this.callBack);
    wx.showNavigationBarLoading();
  },
  callBack: function (data) {
    console.log(data);
    var subjects = data.subjects;
    this.processData(subjects)
  },
  processData: function (subjects) {
    var array = [];
    for (var i in subjects) {
      var title = subjects[i].title;
      if (title.length > 6) {
        title = title.substring(0, 6) + "..."
      }
      var temp = {
        stars: util.convertToStarsArray(subjects[i].rating.stars),
        title: title,
        average: subjects[i].rating.average,
        coverageUrl: subjects[i].images.large,
        movieId: subjects[i].id
      };
      array.push(temp);
    };
    var totalMovies={};
    //如果需要绑定新的数据，就需要和旧的数据合并在一起。
    if(!this.data.isEmpty){
      totalMovies=this.data.movies.concat(array);
    }else{
      totalMovies=array;
      this.data.isEmpty=false;
    }
    //每次刷新数据时totalDataData+20；
    var totalData=this.data.totalData;
    totalData+=20;
    this.setData({
      totalData: totalData
    })
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading();
  },
  //实现往下滚动添加数据
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalData + "&&count=20";
    util.http(nextUrl, this.callBack);
    console.log("刷新")
  },
  //实现下拉刷新的函数；
  onPullDownRefresh:function(){
    this.data.movies={};
    this.data.totalData=0;
    this.data.isEmpty=true;
    var refreshUrl=this.data.requestUrl+"?start=0&&count=20";
    util.http(refreshUrl, this.callBack);
    wx.showNavigationBarLoading();
  },  
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle,
      success: function (res) {
        // success
      }
    })
  },
onMovieTap2:function(event){
        var movieId=event.currentTarget.dataset.movieid;
        wx.navigateTo({
          url: '/pages/movies/movie-detail2/movie-detail2?id='+movieId
        })
    }
})