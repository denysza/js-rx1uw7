const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
};
window.addEventListener('resize', appHeight)
appHeight()
window.onload = function(){

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    var currentActiveindex = 0;
    var position=["#position01", "#position23","#position45","#position67"];
    var mb=["mb-25","mb-30","mb-10",""];
    var responses=[
        {
            turn:0,
            position:0,
            ai_id:426,
            ai_img_url:"https://pechakucha-img.s3-ap-northeast-1.amazonaws.com/faces/0000426.png",
            content_type:"text", 
            content:"「お前○○か！」絶対に誰も言ったことがない例えをして下さい",
            img_text:"", 
            remark_id:null, 
            img_id:null, 
            fixed:1
        },
        {
            turn:1, 
            position:7, 
            ai_id:451,
            ai_img_url:"https://pechakucha-img.s3-ap-northeast-1.amazonaws.com/faces/0000451.png",
            content_type:"text",
            content:"割と量産はできると思うんですけど",
            img_text:"",
            remark_id:null,
            img_id:null,
            fixed:1
        },
        {
            turn:2,
            position:2,
            ai_id:433,
            ai_img_url:"https://pechakucha-img.s3-ap-northeast-1.amazonaws.com/faces/0000433.png",
            content_type:"text",
            content:"お前、都会に咲いたシイタケか！",
            img_text:"",
            remark_id:null,
            img_id:null,
            fixed:0
        },
        {
            turn:3,
            position:7,
            ai_id:451,
            ai_img_url:"https://pechakucha-img.s3-ap-northeast-1.amazonaws.com/faces/0000451.png",
            content_type:"text",
            content:"そういうことですよね",
            img_text:"",
            remark_id:null,
            img_id:null,
            fixed:1
        },
        {
            turn:4,
            position:4,
            ai_id:389,
            ai_img_url:"https://pechakucha-img.s3-ap-northeast-1.amazonaws.com/faces/0000389.png",
            content_type:"image",
            content:"https://pechakucha-img-dev.s3-ap-northeast-1.amazonaws.com/img_stamps/0000896.png", 
            img_text:"", 
            remark_id:null,
            img_id:null,
            fixed:0
        },
        {
            turn:5,
            position:7,
            ai_id:451,
            ai_img_url:"https://pechakucha-img.s3-ap-northeast-1.amazonaws.com/faces/0000451.png",
            content_type:"text",
            content:"他局のドラマでも見てたら良いんですよ",
            img_text:"",
            remark_id:null,
            img_id:null,
            fixed:1
        }
    ];

    function renderedit(item) {
        var element = document.querySelector(position[parseInt(item.position/2)]);
        var userid = element.getAttribute("data-userid");
        if (userid===null || userid!=item.ai_id)
        {
            if(item.position % 2 === 0)
            {
                element.setAttribute("data-userid", item.ai_id);
                element.innerHTML = `<div class="section02-part02 ${mb[parseInt(item.position/2)]}">
                                        <div class="section02-part02-img">
                                            <img src=${item.ai_img_url} alt="">
                                        </div>
                                    </div>`
        
                var talkpartElement = document.querySelector(`${position[parseInt(item.position/2)]} .section02-part02`);
                if(item.content_type=="text")
                {
                    talkpartElement.innerHTML += `<div class="section02-part02-text b-15">
                                                    ${item.content}
                                                </div>`
                }
                if(item.content_type=="image")
                {
                    talkpartElement.innerHTML += `<div class="section02-part02-text b-15">
                                                    <img src=${item.content} alt="">
                                                    </div>`
                }
            }
            else{
                element.setAttribute("data-userid", item.ai_id);
                element.innerHTML = `<div class="section02-part02  ${mb[parseInt(item.position/2)]}">
                                        <div></div>                        
                                        <div style="order: 1" class="section02-part02-img">
                                            <img src=${item.ai_img_url} alt="">
                                        </div>
                                    </div>`
            
                var talkpartElement = document.querySelector(`${position[parseInt(item.position/2)]} .section02-part02`);
                if(item.content_type=="text")
                {
                    talkpartElement.innerHTML += `<div class="section02-part02-text01 b-15">
                                                    ${item.content}
                                                    </div>`
                }
                if(item.content_type=="image")
                {
                    talkpartElement.innerHTML += `<div class="section02-part02-text01 b-15">
                                                    <img src=${item.content} alt="">
                                                    </div>`
                }
            }
        }
        else{
            if(item.position % 2 === 0){
              
                var talkpartElement = document.querySelector(`${position[parseInt(item.position/2)]} .section02-part02 .section02-part02-text`);
                talkpartElement.innerHTML = ""
                
                if(item.content_type=="text")
                {
                    talkpartElement.innerHTML += item.content
                }
                if(item.content_type=="image")
                {
                    talkpartElement.innerHTML += `<img src=${item.content} alt="">`
                }
            }
            else
            {           
                var talkpartElement = document.querySelector(`${position[parseInt(item.position/2)]} .section02-part02 .section02-part02-text01`);
                talkpartElement.innerHTML = ""
                if(item.content_type=="text")
                {
                    talkpartElement.innerHTML += item.content
                }
                if(item.content_type=="image")
                {
                    talkpartElement.innerHTML += `<img src=${item.content} alt="">`
                }
            }
          
        }
    }
    function setActive(){
        position.forEach(p=>{
            document.querySelector(p).innerHTML="";
            document.querySelector(p).removeAttribute("data-userid");
            document.querySelector(p).classList.remove("activemessage");
        });

        if(currentActiveindex==0)
        {
            document.querySelectorAll(".prevemessage").forEach(element=>{
                element.style.visibility = "hidden";
            });
        }
        else
        {
            document.querySelectorAll(".prevemessage").forEach(element=>{
                element.style.visibility = 'unset';
            });
        }
        if(currentActiveindex==responses.length-1)
        {
            document.querySelectorAll(".nextmessage").forEach(element=>{
                element.style.visibility = "hidden"
            });
        }
        else{
            document.querySelectorAll(".nextmessage").forEach(element=>{
                element.style.visibility = 'unset';
            });
        }
        
        for(var i = 0; i<=currentActiveindex; i++)
        {
            renderedit(responses[i]);
            if(i==currentActiveindex)
            {
                document.querySelector(position[parseInt(responses[i].position/2)]).classList.add("activemessage");
            }
        }
    }

    async function render(item) {
        var element = document.querySelector(position[parseInt(item.position/2)]);
        var userid = element.getAttribute("data-userid");
        if (userid===null || userid!=item.ai_id)
        {
            if(item.position % 2 === 0)
            {
                element.setAttribute("data-userid", item.ai_id);
                await sleep(1000);
                element.innerHTML = `<div class="section02-part02 ${mb[parseInt(item.position/2)]}">
                                        <div class="section02-part02-img">
                                            <img src=${item.ai_img_url} alt="">
                                        </div>
                                    </div>`
                await sleep(1000);
                var talkpartElement = document.querySelector(`${position[parseInt(item.position/2)]} .section02-part02`);
                if(item.content_type=="text")
                {
                    talkpartElement.innerHTML += `<div class="section02-part02-text b-15">
                                                    ${item.content}
                                                </div>`
                }
                if(item.content_type=="image")
                {
                    talkpartElement.innerHTML += `<div class="section02-part02-text b-15">
                                                    <img src=${item.content} alt="">
                                                    </div>`
                }
            }
            else{
                element.setAttribute("data-userid", item.ai_id);
                await sleep(1000);
                element.innerHTML = `<div class="section02-part02  ${mb[parseInt(item.position/2)]}">
                                        <div></div>                        
                                        <div style="order: 1" class="section02-part02-img">
                                            <img src=${item.ai_img_url} alt="">
                                        </div>
                                    </div>`
                await sleep(1000);
                var talkpartElement = document.querySelector(`${position[parseInt(item.position/2)]} .section02-part02`);
                if(item.content_type=="text")
                {
                    talkpartElement.innerHTML += `<div class="section02-part02-text01 b-15">
                                                    ${item.content}
                                                    </div>`
                }
                if(item.content_type=="image")
                {
                    talkpartElement.innerHTML += `<div class="section02-part02-text01 b-15">
                                                    <img src=${item.content} alt="">
                                                    </div>`
                }
            }
        }
        else{
            if(item.position % 2 === 0){
                await sleep(1000);
                var talkpartElement = document.querySelector(`${position[parseInt(item.position/2)]} .section02-part02 .section02-part02-text`);
                talkpartElement.innerHTML = ""
                await sleep(1000);
                if(item.content_type=="text")
                {
                    talkpartElement.innerHTML += item.content
                }
                if(item.content_type=="image")
                {
                    talkpartElement.innerHTML += `<img src=${item.content} alt="">`
                }
            }
            else
            {
                await sleep(1000);
                var talkpartElement = document.querySelector(`${position[parseInt(item.position/2)]} .section02-part02 .section02-part02-text01`);
                talkpartElement.innerHTML = ""
                await sleep(1000);
                if(item.content_type=="text")
                {
                    talkpartElement.innerHTML += item.content
                }
                if(item.content_type=="image")
                {
                    talkpartElement.innerHTML += `<img src=${item.content} alt="">`
                }
            }
          
        }
        resolve => setTimeout(resolve, 0)
    }

    async function generateToken(){
        document.querySelector('.section03-part').style.display = 'none';
        document.querySelector('.section03').classList.add("disable");
        document.querySelector('.section04').classList.add("disable");
        for(var i=0;i< responses.length; i++)
        {
            await render(responses[i]);
            if(i===responses.length - 1)
            {
                await sleep(1000);
                document.querySelectorAll(".section02").forEach(element => {
                    element.classList.add("disable");
                });
                document.querySelectorAll(".section02-talk-part").forEach(element=>{
                    element.classList.add("disable");
                });
                document.querySelector('.section03-part').style.display = 'flex';
                document.querySelector('.section03').classList.remove("disable");
                document.querySelector('.section04').classList.remove("disable");
                setActive();
            }
        }
    }

    document.querySelectorAll(".nextmessage").forEach(item=>{
        item.addEventListener("click",function(){
            currentActiveindex++;
            setActive();
        });
    });
    document.querySelectorAll(".prevemessage").forEach(item=>{
        item.addEventListener("click",function(){
            currentActiveindex--;
            setActive();
        });
    });
    generateToken();
}