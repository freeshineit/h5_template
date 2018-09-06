import './index.scss';
import leaves1 from '../../assets/images/autumn-leaves-1.jpg'
import leaves2 from '../../assets/images/autumn-leaves-2.jpg'

// //扇形
CanvasRenderingContext2D.prototype.sector = function (x, y, radius, sAngle, eAngle) {
    this.save();
    this.beginPath();
    this.moveTo(x,y);
    this.arc(x, y, radius, sAngle*Math.PI/180, eAngle*Math.PI/180, false);
    this.closePath();    
    this.restore();
    return this;
}

var dpr = window.devicePixelRatio;

class Plus {
    constructor () {
        
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.img = new Image();
        this.imgArg = {};
        this.img2 = new Image();
        this.getBrowser()
    }

    getBrowser () {
        var browser = {
            versions: function() {
                var u = navigator.userAgent, app = navigator.appVersion;
                return {     //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            } (),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }
        console.log(browser.versions.mobile)
        if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
            /* var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
            //在微信中打开
            setInterval(WeixinJSBridge.call('closeWindow'),2000);
            }
            if (ua.match(/WeiBo/i) == "weibo") {
            //在新浪微博客户端打开
            }
            if (ua.match(/QQ/i) == "qq") {
            //在QQ空间打开
            }
            if (browser.versions.ios) {
            //是否在IOS浏览器打开
            } 
            if(browser.versions.android){
            //是否在安卓浏览器打开
            }*/
            $(this.canvas).css({width: $(document).width(), height: $(document).height()})
            $(this.canvas).attr({width: $(document).width() * dpr ,height: $(document).height() * dpr - 200})
        } else {
            $(this.canvas).css({width: $(document).width(), height: $(document).height()})
            $(this.canvas).attr({width: $(document).width(), height: $(document).height()})
        }
    }

    render () {
        var ctx = this.ctx;
 
        const _this = this;

        var position = {
            sX: 0,
            sY: 0,
            eX: 0,
            eY: 0,
            dX: 0,
            dY: 0
        }
        var eAngle = 0

        this.img.src = leaves1;
        this.img.onload = () => {
            this.imgArg.w = this.img.width
            this.imgArg.h = this.img.height

            _this.img2.src = leaves2;
            _this.img2.onload = () => {
                _this.renderImg()
            }
        }

        $('#canvas').off('touchstart').on('touchstart', (e) => {
            var touch = e.touches[0];
            position.sX = touch.pageX
            position.sY = touch.pageY
        })
        .off('touchmove').on('touchmove', (e) => {
            var touch = e.touches[0];

            position.dX = touch.pageX - position.sX
            position.dY = touch.pageY - position.sY

            eAngle = parseInt(eAngle - position.dY)
            position.sX = touch.pageX
            position.sY = touch.pageY

            if (eAngle > 0 && eAngle <= 360) {
                this.renderImg(eAngle)
            }

            if (eAngle > 360) {
                eAngle = 360
                this.renderImg(eAngle)
            }
            if (eAngle < 0) {
                eAngle = 0
                this.renderImg(eAngle)
            }

        }).off('touchend').on('touchend', (e) => {
        })
    }

    renderImg (eAngle) {
        this.resetSector(eAngle);
    }

    resetSector (eAngle) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.drawImage(this.img2, 0, 0, this.canvas.width, this.canvas.width / this.imgArg.w * this.imgArg.h);
        this.ctx.sector(this.canvas.width / 2, this.canvas.width / 2, this.canvas.width / 2, 0, eAngle);
        // 将上面的区域作为剪辑区域
        this.ctx.clip();
        // 由于使用clip()，画布背景图片会出现在clip()区域内
        this.ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.width / this.imgArg.w * this.imgArg.h);
        this.ctx.restore();
    }
}

let plus = new Plus()

plus.render();
