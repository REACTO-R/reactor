import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

export default class Editor extends React.Component {
  constructor(){
    super()
    this.state ={
      code: ''
    }
    this.onChange = this.onChange.bind(this)
    this.handleClick= this.handleClick.bind(this)
  }

  onChange(newValue) {
    this.setState({code: newValue})
  }

  handleClick(){
    eval(this.state.code)
  }

  render(){
    return(
      <div>
      <AceEditor
      mode='javascript'
      theme='monokai'
      value={this.state.code}
      onChange={this.onChange}
      enableLiveAutocompletion={true}
      name='UNIQUE_ID_OF_DIV'
      editorProps={{
        $blockScrolling: true
      }}
      />
      <button onClick={this.handleClick}>run</button>
      </div>
    )
  }
}
