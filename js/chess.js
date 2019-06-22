$(function () {
   let flag=true;
   let red={},black={};
   let blank={};
   let ai=false;
   let btn1=$('#mac')
     btn1.on('click',function () {
         ai=true;
     })
    let btn2=$("#per")
    btn2.on('click',function () {
        ai=false;
    })

    let box=$('.box')
    for (let i=0;i<15;i++){
        for (let j=0;j<15;j++){
             $('<div>').addClass('chess').attr('id',i+'_'+j).appendTo('.box')
            blank[i+'_'+j]=true
        }
    }
    box.on('click','.chess',function () {

        let _this=$(this);

        if (_this.hasClass('black')||_this.is('.red')){
            return ;
        }
          flag=!flag;
         let coords=_this.attr('id');
            if (flag){

                black[coords]=true;
                delete  blank[coords];
                 $(this).addClass('black')
                if (issuccess(black,coords)>=5){
                     alert('黑棋胜')
                   box.off('click')
                }

            } else {
                red[coords]=true;
                delete  blank[coords];
                $(this).addClass('red')
                if (issuccess(red,coords)>=5){
                    alert('白棋胜')
                   box.off('click')
                }
                if (ai){
                    let pos=aifn();
                    black[pos]=true;
                    delete blank[pos];
                    $('#'+pos).addClass('black');
                    if (issuccess(black,pos)>=5){
                        box.off('click');
                        alert('黑棋胜！');
                    }else if(issuccess(red,pos)>5){
                        alert('白棋胜！');
                    }

                    flag=!flag
                }

               }

    });
   // aifn
    function aifn() {
        let blankScore=0,whiteScore=0;
        let pos1='',pos2='';
        for (let i in blank) {
            let score=issuccess(black,i);
            if (score>=blankScore)
            {
                blankScore=score;
                pos1=i;
            }
        }
        for (let i in blank) {
            let score = issuccess(red, i);
            if (score >= whiteScore) {
                whiteScore = score;
                pos2 = i;
            }
        }
        return blankScore>=whiteScore ? pos1:pos2;
    }

    function issuccess(obj,coords) {
       let cz=1, sp=1, zx=1,yx=1;
       let [x ,y]=coords.split('_')
       let i=x*1, j=y*1;
      // 水平
      while (obj[i+'_'+(++j)]) {
           sp++;
      }
       j=y*1;
       while (obj[i+'_'+(--j)]) {
           sp++;
       }
   //    垂直
        j=y*1
       while (obj[++i+'_'+j]) {
           cz++;
       }
       i=x*1;
       while (obj[--i+'_'+j]) {
           cz++;
       }
       i=x*1;
   // 右斜
      j=y*1;
       while (obj[--i+'_'+(++j)]) {
           yx++;
       }
       i=x*1;j=y*1;
       while (obj[++i+'_'+(--j)]) {
           yx++;
       }
       i=x*1;j=y*1;
        //左斜
       while (obj[++i+'_'+(++j)]) {
           zx++;
       }
       i=x*1;j=y*1;
       while (obj[--i+'_'+(--j)]) {
           zx++;
       }

     return Math.max(zx,yx,cz,sp)
   }

})