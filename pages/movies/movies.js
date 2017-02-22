var app = getApp();
var util = require("../../utils/util.js");
Page({
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        containerShow: true,
        searchPanelShow: false,
        searchResult:{},
    },
    onLoad: function () {
        var inTheatersUrl = app.globalData.doubanBase + "/v2/movie/in_theaters" + "?start=0&&count=3";
        var comingSoonUrl = app.globalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&&count=3";
        var top250Url = app.globalData.doubanBase + "/v2/movie/top250" + "?start=0&&count=3";
        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "豆瓣TOP250");

    },
    onBindFocus: function (event) {
        this.setData({
            containerShow: false,
            searchPanelShow: true
        })
    },
    onBindChange: function (event) {
        var text = event.detail.value;
        this.getSearchDataList(text);
    },
    getSearchDataList: function (text) {
        var url = "http://api.douban.com/v2/movie/search?q=" + text;
        this.getMovieListData(url,"searchResult","");
    },
    onXxTap: function (event) {
        this.setData({
            containerShow: true,
            searchPanelShow: false
        })
    },
    getMovieListData: function (Url, setTedKey, categoryTitle) {
        var that = this;
        wx.request({
            url: Url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                "Content-Type": "application/xml"
            }, // 设置请求的 header
            success: function (res) {
                that.processDoubanData(res.data, setTedKey, categoryTitle)
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    },
    processDoubanData: function (moviesDouban, setTedKey, categoryTitle) {
        var movies = [];
        for (var idx in moviesDouban.subjects) {
            var subject = moviesDouban.subjects[idx];
            var title = subject.title
            if (title.length > 6) {
                title = title.substring(0, 6) + "..."
            }
            var temp = {
                stars: util.convertToStarsArray(subject.rating.stars),
                title: title,
                average: subject.rating.average,
                coverageUrl: subject.images.large,
                movieId: subject.id
            }
            movies.push(temp);
        }
        var readyData = {};
        readyData[setTedKey] = {
            categoryTitle: categoryTitle,
            movies: movies
        };
        this.setData(readyData);
    },
    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: "more-movie/more-movie?category=" + category
        })
    },
    onMovieTap2: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        wx.navigateTo({
            url: '/pages/movies/movie-detail2/movie-detail2?id=' + movieId
        })
    }
})