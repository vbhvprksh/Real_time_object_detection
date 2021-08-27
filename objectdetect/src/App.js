import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import React,{useRef,useState,useEffect} from 'react';
import { webcam } from '@tensorflow/tfjs-data';
import * as cocossd from '@tensorflow-models/coco-ssd';

function App() {

  const webcamRef=useRef(null);
  const canvasRef=useRef(null);
  const runCocoSSD =async() =>{

    ///loaddata
    const net =await cocossd.load();


    setInterval(()=>{
      detectImage(net)
    },10);
  }

  const detectImage =async(net) =>{
    if(
      typeof webcamRef.current != 'undefined'  && webcamRef.current !== null && webcamRef.current.video.readyState ==4
    )
    {
      const video=webcamRef.current.video;
      const videoWidth=webcamRef.current.video.videoWidth;
      const videoHeight=webcamRef.current.video.videoHeight;


      webcamRef.current.video.width=videoWidth;
      webcamRef.current.video.width=videoHeight;

      
      canvasRef.current.width=videoWidth;
      canvasRef.current.width=videoHeight;


      const infe=await net.detect(video);
      console.log(infe);

      const ctx =canvasRef.current.getContext("2d");


    }
  };

  useEffect(() => {runCocoSSD()},[]);

  return (
    <div className="App">
      
      <Webcam
      ref={webcamRef}
      method={true}
      style={{
        position:'absolute',
        marginLeft:'auto',
        marginRight:'auto',
        left:0,
        right:0,
        textAlign:'center',
        zIndex:9,
        width:640,
        height:480,
      }}
      />




      <canvas
      ref={canvasRef}

      style={{
        position:'absolute',
        marginLeft:'auto',
        marginRight:'auto',
        left:0,
        right:0,
        textAlign:'center',
        zIndex:9,
        width:640,
        height:480,
      }}
      />
    </div>
  );
}

export default App;
