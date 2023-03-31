
function link() {
    alert("There is no link.");
}

var done1=0;
text2 = document.getElementById("text2");
function forText2(){
    var y = window.scrollY;
    if(done1==0){
        if (y > 200) {
            text2.className = "show";
            done1=1;
        } else {
            text2.className = "hidden";
        }
    }
};

var done3=0;
text3 = document.getElementById("text3");
function forText3(){
    var y = window.scrollY;
    if(done3==0){
        if (y > 4700) {
            text3.className = "show3";
            done3=1;
        } else {
            text3.className = "hidden3";
        }
    }
};

var done4=0;
text4 = document.getElementById("text4");
function forText4(){
    var y = window.scrollY;
    if(done4==0){
        if (y > 3900) {
            text4.className = "show4";
            done4=1;
        } else {
            text4.className = "hidden4";
        }
    }
};


  
window.addEventListener("scroll", function(e){
    forText2();
    forText3();
    forText4();
});



var done2=0;
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(done2<5){
        if(entry.isIntersecting){
            entry.target.classList.add('showlogo');
            done2+=1;
        } else {
            entry.target.classList.remove('showlogo');
        }
    }
    });
});

const hiddenElements = document.querySelectorAll('.logo');
hiddenElements.forEach((e) => observer.observe(e));


function responsiveBar() {
    var x = document.getElementById("topBarid");
    if (x.className === "icon") {
      x.className += " responsive";
    } else {
      x.className = "icon";
    }
}


