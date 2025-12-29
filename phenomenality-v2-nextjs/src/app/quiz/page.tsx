'use client';

import surveyJSON from './_assets/quiz.json';
import React, { useState, useEffect, useMemo } from 'react';
// import * as Survey from "survey-react-ui";
import { Survey, Model } from "survey-react-ui";
import 'survey-core/survey-core.min.css';
import dynamic from 'next/dynamic';
// import '../styles/Quiz.sass'
import styles from './_styles/page.module.sass';
import Link from 'next/link';
import clsx from 'clsx';
// import '../styles/Navigation.sass'

// Dynamically import CanvasJS to avoid SSR issues (document is not defined)
const CanvasJSChart = dynamic(
  () => import('@canvasjs/react-charts').then((mod) => mod.default.CanvasJSChart),
  { ssr: false }
);

// TODO: Work must still be done to replicate the darkrose theme
// https://surveyjs.io/stay-updated/release-notes/v2.0.0
const darkroseTheme = {
  isPanelless: true,
};

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
  
  // Track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);

  // const setResults = props.setResults;
  
  // Create survey model only on client-side to avoid hydration mismatch
  const survey = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const surveyModel = new Model(surveyJSON);
    // Apply custom darkrose-like theme
    surveyModel.applyTheme(darkroseTheme);
    return surveyModel;
  }, []);
  
  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // takes complete survey and converts to an array that's compatible with Canvas.js
  function convertResults(survey, results) {

    var p = 0;
    var s = 0;
    var sh = 0;
    var e = 0;
    var g = 0;
    
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
  useEffect(() => {
    if (!survey) return;
    
    survey.onComplete.add(function (sender) {
      var surveyData = sender.data;
      console.log("Survey done!");
      var quizResults = convertResults(surveyData, results);
      console.log(quizResults);
    });
  }, [survey]);

  

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

        // generate a path to the imposter page for the top character based on results
      var path = "../";
      if (topName === "Perfectionist") {
        path += "type-1";
      } else if (topName === "Superhuman") {
        path += "type-2";
      } else if (topName === "Genius") {
        path += "type-3";
      } else if (topName === "Soloist") {
        path += "type-4";
      } else {
        path += "type-5";
      }

      console.log(path);
      return(
        <div className={styles.results}>
          <h2>You got {' '}   
          <Link
            className={clsx(styles['navbar-link'], styles['link-font'])}
            href={path}
          >
             {topName}
          </Link>!</h2>
          <p>Click {' '}          
          <Link className={clsx(styles['navbar-link'], styles['link-font'])} href='../more-info'>
             here
          </Link>
          {' '} to learn more about the {topName} and other imposter types! </p>
        </div>
      )
    }



  // Don't render until mounted on client to avoid hydration mismatch
  if (!isMounted || !survey) {
    return (
      <div>
        <div className={styles.headerPadding}>
          <h1 className={styles['quiz-title']}>imposter phenomenon quiz</h1>
        </div>
        <div className={styles['quiz-page']}>
          <br></br>
          <p className={styles.instructions}>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (!displayResults) {
    return(
      <div>
        <div className={styles.headerPadding}>
        <h1 className={styles['quiz-title']}>imposter phenomenon quiz</h1>
        </div>
        <div className={styles['quiz-page']}>
          <br></br>
          <p className={styles.instructions}>complete this 30-question quiz to determine which types of imposter phenomenon you identify with most!
          determine how you feel about each statement, <b> from 1 (strongly disagree) to 5 (strongly agree).</b></p>
          <Survey model={survey} />
        </div>
      </div>
    )
  } else {
    return(
      <div className={styles.content}>
        <div className={styles['results-flex-container']}>

        <h1>imposter phenomenon results</h1>
          <span className={clsx(styles['flex-item'], styles['top-result'])}>
            {showTopResult(results)}
          </span>
          <div className={styles['barChart-flex-item']}>
            {renderChart(results)}
          </div>

        </div>
        <p className={styles.disclaimer}>DISCLAIMER: this is not medical advice. these results are meant to be used as a general guideline.</p>
      </div>
      
    )
  }
  
}

export default QuizContent;
