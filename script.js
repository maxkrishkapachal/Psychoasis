let calPage = 0; //the month currently being displayed
let clicked = null; //the chosen day
let logs = localStorage.getItem('logs') ? JSON.parse(localStorage.getItem('logs')) : [];
let tags = localStorage.getItem('tags') ? JSON.parse(localStorage.getItem('tags')) : [];

const calendar = document.getElementById('calendar');
const newTagModal = document.getElementById('newTagModal');
const editLogModal = document.getElementById('editLogModal');
const backDrop = document.getElementById('modalBackDrop');
const tagTitleInput = document.getElementById("tagTitleInput");
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function load(){
    const currDate = new Date();

    if(calPage != 0){
        currDate.setMonth(new Date().getMonth() + calPage);
    }

    const day = currDate.getDate();
    const month = currDate.getMonth();
    const year = currDate.getFullYear();

    const dayOne = new Date(year, month, 1);
    const numOfDays = new Date(year, month + 1, 0).getDate();

    const dateToString = dayOne.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const blankDays = weekdays.indexOf(dateToString.split(', ')[0]);

    document.getElementById('monthAndYear').innerText = 
        `${currDate.toLocaleDateString('en-us', {month: 'long'})} ${year}`;
    
    if(clicked == null){
        openModal(`${month + 1}/${day}/${year}`, `${currDate.toLocaleDateString('en-us', {month: 'long'})} ${day}, ${year}`);
    }

    calendar.innerHTML = '';

    for(let i = 1; i <= blankDays + numOfDays; i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        const dayToString = `${month + 1}/${i - blankDays}/${year}`;

        if(i > blankDays){
            daySquare.innerText = i - blankDays;
            const logForDay = logs.find(l => l.date == dayToString);
            if(i - blankDays == day && calPage == 0){
                daySquare.id = 'currentDay';
            }

            if(logForDay){
                const logDiv = document.createElement('div');
                logDiv.classList.add('log');
                logDiv.innerText = '';
                daySquare.appendChild(logDiv);
            }
            
            daySquare.addEventListener('click', () => openModal(`${month + 1}/${i - blankDays}/${year}`, `${currDate.toLocaleDateString('en-us', {month: 'long'})} ${i - blankDays}, ${year}`));
        }
        else {
            daySquare.classList.add('blank');
        }

        calendar.appendChild(daySquare);
    }
}  

function initButtons(){
    document.getElementById('nextMonth').addEventListener('click', () => {
        calPage++;
        load();
    });
    document.getElementById('lastMonth').addEventListener('click', () => {
        calPage--;
        load();
    });
    document.getElementById('saveButton').addEventListener('click', saveTag);
    document.getElementById('cancelButton').addEventListener('click', closeTag);

    document.getElementById('saveLogButton').addEventListener('click', saveLog);
    document.getElementById('clearLogButton').addEventListener('click', clearLog);

    document.getElementById('editButton').addEventListener('click', saveLog);
    document.getElementById('deleteButton').addEventListener('click', deleteLog);
    document.getElementById('closeButton').addEventListener('click', closeModal);

    document.getElementById('senseInput0').style.display = "none"; 
    document.getElementById('input0').style.display = "none"; 
    document.getElementById('senseInput1').style.display = "none"; 
    document.getElementById('input1').style.display = "none"; 
    document.getElementById('senseInput2').style.display = "none"; 
    document.getElementById('input2').style.display = "none"; 
    document.getElementById('senseInput3').style.display = "none"; 
    document.getElementById('input3').style.display = "none"; 
    document.getElementById('senseInput4').style.display = "none"; 
    document.getElementById('input4').style.display = "none"; 
    
}

function deleteLog(){
    logs = logs.filter(l => l.date !== clicked);
    localStorage.setItem('logs', JSON.stringify(logs));
    closeModal();
}

function saveLog(){
    var experienceType = null;
    // var check = document.getElementById("hallcuination").checked;
    // if(check == true){
    //     experienceType = "hallucination";
    // }
    // else if(document.getElementById("delusion").checked == 'checked'){
    //     experienceType = "delusion";
    // }
    logs.push({
        date: clicked,
        //experience: experienceType,
        see:  document.getElementById('see').value,
        seeText: document.getElementById('input0').value,
        hear:  document.getElementById('hear').value,
        hearText: document.getElementById('input1').value,
        feel:  document.getElementById('feel').value,
        feelText: document.getElementById('input2').value,
        smell:  document.getElementById('smell').value,
        smellText: document.getElementById('input3').value,
        taste:  document.getElementById('taste').value,
        tasteText: document.getElementById('input4').value,
    });
        localStorage.setItem('logs', JSON.stringify(logs));
        clearLog();
}

function clearLog(){ //I KNOW THIS IS UGLY, I'M REALLY SORRY, I WAS PRESSED FOR TIME
    document.getElementById('hallucination').checked = false;
    document.getElementById('delusion').checked = false;
    document.getElementById('see').checked = false;
    document.getElementById('hear').checked = false;
    document.getElementById('feel').checked = false;
    document.getElementById('smell').checked = false;
    document.getElementById('taste').checked = false;
    document.getElementById('input0').value = "";
    document.getElementById('input0').style.display = 'none';
    document.getElementById('input1').value = "";
    document.getElementById('input1').style.display = 'none';
    document.getElementById('input2').value = "";
    document.getElementById('input2').style.display = 'none';
    document.getElementById('input3').value = "";
    document.getElementById('input3').style.display = 'none';
    document.getElementById('input4').value = "";
    document.getElementById('input4').style.display = 'none';
    document.getElementById('senseInput0').style.display = "none";
    document.getElementById('senseInput1').style.display = "none";
    document.getElementById('senseInput2').style.display = "none";
    document.getElementById('senseInput3').style.display = "none";
    document.getElementById('senseInput4').style.display = "none";
    load();

}

function closeModal(){
    tagTitleInput.classList.remove('error');
    newTagModal.style.display = 'none';
    editLogModal.style.display = 'none';
    backDrop.style.display = 'none';
    //tagTitleInput.value = '';
    //clicked = null;
    load();
}

function openModal(dateSave, dateDisplay){
    clicked = dateSave;

    document.getElementById('logNotes').innerText = dateDisplay;

    const logForDay = logs.find(l => l.dateSave == clicked);
    if(logForDay){
        document.getElementById('logNotes').innerText = logForDay.title;
        //document.getElementById(logForDay.experience).checked = 'checked';
        document.getElementById('see').clicked = logForDay.see;
        document.getElementById('input0').innerText = logForDay.seeText;
        document.getElementById('input0').style.display = 'block';
        document.getElementById('hear').clicked = logForDay.hear;
        document.getElementById('input1').innerText = logForDay.hearText;
        document.getElementById('input1').style.display = 'block';
        document.getElementById('feel').clicked = logForDay.feel;
        document.getElementById('input2').innerText = logForDay.feelText;
        document.getElementById('input2').style.display = 'block';
        document.getElementById('smell').clicked = logForDay.smell;
        document.getElementById('input3').innerText = logForDay.smellText;
        document.getElementById('input3').style.display = 'block';
        document.getElementById('taste').clicked = logForDay.taste;
        document.getElementById('input4').innerText = logForDay.tasteText;
        document.getElementById('input4').style.display = 'block';
        document.getElementById('senseInput0').style.display = "block";
        document.getElementById('senseInput1').style.display = "block";
        document.getElementById('senseInput2').style.display = "block";
        document.getElementById('senseInput3').style.display = "block";
        document.getElementById('senseInput4').style.display = "block";
        //editLogModal.style.display = 'block';
    }
    else{
        //newLogModal.style.display = 'block';
    }

    //backDrop.style.display = 'block';
}

function openSense(sense){
    var checkBox, headerInput, textInput, text;
    switch(sense){
        case 0: checkBox = document.getElementById('see'); text = "It looked like"; headerInput = document.getElementById('senseInput0'); textInput = document.getElementById('input0'); break;
        case 1: checkBox = document.getElementById('hear'); text = "It sounded like"; headerInput = document.getElementById('senseInput1'); textInput = document.getElementById('input1'); break;
        case 2: checkBox = document.getElementById('feel'); text = "It felt like"; headerInput = document.getElementById('senseInput2'); textInput = document.getElementById('input2'); break;
        case 3: checkBox = document.getElementById('smell'); text = "It smelled like"; headerInput = document.getElementById('senseInput3'); textInput = document.getElementById('input3'); break;
        case 4: checkBox = document.getElementById('taste'); text = "It tasted like"; headerInput = document.getElementById('senseInput4'); textInput = document.getElementById('input4'); break;
    
    }
    if(checkBox.checked == true){
        headerInput.innerText = text;
        headerInput.style.display = "block";
        textInput.style.display = "block";
    }
    else{
        headerInput.innerText = "";
        headerInput.style.display = "none";
        textInput.style.display = "none";
    }
}

function openTag(){
    newTagModal.style.display = 'block';
    backDrop.style.display = 'block';
}

function closeTag(){
    tagTitleInput.classList.remove('error');
    newTagModal.style.display = 'none';
    backDrop.style.display = 'none';
    tagTitleInput.value = '';
}

function saveTag(){
    if(tagTitleInput.value){
        tagTitleInput.classList.remove('error');
        tags.push({
            date: clicked,
            title: tagTitleInput.value,
        });
        localStorage.setItem('tags', JSON.stringify(tags));
        var label = document.createElement('label');
        var checkbox = document.createElement('input');
        checkbox.checked = 'checked';   
        checkbox.type = 'checkbox';

        openTag();
        checkbox.innerText = tagTitleInput.value;
        label.innerText = tagTitleInput.value;
        document.getElementById('tags').appendChild(checkbox);
        document.getElementById('tags').appendChild(label);
        closeTag();
    }
    else {
        tagTitleInput.classList.add('error');
    }
}

initButtons();
load();
