let timer
let deleteFirstPhotoDelay

async function start() {
  try{
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json()
    createBreedList(data.message)
  }catch (e){
    console.log("There was a problem fetching the breed list!")
  }
}

start();

function createBreedList(breedList){
    document.querySelector("#breed").innerHTML = `
    <select onchange="loadByBreed(this.value)">
            <option>Izaberi pasminu</option>
            ${Object.keys(breedList).map(function(breed){
                return `<option>${breed}</option>`
            }).join('')}     
    </select>
    `
}

async function loadByBreed(breed){
    if (breed != "Izaberi pasminu"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideShow(data.message)
    }
}

async function createSlideShow(images) {
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
    document.querySelector("#slideshow").innerHTML = `
        <div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
    `
    currentPosition += 2
    timer = setInterval(nextSlide, 4000)

    function nextSlide(){
        document.querySelector("#slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>` )
        deleteFirstPhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove
        }, 1000)
        if (currentPosition + 1 >= images.length){
            currentPosition = 0
        }else{
            currentPosition++
        }
    }

}