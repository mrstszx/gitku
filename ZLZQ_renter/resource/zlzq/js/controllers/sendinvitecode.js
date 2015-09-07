/**
 * Created by Administrator on 2015/8/24.
 */
define(['BaseView', "cUIInputClear","cUIImageSlider" ,"Model", "Store","UIGroupSelect","text!TplSendinvite","UIAlert"],
    function (BaseView, cUIInputClear,cUIImageSlider, Model, Store,UIGroupSelect,TplSendinvite,cUIAlert) {
        var self;

        var View = BaseView.extend({
            ViewName: 'sendinvitecode',
            events: {

                "click .sendconfirm .sendinvite-btn":"toCondirmcoder"
            },
            showMyToast: function (msg, time) {
                self.showToast({
                    datamodel: {
                        content: msg
                    },
                    maskToHide: false,
                    hideSec: time
                });
            },
            onCreate: function () {
                self = this;
                self.$el.html(TplSendinvite);
            },
            onShow: function () {
                self.$el.html(TplSendinvite)

                self.setrewHeader();
                self.hideLoading();

            },
            toCondirmcoder:function(){

                var mobile = $.trim(self.$el.find(".sendconfirm_invite").val());

                if (!mobile) {
                    this.showMyToast("请输入手机号再点击提交！", 1000);

                    return;
                }
                if (!this.isMobile(mobile)) {
                    this.showMyToast("手机号码不正确", 1000);
                    return;
                }
                this.showLoading();


            },
            isMobile:  function (a) {
                var b = /^(1[3-8][0-9])\d{8}$/;
                return b.test(a)
            },
            //设置标题
            setrewHeader: function (type) {
                self.header.set({
                    title: '发送邀请码',
                    back: true,
                    backtext: '<i class="icon-back"></i> ',
                    view: this,
                    events: {
                        returnHandler: function () {
                            Lizard.goTo("newindex.html");
                        },
                        commitHandler: function () {

                        }
                    }
                });
            }

        })



        return View;

    });

