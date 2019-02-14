function loadFile() {
  flag = false;
  var file = document.getElementById('file');
  var temp = file.files[0]; //select 1st file
  var fr = new FileReader();
  document.getElementById('paste_here').innerHTML = '';
  fr.readAsText(temp);
  fr.onloadend = function() {
    var content = fr.result;
    var data = JSON.parse(content);
    nodes.length = 0;
    if(data != null) {
      for(var i = 0; i < data.length; i++) {
        nodes[i] = new Array();
        for(var j = 0; j < data[i].length; j++) {
          nodes[i][j] = new Object();
          nodes[i][j].edge = data[i][j].edge;
          nodes[i][j].symbol = data[i][j].symbol;
          if(i == 0)
            nodes[i][j].Final = data[i][j].Final;
        }
      }
      //Load final states
      final.length = 0;
      for(var i = 0; i < nodes.length; i++) {
        if(nodes[0][i].Final)
          final.push(i);
      }
      alert("File loaded.\n\nClick 'Show Table' to display the new DFA");
    }
    else
      alert('Select a File first.');
  }
}

function saveFile() {
  if(nodes.length > 0) {
    var str = JSON.stringify(nodes)
    var blob = new Blob([str],{type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var link = document.getElementById('link');
    link.href = url;
    link.download = 'renameThisFile.json';
    link.innerHTML = 'Download File';
    link.style.visibility = 'visible';
    link.onclick = function() {
      link.style.visibility = 'hidden';
    }
  }
  else
    alert('Create a DFA first.');
}