//유저가 값을 입력한다.
// 버튼을 클릭하면 할일이 추가된다.
// 체크버튼을 누르면 할일이 끝나면서 밑줄
//1. 체크 버튼을 클릭하는 순간 true를 false로 바꿔준다
//2. true면 끝난걸로 간주하고 밑줄
//3. false면 진행중으로 간주하고 그대로 유지
// 삭제 버튼을 누르면 할일이 삭제된다.
// 진행중 끝남 탭을 누르면 언더바가 이동한다
//끝남 탭은 끝난 아이템만, 진행중을 누르면 진행중인 할일만 나온다
// 전체탭을 누르면 다시 전체아이템으로 돌아온다
// * 정보에는 ID값이 필요하다

let taskInput = document.getElementById("taskInput");
//console.log(taskInput);
let addButton = document.getElementById("addButton");
let totalTaskNum = document.getElementById("totalTaskNum");
let taskList =[];
let tabs = document.querySelectorAll(".taskTab div") //querySelectorAll : 조건에 만족하는 모든것을 가져온다
let mode="all"
let filterList =[];
let inputPlaceholder = document.getElementById("taskInput").placeholder = "등록해주세요!!";
let totalTasks = 0;

addButton.addEventListener("click",addTask);




// taskInput 요소에 대해 keypress 이벤트를 감지하여 Enter 키가 눌렸을 때 addButton 버튼을 클릭하도록 설정
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addButton.click();
    }
});
taskInput.addEventListener('click', function() {
    // 첫 번째 탭으로 이동하는 코드 작성
    document.getElementById('all').click(); // 첫 번째 탭의 id를 사용하여 클릭 이벤트 발생
});
//onblur onblur="this.placeholder='여기를 클릭하세요'"
//input box가 아닌 다른 곳 클릭 시 다시 placeholder 문구가 나타나게 해준
function taskInputPlaceholder() {
    document.getElementById("taskInput").placeholder = inputPlaceholder;
}
//onfocus="this.placeholder=''"  클릭 시 placeholder의 글씨 사라지게
function taskclearPlaceholder() {
    document.getElementById("taskInput").placeholder = "";
}

for(let i=1;i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){
        filter(event);        
    });
}

function addTask(){
    //console.log("click")
    //버튼을 클릭하고 난 후 할일들~ 
    //객체로 정의   
    //값을 입력하지 않았을경우???
    let taskValue = taskInput.value;
    if(taskValue == ''){
        alert("일정을 입력해주세요.");
        return;
    }

    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete:false,
    };
    taskList.push(task);
    //console.log(taskList);
    render();
    // taskInput 초기화
    taskInput.value = '';
}

function render(){
    let list=[];  
    let totalTasks = taskList.length;    

    if(mode === "all"){
        //선택한 모드가 all 일경우 taskList를 뿌려준다
        list = taskList;            
    }else if(mode === "inProgress" || mode === "completed"){
        // 내가 선택한 탭의 필터된 리스트를 뿌려준다.
        list = filterList;         
    };
    resultHtml = '';    

    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHtml += `<div class="task inactive">
                    <div class="taskDone">${list[i].taskContent}</div>
                    <div>
                        <button class="btnCheck" onclick="togglecomplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                        <button class="btnDelete" onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>`;
                //completedTasks++;
                
                 
        }else{
            resultHtml += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div>
                        <button class="btnCheck" onclick="togglecomplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button class="btnDelete" onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>`;
                //inProgressTasks++; 
                                   
        }
       
        totalTaskNum.textContent = `${totalTasks} `; 
        //completedTaskNum.textContent =  `${completedTasks}`; 
        //inProgressTaskNum.textContent =  `${inProgressTasks}`;  
        
    }
    document.getElementById("taskBoard").innerHTML = resultHtml;
    //console.log("총 " + totalTasks + "건의 할일이 등록되었습니다."); 
      
    //totalTaskNum.textContent = `총 ${totalTasks}건 (진행중인 일정 : ${inProgressTasks} 건 / 완료된 일정 : ${completedTasks}) `;   
}
//render함수에서 togglecomplete 함수를  호출할 때 id를 전달하여 사용할 수 있다 
function togglecomplete(id){
    //console.log("id:", id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;//토글같다!!!
            break;//종료
        }
    } 
    filter();  
    //console.log(taskList)   
}
//삭제
function deleteTask(id){
    //console.log("삭제", id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
        }
    }
    //console.log(taskList);
    //값을 업데이트하면 UI도 업데이트 해준다
    filter();
}


//addEventListener로부터 이벤트를 받아온다.
function filter(event){
    //console.log("filter", event.target.id);
     //전역변수로 바꿔줘야한다.
    if (event) {
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top = (event.target.offsetTop + event.target.offsetHeight - 2)  + "px";
    }
    filterList = [];

    if(mode === "all"){
        //전체리스트를 보여준다
        render();
    }else if(mode === "inProgress"){
        // isComplet가 false값만 가져온다
        //task.isComplet=false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]);
            }
        }
        render();
        //console.log("진행중", filterList)

    }else if(mode === "completed"){
        // 종료인 리스트  isComplet = true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i]);
            }
        }
        render();
        //console.log("종료", filterList)
    }
}
// 할일 목록의 개수를 출력
// 랜덤 아이디
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

