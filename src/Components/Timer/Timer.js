import React, { Component } from 'react';
import styles from './timer.module.scss';
import CurrentTime from './CurrentTime'
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

class Timer extends Component {
    state = {
        currentTimestamp: 0,
        timerPaused: true
    }
    timestampWhenPaused = 0;

    //start the timer
    start = () =>{
        const timeStart = new Date();   //time when timer starts      
        this.setState({
            currentTimestamp: 0
        });
        this.timerInterval = setInterval(() =>{
            const timeNow = new Date(); 
            const currentTimestamp = this.timestampWhenPaused + timeNow.getTime() - timeStart.getTime(); //calculate current value of the timer            console.log(this.state.currentTime);
            this.setState({
                currentTimestamp: currentTimestamp
            });
        }, 1000);
        this.state.timerPaused && this.setState({
            timerPaused: false
        });  
       
    }

    //pause the timer
    pause = () =>{
        this.timestampWhenPaused = this.state.currentTimestamp; //capture the timer actual duration 
        clearInterval(this.timerInterval); //reset the timer
        this.setState({
            timerPaused: true
        })
    }

    //stop the timer 
     stop = () => {
        clearInterval(this.timerInterval); 
        this.timestampWhenPaused = 0;    
        this.setState({
            currentTimestamp: 0,
            paused: false
        });
        
                
    }  
   
    render(){
        return (
            <div className={styles.wrapper}>
                <CurrentTime timestamp={this.state.currentTimestamp}/>
                <button 
                    onClick = {this.state.timerPaused ? this.start : this.pause} 
                    className = {this.state.timerPaused ? styles.start : styles.pause}>
                        {this.state.timerPaused? <FaPlay className={styles.icon} /> : <FaPause className={styles.icon}  />}
                </button>
                <button 
                    onClick={this.stop}
                    className={styles.stop}>
                        <FaStop />
                </button>
                
            </div>
        );
    }
}

export default Timer;
