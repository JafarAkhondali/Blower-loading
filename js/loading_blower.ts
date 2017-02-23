/*
 Author: Jafar Akhondali
 Company: DioStudio
 Release date: 2016, 24 Jul
 Title:  Jquery plugin + svg animated loading bar
 Design idea:
 Thanks to @joomlachannel
 */
class Leaf{
    private progress = 1;
    constructor(progress:number){
        this.progress = progress;
    }
    public static getNewLeaf(progress:number=1):HTMLDivElement{
        /*let div = document.createElement("div");
         div.className="leaf";
         return div;
         */
        return $("<div class='leaf'></div>");
    }
}

class LoadingBlower{

    private markerContainer: HTMLElement;
    public leafObjects: HTMLElement[];
    private progressDom: HTMLElement;
    private intervalValue: number=0;
    private loadingBar: HTMLElement;
    private blowerDom: HTMLElement;
    private fillerWidth:number=0;
    private calllback: Function;
    private filler: HTMLElement;
    private leafCount: number=0;
    private progress: number=0;



    constructor(
        selector:string,
        callback:Function
    ){
        this.calllback = callback;
        this.blowerDom = $(selector);
        this.filler = $(this.blowerDom.find(".filler")[0]);

        this.markerContainer =this.blowerDom.find(".marker_container");
        this.loadingBar = this.blowerDom.find(".loadingbar");
        this.progressDom = this.blowerDom.find(".value");
        this.leafObjects = new Array<HTMLElement>();
    }


    private createAndMoveLeaf():void{
        setTimeout(()=>{
            let leaf = Leaf.getNewLeaf();
            this.leafObjects.push(leaf);
            this.loadingBar.append(leaf);
            $(leaf).css({
                'transform':'rotate('+ (Math.random()>0.5 ? '-':'+' )+'195deg)',
                'animation':  (Math.random()>0.5 ? 'wind':'wind-up' ) + ' 3s infinite ease-in-out'
            });
        },10);
    }

    private addLeaf():void {
        if(this.leafCount > 0){
            let timeOut = 20 + Math.random()*150 ;
            setTimeout(()=>{
                this.createAndMoveLeaf();
                this.leafCount--;
                this.addLeaf();
            },timeOut);
        }
    }

    public setProgress(progress:number):void{
        let diff = progress-this.progress;
        this.addProgress(diff);
    }

    public addProgress(dif:number):void{
        if(this.progress === 100)
            return;
        let progress:number = dif+this.progress >100 ? 100 : dif+this.progress;
        let degs:number = progress *-30;
        if(dif>0){
            this.leafCount+=dif;
            this.rotate(this.markerContainer,degs);
            this.progress = progress;
            this.addLeaf();
            this.intervalValue == 0 ? this.intervalCheck():0;
        }
    }

    private intervalCheck():void{
        this.intervalValue = setInterval(()=>{
            for(let i=0; i<this.leafObjects.length; i++){
                if(parseInt(this.leafObjects[i].offset().left) <=  parseInt(this.filler.offset().left)+parseInt(this.filler.width()) ) { //leaf collide with filler
                    this.fillerWidth+=1;

                    this.filler.css('width',this.fillerWidth +`%`);
                    //this.filler.css('width', '+=1%');
                    this.progressDom.html(this.fillerWidth+`%`);
                    //this.progressDom.html('width','+=1%');
                    if(this.leafObjects.length === 0){
                        clearInterval(this.intervalValue);
                        this.intervalValue = 0;
                        break;
                    }
                    this.leafObjects[i].hide();
                    this.leafObjects.splice(i,1);
                }
            }
        },50);
    }



    private rotate(el, degrees:number):void {
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