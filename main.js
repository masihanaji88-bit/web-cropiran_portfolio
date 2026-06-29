/* =========================
AOS
========================= */

AOS.init({
duration:1000,
once:true
})


// /* =========================
// LOADER FIX
// ========================= */

// function hideLoader(){

// const loader = document.getElementById("loader")

// if(loader){
// loader.style.opacity = "0"

// setTimeout(()=>{
// loader.style.display = "none"
// },400)
// }

// }

// /* وقتی صفحه کامل لود شد */
// window.addEventListener("load", hideLoader)

// /* اگر load اجرا نشد بعد از 2 ثانیه مخفی شود */
// setTimeout(hideLoader,2000)



/* =========================
DARK MODE
========================= */

const toggleBtn=document.getElementById("themeToggle")
const circle=document.getElementById("toggleCircle")
const html=document.documentElement

function updateToggle(){

if(!circle) return

if(html.classList.contains("dark")){

circle.style.transform="translateX(28px)"
circle.textContent="☀️"

}else{

circle.style.transform="translateX(0)"
circle.textContent="🌙"

}

}

updateToggle()

if(toggleBtn){

toggleBtn.addEventListener("click",()=>{

html.classList.toggle("dark")

if(html.classList.contains("dark")){
localStorage.setItem("theme","dark")
}else{
localStorage.setItem("theme","light")
}

updateToggle()

})

}


/* =========================
MOBILE MENU
========================= */

const menuBtn=document.getElementById("menuBtn")
const mobileMenu=document.getElementById("mobileMenu")

if(menuBtn){

menuBtn.addEventListener("click",()=>{

mobileMenu.classList.toggle("hidden")

})

}


/* =========================
PROJECT FILTER
========================= */

const buttons=document.querySelectorAll(".filterBtn")
const projects=document.querySelectorAll(".project")

buttons.forEach(btn=>{

btn.addEventListener("click",()=>{

const filter=btn.dataset.filter

projects.forEach(p=>{

if(filter==="all" || p.classList.contains(filter)){
p.style.display="block"
}else{
p.style.display="none"
}

})

})

})


/* =========================
SCROLL PROGRESS BAR
========================= */

const progressBar=document.createElement("div")

progressBar.style.position="fixed"
progressBar.style.top="0"
progressBar.style.left="0"
progressBar.style.height="3px"
progressBar.style.background="linear-gradient(90deg,#6366F1,#06B6D4)"
progressBar.style.zIndex="9999"
progressBar.style.width="0%"

document.body.appendChild(progressBar)

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop
const height=document.documentElement.scrollHeight - document.documentElement.clientHeight

const progress=(scrollTop/height)*100

progressBar.style.width=progress+"%"

})


/* =========================
CUSTOM CURSOR
========================= */

const cursor=document.createElement("div")

cursor.style.width="18px"
cursor.style.height="18px"
cursor.style.border="2px solid #6366F1"
cursor.style.borderRadius="50%"
cursor.style.position="fixed"
cursor.style.pointerEvents="none"
cursor.style.transform="translate(-50%,-50%)"
cursor.style.transition="0.08s"
cursor.style.zIndex="9999"

document.body.appendChild(cursor)

document.addEventListener("mousemove",e=>{

cursor.style.left=e.clientX+"px"
cursor.style.top=e.clientY+"px"

})


/* =========================
3D HOVER CARDS
========================= */

const cards=document.querySelectorAll(".project")

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect()

const x=e.clientX-rect.left
const y=e.clientY-rect.top

const centerX=rect.width/2
const centerY=rect.height/2

const rotateX=(y-centerY)/12
const rotateY=(centerX-x)/12

card.style.transform=`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
card.style.transition="0.1s"

})

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0) rotateY(0)"
card.style.transition="0.5s"

})

})


/* =========================
NAVBAR SCROLL EFFECT
========================= */

const header=document.querySelector("header")

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

header.classList.add("backdrop-blur","bg-white/70","dark:bg-gray-900/70")

}else{

header.classList.remove("backdrop-blur","bg-white/70","dark:bg-gray-900/70")

}

})


/* =========================
SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",function(e){

e.preventDefault()

const target=document.querySelector(this.getAttribute("href"))

if(target){

target.scrollIntoView({
behavior:"smooth"
})

}

})

})


/* =========================
MAGNETIC BUTTONS
========================= */

const magnets=document.querySelectorAll("button,a")

magnets.forEach(btn=>{

btn.addEventListener("mousemove",function(e){

const rect=this.getBoundingClientRect()

const x=e.clientX-rect.left-rect.width/2
const y=e.clientY-rect.top-rect.height/2

this.style.transform=`translate(${x*0.2}px,${y*0.2}px)`

})

btn.addEventListener("mouseleave",function(){

this.style.transform="translate(0,0)"

})

})


/* =========================
PARTICLES BACKGROUND
========================= */

const canvas=document.createElement("canvas")
canvas.style.position="fixed"
canvas.style.top="0"
canvas.style.left="0"
canvas.style.width="100%"
canvas.style.height="100%"
canvas.style.zIndex="-1"

document.body.appendChild(canvas)

const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let particles=[]

for(let i=0;i<60;i++){

particles.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2+1,
dx:(Math.random()-0.5)*0.5,
dy:(Math.random()-0.5)*0.5
})

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

ctx.beginPath()
ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
ctx.fillStyle="rgba(99,102,241,0.4)"
ctx.fill()

p.x+=p.dx
p.y+=p.dy

if(p.x<0||p.x>canvas.width)p.dx*=-1
if(p.y<0||p.y>canvas.height)p.dy*=-1

})

requestAnimationFrame(animateParticles)

}

animateParticles()

/* =========================
PAGE TRANSITION
========================= */

const transition=document.createElement("div")

transition.style.position="fixed"
transition.style.top="0"
transition.style.left="0"
transition.style.width="100%"
transition.style.height="100%"
transition.style.background="#0f172a"
transition.style.zIndex="99999"
transition.style.transform="translateY(100%)"
transition.style.transition="0.6s"

document.body.appendChild(transition)

document.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",e=>{

const href=link.getAttribute("href")

if(href && !href.startsWith("#")){

e.preventDefault()

transition.style.transform="translateY(0)"

setTimeout(()=>{
window.location=href
},600)

}

})

})

window.addEventListener("load",()=>{

transition.style.transform="translateY(-100%)"

setTimeout(()=>{
transition.remove()
},600)

})


/* =========================
SCROLL REVEAL
========================= */

const revealElements=document.querySelectorAll(".reveal")

function revealOnScroll(){

const windowHeight=window.innerHeight

revealElements.forEach(el=>{

const top=el.getBoundingClientRect().top

if(top<windowHeight-100){
el.classList.add("active")
}

})

}

window.addEventListener("scroll",revealOnScroll)
revealOnScroll()


/* =========================
INFINITE SKILLS MARQUEE
========================= */

const skillsContainer=document.querySelector(".skills-marquee")

if(skillsContainer){

let scrollPos=0

function animateSkills(){

scrollPos-=0.5

skillsContainer.style.transform=`translateX(${scrollPos}px)`

if(Math.abs(scrollPos)>skillsContainer.scrollWidth/2){
scrollPos=0
}

requestAnimationFrame(animateSkills)

}

animateSkills()

}


/* =========================
PROJECT MODAL
========================= */

const modal=document.createElement("div")

modal.style.position="fixed"
modal.style.inset="0"
modal.style.background="rgba(0,0,0,0.7)"
modal.style.display="flex"
modal.style.alignItems="center"
modal.style.justifyContent="center"
modal.style.zIndex="9999"
modal.style.opacity="0"
modal.style.pointerEvents="none"
modal.style.transition="0.3s"

document.body.appendChild(modal)

const modalContent=document.createElement("div")

modalContent.style.background="#fff"
modalContent.style.padding="30px"
modalContent.style.borderRadius="10px"
modalContent.style.maxWidth="500px"
modalContent.style.width="90%"

modal.appendChild(modalContent)

document.querySelectorAll(".project").forEach(card=>{

card.addEventListener("click",()=>{

modalContent.innerHTML=card.innerHTML

modal.style.opacity="1"
modal.style.pointerEvents="auto"

})

})

modal.addEventListener("click",()=>{

modal.style.opacity="0"
modal.style.pointerEvents="none"

})


/* =========================
HERO PARALLAX
========================= */

const hero=document.querySelector("section")

window.addEventListener("scroll",()=>{

const scroll=window.scrollY

if(hero){

hero.style.backgroundPosition=`center ${scroll*0.4}px`

}

})


/* =========================
TEXT TYPING EFFECT
========================= */

const typingElement=document.querySelector(".typing")

if(typingElement){

const words=["Web Developer","Frontend Developer","UI Designer"]

let wordIndex=0
let charIndex=0
let typing=true

function type(){

const currentWord=words[wordIndex]

if(typing){

typingElement.textContent=currentWord.slice(0,charIndex++)

if(charIndex>currentWord.length){

typing=false
setTimeout(type,1500)
return

}

}else{

typingElement.textContent=currentWord.slice(0,charIndex--)

if(charIndex===0){

typing=true
wordIndex=(wordIndex+1)%words.length

}

}

setTimeout(type,80)

}

type()

}


const track = document.getElementById("skillsTrack");

if(track){

  track.innerHTML += track.innerHTML;

  let pos = 0;
  let speed = 0.4;
  let paused = false;

  track.addEventListener("mouseenter",()=> paused = true);
  track.addEventListener("mouseleave",()=> paused = false);

  function animate(){

    if(!paused){

      pos -= speed;

      if(Math.abs(pos) >= track.scrollWidth / 2){
        pos = 0;
      }

      track.style.transform = `translateX(${pos}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();
}


