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
let tabs = document.querySelectorAll(".taskTab div");
let taskList =[];

addButton.addEventListener("click",addTask);
taskInput.addEventListener("focus", inputReset);


// input 초기화
function inputReset(){
    taskInput.value="";
}

function addTask(){
    //console.log("click")
    //버튼을 클릭하고 난 후 할일들~ 
    //객체로 정의   
    //값을 입력하지 않았을경우???
    let taskValue = taskInput.value;
    if(taskValue == ''){
        alert("값이 입력되지 않았습니다.");
        return;
    }

    let task = {
        id:randomIDGenerate(),
        taskContent: taskInput.value,
        isComplet:false,
    };
    taskList.push(task);
    //console.log(taskList);
    render();
}

function render(){
    resultHtml = '';
   
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].isComplet == true){
            resultHtml += `<div class="task inactive">
                    <div class="taskDone">${taskList[i].taskContent}</div>
                    <div>
                        <button class="btnCheck" onclick="togglecomplete('${taskList[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                        <button class="btnDelete" onclick="deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>`;
        }else{
            resultHtml += `<div class="task">
                    <div>${taskList[i].taskContent}</div>
                    <div>
                        <button class="btnCheck" onclick="togglecomplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
                        <button class="btnDelete" onclick="deleteTask('${taskList[i].id}')"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </div>`;
        } 
    }
    document.getElementById("taskBoard").innerHTML = resultHtml;
}
//render함수에서 togglecomplete 함수를  호출할 때 id를 전달하여 사용할 수 있다 
function togglecomplete(id){
    //console.log("id:", id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplet = !taskList[i].isComplet;//토글같다!!!
            break;//종료
        }
    } 
    render();  
    console.log(taskList)   
}
//삭제
function deleteTask(id){
    //console.log("삭제", id);
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1)
            break;
        }
    }
    //console.log(taskList);
    //값을 업데이트하면 UI도 업데이트 해준다
    render();
}

  
// 랜덤 아이디
function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}

inputReset();