import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

const initialState = {
  code: '',
  input: [],
  output: [],
  isWorking: 0,
  errorMessage: ''
}

export default class Editor extends React.Component {
  constructor(){
    super()
    this.state ={
      code: '',
      input: [10, [1,10,5,3]],
      output: true,
      isWorking: 0, // 0: default state; 1: if the user func works; 2: if user func doesn't work
      errorMessage: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleClick= this.handleClick.bind(this)
  }

  onChange(newValue) {
    if(this.state.isWorking !== 0){
      this.setState({isWorking: 0})
    }
    if(this.state.errorMessage){
      this.setState({errorMessage: ''})
    }
    this.setState({code: newValue})
  }

  handleClick(){
    try{
      let userFunc = new Function(`return ${this.state.code}`)()
      if((userFunc(...this.state.input)) === this.state.output){
        this.setState({isWorking: 1})
      } else{
        this.setState({isWorking: 2})
      }
    } catch(err){
      const error = new Error(err)
      this.setState({errorMessage: error.message})
    }
  }

  render(){
    const { isWorking, errorMessage, output, code } = this.state
    return(
      <div>
        <p>Given a target sum and an array of positive integers, return true if any combination of numbers in the array can add to the target. Each number in the array may only be used once. Return false if the numbers cannot be used to add to the target sum.</p>
        <p>Input: ({this.state.input.map((el,idx)=> {
          return (
            <span key={idx}>{JSON.stringify(el)},</span>
          )
        }
        )})</p>
        <p>Output: {JSON.stringify(output)}</p>
      <AceEditor
      mode='javascript'
      theme='monokai'
      value={code}
      onChange={this.onChange}
      enableLiveAutocompletion={true}
      name='UNIQUE_ID_OF_DIV'
      editorProps={{
        $blockScrolling: true
      }}
      />
      <button onClick={this.handleClick}>run</button>
      {isWorking ===  0 ? null : isWorking === 1 ? <p>Your Func is right</p> : <p>Your func is not right, sorry</p>
      }
      {errorMessage && <p>{errorMessage}</p>}
      </div>
    )
  }
}
