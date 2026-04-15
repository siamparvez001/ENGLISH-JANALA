const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return htmlElements.join(" ");
}

const manageSpinner = (status) => {
    if(status==true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadLeassons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displyLessons(json.data))
}
const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => btn.classList.remove("active"));
}
const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displyLevelWord(data.data)

        });
}

const loadWordDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displyWordDetails(details.data);
}
const displyWordDetails = (word) => {
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = `
         <div class="flex gap-5 items-center">
                    <h2 class="text-lg font-bold">${word.word}</h2>
                    <h3>(<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h3>
                </div>
                <div class="space-y-2">
                    <h2 class="font-bold text-lg">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="space-y-2">
                    <h2 class="font-bold text-lg">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="space-y-2">
                    <p class="font-bold text-lg" font-bangla>সমার্থক শব্দ গুলো</p>
                    <div>${createElements(word.synonyms)}</div>
                </div>
    `
    document.getElementById("my_modal_5").showModal()
}
const displyLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = ""
    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="text-center flex flex-col items-center col-span-full space-y-5 font-bangla">
                <img src="./assets/alert-error.png" alt="">
                <p class="opacity-60">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
            </div>
        `
        manageSpinner(false);
        return;
    }
    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "Word messing"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">${word.meaning ? word.meaning : "meaning messing"} / ${word.pronunciation ? word.pronunciation : "pronunciation messing"}</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-sky-50 hover:bg-sky-200"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-sky-50 hover:bg-sky-200"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    });
    manageSpinner(false);
}
const displyLessons = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 2. get into every lessons 
    for (let lesson of lessons) {
        // 3. create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn flex gap-[5px]"><i class="fa-solid fa-book-open"></i>Lesson- ${lesson.level_no}</button>
            `
        // 4. append into container
        levelContainer.append(btnDiv);

    }

}

loadLeassons()