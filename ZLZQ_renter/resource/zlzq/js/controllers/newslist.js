define(['BaseView', "cUIInputClear","cUIImageSlider" ,"Model", "Store","UIScroll","cRange","text!TplNewsList"], function (BaseView, cUIInputClear,cUIImageSlider, Model, Store,cUIScroll,cRange,TplNewsList) {
    var self,
        listModel=Model.ListModel.getInstance();
    var View = BaseView.extend({
        ViewName: 'newslist',
        hasTouch :'ontouchstart' in window,
        events: {

            "click .house-list li": "toDecorateDetail",
            "click .bottom-bar .rent":"toRent",
            "click .bottom-bar .mine":"toPersonal",
            "click .bottom-bar .order":"toOrderList",
            "click .bottom-bar .schedule":"toSchedule",
            "click .search-icon":"toSearch"
        },

        toDecorateDetail:function(e){
            var target = $(e.currentTarget);
            self.showLoading();
            Lizard.goTo("newsdetail.html?d=" + target.data("id"));
        },
        ajaxException: function (msg) {
            self.hideLoading();
            self.showMyToast('网络错误，请重试', 2000);
        },
        onCreate: function () {
            self = this;

        },
        getList:function(callback){
            var url=Lizard.host+Lizard.apiUrl+"newsitems",
                paras={},
                method="get";
            self.showLoading();
            $.ajax({
                url: url,
                dataType: "json",
                type: method,
                data:paras,
                success: function (data) {
                    self.hideLoading();

                    self.$el.html(_.template(TplNewsList, {list: data}));

                },
                error: function (e) {
                    self.showMyToast("网络错误", 1000);
                    self.hideLoading();
                }
            });
        },
        onShow: function () {
            $("#headerview").hide();
            self.hideLoading();
            self.setHeader();
            self.getList();


        },

        //设置标题
        setHeader: function () {
            self.header.set({
                title: '新闻动态',
                back: true,
                backtext: '<i class="icon-back "></i> ',
                view: this,
                events: {
                    returnHandler: function () {
                        Lizard.goTo("newindex.html");
                    },
                    commitHandler: function () {

                    }
                }
            });
        },
        onHide: function () {

        }
    });
    return View;
});


