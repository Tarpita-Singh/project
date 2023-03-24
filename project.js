
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
        if (y > 4000) {
            text3.className = "show3";
            done3=1;
        } else {
            text3.className = "hidden3";
        }
    }
};


  
window.addEventListener("scroll", function(e){
    forText2();
    forText3();
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
