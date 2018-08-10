import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {fetchQuestion} from '../store/questions'
import {connect} from 'react-redux'
import {List, Header, Card, Container} from 'semantic-ui-react'
import {expect} from 'chai'

const initialState = {
  code: '',
  input: [],
  output: [],
  isWorking: 0,
  errorMessage: ''
}

class Editor extends React.Component {
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

  async componentDidMount(){
    let pathnameArr = this.props.location.pathname.split('/')
    console.log(pathnameArr)
    let topicId = pathnameArr[1]
    let subtopicId = pathnameArr[2]
    let questionId = pathnameArr[3]

    
    await this.props.getQuestion(topicId, subtopicId, questionId)
    console.log('prop', this.props)
   
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
    const tests = this.props.questions.CTStuffs
    
    let arr = [1,2]
    let arr2 = [1,2]
    console.log(expect(arr).to.equal(arr))
   
    // try{
    //   let userFunc = new Function(`return ${this.state.code}`)()
    //   let resultArr = tests.map( test => {
    //       let input = JSON.parse(test.Input)
    //       let output = JSON.parse(test.Output)
    //       if(userFunc(input))
    //   })
    //   if((userFunc(...this.state.input)) === this.state.output){
    //     this.setState({isWorking: 1})
    //   } else{
    //     this.setState({isWorking: 2})
    //   }
    // } catch(err){
    //   const error = new Error(err)
    //   this.setState({errorMessage: error.message})
    // }
  }

  render(){
    const { isWorking, errorMessage, code } = this.state
    const tests = this.props.questions.CTStuffs
    console.log('TESTS',tests)
    return(
      <div>
        {tests && 
        <Container>
        <Header as='h1'> {this.props.questions.text} </Header>
        <List horizontal>
        {tests.map(elem=> {
          return (
            <List.Item key={elem.id}>
            <Card>
              <Card.Header> INPUT: </Card.Header>
              <Card.Meta> {elem.Input.slice(1,-1)} </Card.Meta>
              <Card.Header> OUTPUT: </Card.Header>
              <Card.Meta> {elem.Output} </Card.Meta>
             </Card>
            </List.Item>
          )
        }
        )}
          </List>
          </Container>
      }
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

const mapStateToProps = state => {
  return {
    questions: state.questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: (topicId, subtopicId, questionId) => 
      dispatch(fetchQuestion(topicId, subtopicId, questionId))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)