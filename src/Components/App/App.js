import React from 'react';
import './App.scss';

import * as ml5 from "ml5"

import tiger from "./tiger.jpg"

export default class App extends React.Component {
    state = {
        image: document.getElementById('image'),
        error: null,
        results: [],
        depth: 5
    }
    classifyImg() {
        // Initialize the Image Classifier method with MobileNet
        const classifier = ml5.imageClassifier('MobileNet', modelLoaded);
        // Put the image to classify inside a variable
        const image = document.getElementById('image')

        // When the model is loaded
        function modelLoaded() {
            console.log("model loaded")
        }

        classifier.predict(image, 5, (err, results) => {
            if(err) {
                console.log('==================================')
                console.log(err)
                console.log('==================================')
            }
            this.setState({
                results: results
            })
        })
    }

    componentDidMount() {
        this.classifyImg()
    }

    render() {
        let { results } = this.state
        return (
            <div className="App">
                <h1>Image Classification with ML5.js</h1>
                <img src={ tiger } id = "image" width = "400" alt = "" />

                <ol>
                    {
                        (results||[]).map((result, key) => {
                            return(
                                <li key = {key}>{ result.className } - Probability: { result.probability }</li>
                            )
                        })
                    }
                </ol>
            </div>
        );
    }
}
