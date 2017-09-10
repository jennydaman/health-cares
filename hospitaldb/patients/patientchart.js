
google.charts.load('current', { packages: ['corechart', 'line', 'table'] });
google.charts.setOnLoadCallback(onLoad);

var nurseNames, nurseName, patientIDs, patientNames, patientsFound, buttonsMade, views, seenStatus;


function onLoad() {
  patientIDs = [];
  patientNames = [];
  views = [];
  seenStatus = [];

  // Get patients for Nurse
  var patientsURL = 'https://docs.google.com/spreadsheets/d/1dxiyW88eklkYGL1ziUx7S4BEwlpwvv5Ew5UIEln7ozM/gviz/tq?sheet=Sheet1&tq=';
  var queryPatients = patientsURL + encodeURIComponent('SELECT A, B, C');// WHERE C = \'' + nurseNames[0] + '\'');
  var query = new google.visualization.Query(queryPatients);
  query.send(getPatientIDs);
}

function getPatientIDs(response) {
  var data = response.getDataTable();
  for (i = 1; i < data.getNumberOfRows(); i++) {
    if (data.getValue(i, 2) == nurseName) {
      patientIDs.push(data.getValue(i, 0));
      patientNames.push(data.getValue(i, 1));
      views.push("hidden");
      seenStatus.push("new");
    }
  }
  makeButtons();
}

function makeButtons() {
  for (i = 0; i < patientIDs.length; i++) {

    var seenBtn = document.createElement("BUTTON");
    seenBtn.setAttribute("id", (i + 1) * patientIDs.length * patientIDs.length);
    seenBtn.style.background = '#ffff00';

    var nameBtn = document.createElement("BUTTON");
    nameBtn.setAttribute("id", i);
    var nameText = document.createTextNode(patientNames[i]);
    nameBtn.appendChild(nameText);
    /*
            var expandBtn = document.createElement("BUTTON");
            expandBtn.setAttribute("id", (i + 1) * patientIDs.length);
            var expandText = document.createTextNode('>');
            expandBtn.appendChild(expandText);
    
            lastElement = document.getElementById('outer_div');
            lastElement.appendChild(expandBtn);
            lastElement.insertBefore(expandBtn, lastElement.firstChild);
            expandBtn.addEventListener("click", function(){
              expandStats((this.id / patientIDs.length) - 1);
            });
    */
    lastElement = document.getElementById('outer_div');
    lastElement.appendChild(nameBtn);
    lastElement.insertBefore(nameBtn, lastElement.firstChild);
    nameBtn.addEventListener("click", function () {
      expandStats(this.id);
    });

    lastElement = document.getElementById('outer_div');
    lastElement.appendChild(seenBtn);
    lastElement.insertBefore(seenBtn, lastElement.firstChild);
    seenBtn.addEventListener("click", function () {
      var numID = ((this.id / patientIDs.length) / patientIDs.length) - 1;
      var white = '#ffffff'
      var red = '#f44336';
      var blue = '#008CBA';
      var green = '#4CAF50';
      var yellow = '#ffff00';
      var current = seenStatus[numID];

      if (current == "noticed") {
        seenStatus[numID] = "visited"
        this.style.background = white;
      } else if (current == "new") {
        seenStatus[numID] = "noticed"
        this.style.background = blue;
      } else {
        seenStatus[numID] = "new"
        this.style.background = yellow;
      }

      toggleSeen();
    });
  }
  placeImage();

}

function toggleSeen() {

}

function onClick(numID) {

}


function expandStats(numID) {
  patientID = patientIDs[numID];
  drawPatientStats(patientID);
  var elements = [document.getElementById('chart_div1'),
  document.getElementById('chart_div2'),
  document.getElementById('chart_div3'),
  document.getElementById('chart_div4'),
  document.getElementById('chart_div5'),
  document.getElementById('chart_div6'),
  document.getElementById('chart_div7'),
  document.getElementById('chart_div8'),
  document.getElementById('chart_div9'),
  document.getElementById('chart_div10')];
  view = views[numID];
  if (view == 'hidden') {
    for (i = 0; i < views.length; i++) {
      views[i] = 'hidden';
    }
    views[numID] = 'visible';
    for (i = 0; i < elements.length; i++) {
      element = elements[i];
      element.style.visibility = 'visible';
    }
  } else {
    views[numID] = 'hidden';
    for (i = 0; i < elements.length; i++) {
      element = elements[i];
      element.style.visibility = 'hidden';
    }
    placeImage();
  }

}

function drawPatientStats(patientID) {
  var innerString = "<div id=\"chart_div1\"></div><div id=\"chart_div2\"></div><div id=\"chart_div3\"></div><div id=\"chart_div4\"></div><div id=\"chart_div5\"></div><div id=\"chart_div6\"></div><div id=\"chart_div7\"></div><div id=\"chart_div8\"></div><div id=\"chart_div9\"></div><div id=\"chart_div10\"></div>"

  var moodURL = 'https://docs.google.com/spreadsheets/d/1PfrfQbMnWAKzX4tdq2QapQS7lp1Q5HsmAQ0CU8Bv0nI/gviz/tq?sheet=Sheet1&tq=';
  var querySatisfaction = moodURL + encodeURIComponent('SELECT A, B WHERE G = \'' + patientID + '\'');
  var queryUneasiness = moodURL + encodeURIComponent('SELECT A, C WHERE G = \'' + patientID + '\'');
  var queryFrustration = moodURL + encodeURIComponent('SELECT A, D WHERE G = \'' + patientID + '\'');
  var queryPleasantness = moodURL + encodeURIComponent('SELECT A, E WHERE G = \'' + patientID + '\'');
  var queryEnergy = moodURL + encodeURIComponent('SELECT A, F WHERE G = \'' + patientID + '\'');

  var physicalURL = 'https://docs.google.com/spreadsheets/d/1reYO7n97ill5BZa1SY6SRkI2hnY_K_h5OuWTxPtWZJ4/gviz/tq?sheet=Sheet1&tq=';
  var queryPainLevel = physicalURL + encodeURIComponent('SELECT A, B WHERE G = \'' + patientID + '\'');
  var queryPainType = physicalURL + encodeURIComponent('SELECT A, C WHERE G = \'' + patientID + '\'');
  var querySymptoms = physicalURL + encodeURIComponent('SELECT A, D WHERE G = \'' + patientID + '\'');
  var queryPainLocation = physicalURL + encodeURIComponent('SELECT A, E WHERE G = \'' + patientID + '\'');
  var queryNeeds = physicalURL + encodeURIComponent('SELECT A, F WHERE G = \'' + patientID + '\'');

  var queries = [querySatisfaction, queryUneasiness, queryFrustration, queryPleasantness, queryEnergy, queryPainLevel, queryPainType, querySymptoms, queryPainLocation, queryNeeds];
  var titles = [' Patient Satisfaction', 'Patient Uneasiness',
    'Patient Frustration', 'Patient Pleasantness',
    'Patient Energy', 'Pain Level', 'Pain Type',
    'Symptom Change', 'Pain Location', 'Other Needs'];
  var charts = ["chart", "chart", "chart", "chart", "chart", "chart", "table",
    "table", "table", "table"]

  var handlers = [handlerSatisfaction, handlerUneasiness, handlerFrustration, handlerPleasantness, handlerEnergy, handlerPainLevel, handlerPainType, handlerSymptoms, handlerPainLocation, handlerNeeds];

  document.getElementById("inner_div").innerHTML = innerString;

  for (i = 0; i < queries.length; i++) {
    var query = new google.visualization.Query(queries[i]);
    query.send(handlers[i]);
    //query.send(function(response){myHandler(response, titles[i], charts[i], i + 1)})
  }
}

function myHandler(response, title, chartType, num) {
  alert("here")
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  if (chartType == "chart") {
    var chart = new google.visualization.LineChart(document.getElementById('chart_div' + num));
  } else {
    var chart = new google.visualization.Table(document.getElementById('chart_div' + num));
  }

  var options = {
    title: 'Patient Satisfaction',
    hAxis: { title: 'Patient Satisfaction' },
    vAxis: { title: 'Patient Response' }
  };
  chart.draw(data, options);
}

function placeImage() {

  var myImg = document.createElement("img");
  myImg.src = 'abstractRoomView.jpg';
  document.getElementById('chart_div1').appendChild(myImg);
}

function handlerSatisfaction(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.LineChart(document.getElementById('chart_div1'));

  var options = {
    title: 'Patient Satisfaction',
    hAxis: { title: 'Patient Satisfaction' },
    vAxis: { title: 'Patient Response' }
  };
  chart.draw(data, options);
}

function handlerUneasiness(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.LineChart(document.getElementById('chart_div2'));
  var options = {
    title: 'Patient Uneasiness',
    hAxis: { title: 'Time' },
    vAxis: { title: 'Patient Response' }
  };
  chart.draw(data, options);
}

function handlerFrustration(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.LineChart(document.getElementById('chart_div3'));
  var options = {
    title: 'Patient Frustration',
    hAxis: { title: 'Time' },
    vAxis: { title: 'Patient Response' }
  };
  chart.draw(data, options);
}

function handlerPleasantness(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.LineChart(document.getElementById('chart_div4'));
  var options = {
    title: 'Patient Pleasantness',
    hAxis: { title: 'Time' },
    vAxis: { title: 'Patient Response' }
  };
  chart.draw(data, options);
}

function handlerEnergy(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.LineChart(document.getElementById('chart_div5'));
  var options = {
    title: 'Patient Energy',
    hAxis: { title: 'Time' },
    vAxis: { title: 'Patient Response' }
  };
  chart.draw(data, options);
}

function handlerPainLevel(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.LineChart(document.getElementById('chart_div6'));
  var options = {
    title: 'Patient Pain Level',
    legend: { position: 'none' },
    hAxis: { title: 'Time' },
    vAxis: { title: 'Patient Response' }
  };
  chart.draw(data, options);
}

function handlerPainType(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.Table(document.getElementById('chart_div7'));
  var options = {
    title: 'Patient Pain Type',
  };
  chart.draw(data, options);
}

function handlerSymptoms(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.Table(document.getElementById('chart_div8'));
  var options = {
    title: 'Symptom Change',
  };
  chart.draw(data, options);
}

function handlerPainLocation(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.Table(document.getElementById('chart_div9'));
  var options = {
    title: 'Patient Emotional State',
  };
  chart.draw(data, options);
}

function handlerNeeds(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  var data = response.getDataTable();
  var chart = new google.visualization.Table(document.getElementById('chart_div10'));
  var options = {
    title: 'Patient Needs',
  };
  chart.draw(data, options);
}



