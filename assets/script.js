var size; //number of states
var nodes = new Array(); //matrix elements for (size x size) transition matrix
var final = new Array(); //if more than 1 final state
var flag = true;

function getValues() {
    nodes.length = 0;   //reset nodes everytime before proceeding
    flag = true;
    size = parseInt(document.getElementById('Size').value); //get states from text box
    var hold = document.getElementById('placeholder');
    hold.innerHTML = '';
    if(size < 1) 
        alert("Define States First!");      
    else {
        for(var i=0;i<size;i++) {
            nodes[i] = new Array();     //creating a 2d array
            for(var j=0;j<size;j++) {
                nodes[i][j] = new Object();
                nodes[i][j].edge = prompt("Is Q"+i+" connected to Q"+j+"? (y/n)");
                if(i == 0)
                    nodes[i][j].Final = false;
                if(nodes[i][j].edge ==='y' || nodes[i][j].edge ==='Y')
                    nodes[i][j].symbol = prompt("What is the transition symbol from Q"+i+" to Q"+j+"?");
                else if(nodes[i][j].edge ==='n' || nodes[i][j].edge ==='N')
                    nodes[i][j].symbol = '-';
                else {
                    alert("Invalid Input! Start again.");
                    return;
                }
            }
        }
        var radio = '';
        radio += 'Select Final States<br>';
        for(i = 0; i<size; i++) 
            radio += "<input type='checkbox' id='q"+i+"'> Q<sub>"+i+"</sub>&emsp;";
        radio += '<br><br>';
        hold.innerHTML = radio;
    }
}

function display() {
    if(flag)
        getFinalStates();
    size = nodes.length;
    var fs = "";    //final states
    document.getElementById('final_state').innerHTML = "Final State(s): "+fs;
    document.getElementById('heading').innerHTML = "Transition Matrix";
    lines = "<tr><th></th>";
    for(var i=0; i<size; i++)
        lines += "<th>Q<sub>"+i+"</sub></th>";  //the headers
    lines += "</tr>";
    for(var i=0; i<size; i++) {
        lines += "<tr><th>Q<sub>"+i+"</sub></th>";
        for(var j=0;j<size;j++) {
            lines += "<td>( "+nodes[i][j].edge.toUpperCase()+" | "+nodes[i][j].symbol+" )</td>";
        }
        lines += "</tr>";
    }
    for(i=0;i<final.length;i++)
        fs += "Q<sub>"+final[i]+"</sub> ";
    document.getElementById('final_state').innerHTML = "Final State(s): "+fs;
    document.getElementById('start_state').innerHTML = "Initial State: Q<sub>0</sub>";
    document.getElementById('string_tested').innerHTML = "String Scanned:";
    document.getElementById('halt_state').innerHTML = "Halt State:";
    document.getElementById('status').innerHTML = "Status:";
    document.getElementById('paste_here').innerHTML = lines;
}

function test(string) {
    var index = 0;
    var state = 0;
    var symbol_exists = false;
    var col;
    var status = "Rejected";
    size = nodes.length;
    if(!flag)
        display();
    document.getElementById('string_tested').innerHTML = "String Scanned: <i>"+string+"</i>";
    
    if(epsilonTest(string) && testState(0)) {   //check if epsilon is a part of the language
        status="Accepted";
        document.getElementById('halt_state').innerHTML = "Halt State: Q<sub>"+state+"</sub>";
        document.getElementById('status').innerHTML = "Status: <b>"+status+"</b>";
        return; //no need to proceed further.
    }   

    while(index < string.length) {
        col=0;
        symbol_exists = false;
        while (col < size) {
            condition = nodes[state][col].symbol.includes(string[index]);
            if(condition) {
                state = col;
                symbol_exists = true;
                break;
            }
            col++;
        }
        if(!symbol_exists)
            break;  
        index++;
    }

    if(testState(state) && symbol_exists)
        status = "Accepted";
    document.getElementById('halt_state').innerHTML = "Halt State: Q<sub>"+state+"</sub>";
    document.getElementById('status').innerHTML = "Status: <b>"+status+"</b>";
}

function testState(state) {
    var value = false;
    var index = 0;
    while(index < final.length) {
        if(state == final[index]) {
            value = true;
            break;
        }
        index++;
    }
    return value;
}

function epsilonTest(string) {
    if(string === "")
        return true;
    else
        return false;
}

function getFinalStates() {
    final.length = 0;
    var tempCheck;
    for(var i = 0; i < nodes.length; i++) {
        tempCheck = document.getElementById('q'+i);
        if(tempCheck.checked) {
            final.push(i);
            nodes[0][i].Final = true;
        }
    }
}