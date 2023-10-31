const time = 2000;
const step = 1;

function outNum(num, elem){
    var l = document.querySelector("#" + elem);
    var n = 0;
    var t = Math.round(time/(num/step));
    var int = setInterval(() => {
        n = n + step;
        if(n == num){
            clearInterval(int);
        }
        l.innerHTML = n;
    }, t)
}

outNum(10, "num1");
outNum(120, "num2");
outNum(98, "num3");
outNum(125, "num4");


const filterBox = document.querySelectorAll(".box");

document.querySelector("nav").addEventListener("click", (event)=>{
    if(event.target.tagName !== 'LI'){
        return false;
    }

    var filterClass = event.target.dataset["f"];

    filterBox.forEach((elem)=>{
        elem.classList.remove('hide');
        if(!elem.classList.contains(filterClass) && filterClass !== "all"){
            elem.classList.add('hide');
        }
    });
});

var comments = [];
loadComment();

document.getElementById("revBtn").onclick = function(){
    event.preventDefault();
    var commentName = document.getElementById("revName");
    var commentBody = document.getElementById("revBody");

    var comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now()/1000)
    };

    commentName.value = "";
    commentBody.value = "";
    comments.push(comment);
    saveComment();
    showComments();
}

function saveComment(){
    localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComment(){
    if(localStorage.getItem("comments")){
        comments = JSON.parse(localStorage.getItem("comments"));
    }
    showComments();
}

function showComments(){
    var commentField = document.getElementById("revField");
    var out = "";
    comments.forEach(function(item){
        out += `<p class="comment__time"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="comment__name">${item.name}</p>`;
        out += `<p class="comment__body">${item.body}</p>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min ;
    return time;
}