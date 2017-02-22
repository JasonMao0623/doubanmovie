// pages/movies/movie-detail/movie-detail.js
var util = require("../../../utils/util.js");
var app = getApp();
Page({
  data: {
    isImgTap:false
  },
  onLoad: function (options) {
    var movieId = options.id;
    var Url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId;
    util.http(Url, this.callBack);
  },
  callBack: function (data) {
    console.log(data);
    this.processData(data);
  },
  processData: function (data) {
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatar != null) {
        director.avatar = data.directors[0].avatar.large
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var summary = data.summary;
    if (summary.length > 100) {
      summary = summary.substring(0, 100) + "..."
    };
    var movieData = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: util.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: util.convertToCastString(data.casts),
      castsInfo: util.convertToCastInfos(data.casts),
      summary:summary
    };
    this.setData({
      movie: movieData
    })
  },
  onMovieImgTap:function(event){
    var imgsrc=event.currentTarget.dataset.src;
    wx.previewImage({
      current: imgsrc, // 当前显示图片的链接，不填则默认为 urls 的第一张
      urls: [imgsrc],
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})