import surveyJSON from './quiz.json';
import React, { useEffect, useState } from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import CanvasJSReact from '../assets/canvasjs.react';
// import './ResultsPage.css';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Tracks the quiz results and updates the state variable created when the user enters or refreshes the page
function QuizContent(props) {

  // syncs with the state variable 
  // const results = props.results;

  const freshResults = [{"y":0,"indexLabel":"Violet"},
                        {"y":0,"indexLabel":"Dash"},
                        {"y":0,"indexLabel":"Mr. Incredible"},
                        {"y":0,"indexLabel":"Elastigirl"},
                        {"y":0,"indexLabel":"Edna Mode"},
                        {"y":0,"indexLabel":"None"}];

  const [results, setResults] = useState(freshResults);

  const [displayResults, setDisplayResults] = useState(false);

  const [topResult, setTopResult] = useState(results[0].y);
  const [topName, setTopName] = useState(results[0].indexLabel);

  // const setResults = props.setResults;
  
  // style of the quiz (stone = black)
  Survey.StylesManager.applyTheme("stone");

  // the variable used to track quiz results 
  var survey = new Survey.Model(surveyJSON);

  // takes complete survey and converts to an array that's compatible with Canvas.js
  function convertResults(survey, results) {

    var p = 0;
    var s = 0;
    var sh = 0;
    var e = 0;
    var g = 0;
    var n = 0;
    
    for (var key in survey) {
      if(survey[key] === "P"){
        p+=14.29;
      } else if (survey[key] === "S") {
        s+=14.29;
      } else if (survey[key] === "SH") {
        sh+=14.29;
      } else if (survey[key] === "E") {
        e+=14.29;
      } else if (survey[key] === "G") {
        g+=14.29;
      } else {
        n+=14.29;
      } 
    }

    // delayed computation until after survey is complete
    const handleResults = () => {
      // create a copy of state and update elements as needed
      // item: the current element of the results array
      // index: the current entry number we are looking at
      const resultsCopy = results.map((item) => {
        // update current counts with new results
        if (item.indexLabel === "Violet") {
          item.y = p;
          item.name = "Perfectionist";
        } else if (item.indexLabel === "Dash") {
          item.y = s;
          item.name = "Soloist";
        } else if (item.indexLabel === "Mr. Incredible") {
          item.y = sh;
          item.name = "Superhuman";
        } else if (item.indexLabel === "Elastigirl") {
          item.y = e;
          item.name = "Expert";
        } else if (item.indexLabel === "Edna Mode") {
          item.y = g;
          item.name = "Genius";
        } else {
          item.y = n;
          item.name = "N/A";
        }
        return item;
      })

      setResults(resultsCopy);

    }
    // the format the canvas.js needs to display results
    var currentResults = [{"y":p,"indexLabel":"Violet","name":"Perfectionist"},
                          {"y":s,"indexLabel":"Dash", "name":"Soloist"},
                          {"y":sh,"indexLabel":"Mr. Incredible", "name":"Superhuman"},
                          {"y":e,"indexLabel":"Elastigirl", "name":"Expert"},
                          {"y":g,"indexLabel":"Edna Mode","name":"Genius"},
                          {"y":n,"indexLabel":"None", "name":"N/A"}];

    handleResults(); // final step: update state

    setDisplayResults(true);

    return currentResults;
  }

  // signals quiz has been complete and starts processing results by calling convertResults
  survey
    .onComplete
    .add(function (sender) {
      var surveyData = sender.data;
      console.log("Survey done!");
      var quizResults = convertResults(surveyData, results);
      console.log(quizResults);
    });

  
    function renderChart(results) {
      // the main variable that sets up the pie chart. allows for results to be exported!
      const options = {
        exportEnabled: true,
        animationEnabled: true,
        data: [{
          type: "pie",
          startAngle: 75,
          showInLegend: "true",
          toolTipContent: "{indexLabel} ({name}) {y}%",
          legendText: "{indexLabel}",
          indexLabelFontSize: 16,
          dataPoints: results
        }]
      }
    
      // displays the pie chart
      return(
        <div>
          <CanvasJSChart options={options} />
        </div>
      )
    }

    function showTopResult(results) {
      // find the name of the top result
      // var topResult = results[0].y;
      // var topName = results[0].indexLabel;
      for (var i = 0; i < results.length; i++) {
        if (results[i].y > topResult) {
          setTopResult(results[i].y);
          setTopName(results[i].indexLabel);
          // topResult = results[i].y;
          // topName = results[i].indexLabel;
        }
      }
      return(
        <div>
          <h2>You got {topName}!</h2>
          <p>Click the button to see how you and {topName} can work 
          to defeat imposter syndrome. To learn more about the other 
          imposter types, go to the corresponding tab on the dropdown menu.</p>
        </div>
      )
    }



  if (!displayResults) {
    return(
      <div>
        <h1>Which Type of Imposter PHENOMENON Do You Have?</h1>
        <p className="instructions">Complete this quick, 7-question quiz to 
        determine which type of imposter syndrome you have, if any. You may 
        find that multiple answers to one question apply to you. We encourage 
        you to select the option that most aligns with your typical patterns.</p>
        <Survey.Survey model={survey} />
      </div>
    )
  } else {
    return(
      <div className="content">
        <div className="flex-container">
        <h1>Imposter Syndrome Results</h1>
          <span className="flex-item top-result">
            {showTopResult(results)}
          </span>
          <div className="pieChart flex-item">
            {renderChart(results)}
          </div>

        </div>
        <p>DISCLAIMER: This is not medical advice. These results are meant to be used as a general guideline.</p>
      </div>
      
    )
  }
  
}

export default QuizContent;
