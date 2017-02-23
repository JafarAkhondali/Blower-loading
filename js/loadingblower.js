/*
 Author: Jafar Akhondali
 Company: DioStudio
 Release date: 2016, 24 Jul
 Title:  Jquery + svg animated loading bar
 Design idea:
 Thanks to @joomlachannel
 */


function LoadingBlower(selector,callback) {
    this.callback = callback;
    this.blowerdom = $(selector);
    this.filler =  this.blowerdom.find(".filler");
    this.marker_container = this.blowerdom.find(".marker_container");
    this.loadingbar = this.blowerdom.find(".loadingbar");
    this.progressDom = this.blowerdom.find(".value");
    this.progress = 0;
    this.deg = 0;
    this.leafObjects = 0;
    this.leafObjects = [];

    this.filler[0].style.width = "0%";


    this.createAndMoveLeaf = function () {
        var l = $("<div class='leaf'></div>");
        this.leafObjects.push(l);
        this.loadingbar.append(l);
        setTimeout(function () { 
            $(l).css('right','100%').css({
                'transform':'rotate('+ (Math.random()>0.5 ? '-':'+' )+'135deg)',
                //'top'      : (5+Math.random()*40) + 'px'
                'animation':  (Math.random()>0.5 ? 'wind':'wind-up' ) + ' 3s infinite ease-in-out'

        });
        },10);
    };

    this.addLeaf = function () {
        var that = this;
        if(this.leafObjects > 0) {
            var timeOut = 20 + Math.random() * 150;
            setTimeout(function () {
                that.leafHandler(that);
            },timeOut);
        }
    };

    this.leafHandler = function (that) {
        that.createAndMoveLeaf();
        that.leafObjects--;
        that.addLeaf();
    };



    this.setProgress = function (progress) {
        var dif  = progress-this.progress;
        this.addProgress(dif);
    };

    this.addProgress = function (dif) {

        var progress = dif+this.progress >100 ? 100 : dif+this.progress;

        var degs = progress*-30; //deg size to rotate
        this.deg -= degs;
        if(dif>0){
            this.leafObjects += dif; //Math.ceil(dif/5); //dif = no leafObjects to blow
            this.rotate(this.marker_container,degs);
            this.progress = progress;
            this.intervalValue == 0 ? this.intervalCheck() : null ;
        }
    };

    this.intervalValue = null;

    this.intervalCheck = function () {
        this.addLeaf();
        var that = this;
        this.intervalValue = setInterval(function () {
            for(var i=0;i<that.leafObjects.length;i++)
                if( parseInt(that.leafObjects[i].offset().left) <=  parseInt(that.filler.offset().left)+parseInt(that.filler.width()) ) { //leaf collide with filler
                    console.log(
                        parseInt(that.leafObjects[i].offset().left) ,
                        parseInt(that.filler.offset().left)+parseInt(that.filler.width())
                    );

                    //console.log((parseInt(that.filler[0].style.width)+5));
                    that.filler.css('width', (parseInt(that.filler[0].style.width)+1) + '%');
                    that.progressDom.html((parseInt(that.filler[0].style.width)+1) + '%');
                    //that.leafObjects;// <= 0 ? clearInterval(that.intervalValue) : 0;
                    if(that.leafObjects === 0){
                        //clearInterval(that.intervalValue);
                        that.intervalCheck();
                        //that.intervalValue = null;
                    }

                    that.leafObjects[i].hide();
                    that.leafObjects.splice(i,1);
                }
        },50);
    };


    this.rotate = function (el, degrees) {
        el.css({
            '-webkit-transform' : 'rotate('+degrees+'deg)',
            '-moz-transform' : 'rotate('+degrees+'deg)',
            '-ms-transform' : 'rotate('+degrees+'deg)',
            '-o-transform' : 'rotate('+degrees+'deg)',
            'transform' : 'rotate('+degrees+'deg)',
            'zoom' : 1
        });
    }

}


