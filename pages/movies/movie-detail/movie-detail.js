// pages/movies/movie-detail/movie-detail.js
var util = require("../../../utils/util.js");
Page({
  data:{},
  onLoad:function(options){
    var movieId=options.id;
    console.log(movieId);
    var Url="http://api.douban.com/v2/movie/subject/"+movieId;
    util.http(Url,this.callBack);
  },
  callBack:function(data){
    console.log(data);
    this.processData(data);
  },
  processData:function(data){
    var summary=data.summary;
    if(summary.length>134){
      summary = summary.substring(0, 125) + "..."
    };
    var movieData={
      summary:summary,
      title:data.title,
      country:data.countries[0],
      year:data.year,
      comments_count:data.comments_count,
      collect_count:data.collect_count,
      image:data.images.large,
      stars: util.convertToStarsArray(data.rating.stars),
      average: data.rating.average,
      directors:data.directors,
      casts:data.casts,
      genres:data.genres,
    };
    this.setData({
      movieData:movieData
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})