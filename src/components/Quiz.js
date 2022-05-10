import surveyJSON from './quiz.json';
import React, { useEffect, useState } from 'react';
import * as Survey from "survey-react";
import "survey-react/survey.css";
import CanvasJSReact from '../assets/canvasjs.react';
import '../css/Quiz.css'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Tracks the quiz results and updates the state variable created when the user enters or refreshes the page
function QuizContent(props) {

  // syncs with the state variable 
  // const results = props.results;

  const freshResults = [{"y":0,"indexLabel":"Perfectionist"},
                        {"y":0,"indexLabel":"Soloist"},
                        {"y":0,"indexLabel":"Superhuman"},
                        {"y":0,"indexLabel":"Expert"},
                        {"y":0,"indexLabel":"Genius"}];

  const [results, setResults] = useState(freshResults);

  const [displayResults, setDisplayResults] = useState(false);

  const [topResult, setTopResult] = useState(results[0].y);
  const [topName, setTopName] = useState(results[0].indexLabel);

  // const setResults = props.setResults;
  
  // style of the quiz (stone = black)
  Survey.StylesManager.applyTheme( 'darkrose');

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
    
    // FIX THIS PART FOR LOGIC!!!! used to be var key, is var valueName the correct thing to replace it with?
    // nested if statement?

    //survey.map((item) => {
      //if(item.charAt(0) == 'P') {
      for (var key in survey) {
        if(survey[key] === "P1"){           
          p+=1;
        } else if (survey[key] === "P2") {
          p+=2;
        } else if (survey[key] === "P3") {
           p+=3;
        } else if (survey[key] === "P4") {
           p+=4;
        } else if (survey[key] === "P5") {
           p+=5;
        } else if (survey[key] === "S1"){           
           s+=1;
        } else if (survey[key] === "S2") {
           s+=2;
        } else if (survey[key] === "S3") {
           s+=3;
        } else if (survey[key] === "S4") {
           s+=4;
        } else if (survey[key] === "S5") {
          s+=5;
        } else if (survey[key] === "G1") {
          g+=1;
        } else if (survey[key] === "G2") {
          g+=2;
        } else if (survey[key] === "G3") {
          g+=3;
        } else if (survey[key] === "G4") {
          g+=4;
        } else if (survey[key] === "G5") {
          g+=5;
        } else if (survey[key] === "SH1") {
          sh+=1;
        } else if (survey[key] === "SH2") {
          sh+=2;
        } else if (survey[key] === "SH3") {
          sh+=3;
        } else if (survey[key] === "SH4") {
          sh+=4;
        } else if (survey[key] === "SH5") {
          sh+=5;
        } else if (survey[key] === "E1") {
          e+=1;
        } else if (survey[key] === "E2") {
          e+=2;
        } else if (survey[key] === "E3") {
          e+=3;
        } else if (survey[key] === "E4") {
          e+=4;
        } else if (survey[key] === "E5") {
          e+=5;
        }
      };


    // delayed computation until after survey is complete
    const handleResults = () => {
      // create a copy of state and update elements as needed
      // item: the current element of the results array
      // index: the current entry number we are looking at
      const resultsCopy = results.map((item) => {
        // update current counts with new results
        if (item.indexLabel === "Perfectionist") {
          item.y = p;
          item.name = "Perfectionist";
        } else if (item.indexLabel === "Soloist") {
          item.y = s;
          item.name = "Soloist";
        } else if (item.indexLabel === "Superhuman") {
          item.y = sh;
          item.name = "Superhuman";
        } else if (item.indexLabel === "Expert") {
          item.y = e;
          item.name = "Expert";
        } else if (item.indexLabel === "Genius") {
          item.y = g;
          item.name = "Genius";
        } 
        return item;
      })

      setResults(resultsCopy);

    }
    // the format the canvas.js needs to display results
    var currentResults = [{"y":p,"indexLabel":"Perfectionist","name":"Perfectionist"},
                          {"y":s,"indexLabel":"Soloist", "name":"Soloist"},
                          {"y":sh,"indexLabel":"Superhuman", "name":"Superhuman"},
                          {"y":e,"indexLabel":"Expert", "name":"Expert"},
                          {"y":g,"indexLabel":"Genius","name":"Genius"}];
  

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
        theme: "light2",
        dataPointWidth: 200,
        axisX:{
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 2,
          labelFormatter: function(){
            return " ";
          }
        },
        axisY:{
          gridThickness: 0,
          tickLength: 0,
          lineThickness: 2,
          labelFormatter: function(){
            return " ";
          }
        },
        data: [{
          type: "column",
          dataPoints: results
        }]
      }
    
      // displays the bar chart
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
        <div className='results'>
          <h2>You got {topName}!</h2>
          <p>Click here to learn more about the {topName} and other imposter types! </p>
        </div>
      )
    }



  if (!displayResults) {
    return(
      <div>
        <div className="headerPadding">
        <h1 className='quiz-title'>imposter phenomenon quiz</h1>
        </div>
        <div className='quiz-page'>
          <br></br>
          <p className="instructions">complete this 30-question quiz to determine which types of imposter phenomenon you identify with most!
          determine how you feel about each statement, <b> from 1 (strongly disagree) to 5 (strongly agree).</b></p>
          <Survey.Survey model={survey} />
        </div>
      </div>
    )
  } else {
    return(
      <div className="content">
        <div className="results-flex-container">
        <h1>imposter phenomenon results</h1>
          <span className="flex-item top-result">
            {showTopResult(results)}
          </span>
          <div className="barChart-flex-item">
            {renderChart(results)}
          </div>

        </div>
        <p className='disclaimer'>DISCLAIMER: this is not medical advice. these results are meant to be used as a general guideline.</p>
      </div>
      
    )
  }
  
}

export default QuizContent;
