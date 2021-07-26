const pads = [
    {
      key: 'Q',
      Instrument: 'Heater-1',
      mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      key: 'W',
      Instrument: 'Heater-2',
      mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      key: 'E',
      Instrument: 'Heater-3',
      mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      key: 'A',
      Instrument: 'Heater-4_1',
      mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      key: 'S',
      Instrument: 'Heater-6',
      mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      key: 'D',
      Instrument: 'Dsc_Oh',
      mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      key: 'Z',
      Instrument: 'Kick_n_Hat',
      mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      key: 'X',
      Instrument: 'RP4_KICK_1',
      mp3: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      key: 'C',
      Instrument: 'Cev_H2',
      mp3: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];
  
  const inActivePad = {
    color: 'white',
    backgroundColor: '#8e44ad',
   
  }
  
  const activePad = {
    color: 'white',
    backgroundColor: '#1abc9c',
    opacity: '0.8',
    transform: 'scale(0.95)'
  }
  
  
  class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        display:'Instrument will show here'
       }
      this.displayInstru = this.displayInstru.bind(this)
     }
    
     displayInstru(name){
       this.setState({
         display: name
       })
     }
    
        render() {
      return (
      <div id="control-area" className='control-area'>
        <div className='pad-area'>
          <h2>Hit the Pad!</h2>
        {pads.map((dpads, id) => (
          <DrumPads text={dpads.key} key={id} audio={dpads.mp3} instruName={dpads.Instrument} instruDisplay={this.displayInstru}/>
        ))}
            </div>
          
          <AuxPad outputDis={this.state.display}/>
        </div>
      )
     }  
     
   }
  
        
  const AuxPad = (props) => {
    return <div className='aux-pad'>
      <h2>Aux Area</h2>
      <p id='display'>{props.outputDis}</p>
      </div>
  }
  
  
  class DrumPads extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          padStyle: inActivePad
        }
        this.handleKeyPress = this.handleKeyPress.bind(this);
        }
    
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
      document.addEventListener('ended', this.handleKeyPress);
    }
    
    handleKeyPress(e) {
      if (e.key.toUpperCase() === this.props.text) {
        this.playTehPad();
      }
    }
    
    padActivator() {
        if(this.state.padStyle.backgroundColor === '#1abc9c'){
          this.setState({
            padStyle: inActivePad
          });
        } else {
        this.setState ({
          padStyle: activePad
          })
         }
    }
      
      
     playTehPad = () => {
      const sound = document.getElementById(this.props.text);
      const parent = sound.parentNode;
      parent.classList.add('active');
      sound.currentTime = 0;
      this.padActivator();
      setTimeout(() => this.padActivator(), 100);
      sound.play();
      this.props.instruDisplay(this.props.instruName.replace(/[-_]/g, ' '));
    }
    
    
  
    render() {
      
      const {text, audio} = this.props;
      
      return (
        <div className='drum-pad' id={`drum-pad-${text}`} onClick={this.playTehPad} style={this.state.padStyle}>
          {text}
          <audio ref={this.audio} src={audio} className='clip' id={text} />
    
        </div>
      
      )
    }
  }
  
  
  
  
  ReactDOM.render(<App />, document.getElementById('drum-machine'))