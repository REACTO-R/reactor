import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {fetchQuestion} from '../store/questions'
import {connect} from 'react-redux'
import {List, Header, Card, Container} from 'semantic-ui-react'
import { expect } from 'chai'


class Editor extends React.Component {
  constructor() {
    super()
    this.state = {
      code: '',
      isWorking: 0, // 0: default state; 1: if the user func works; 2: if user func doesn't work
      errorMessage: '',
      results: []
    }
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    let pathnameArr = this.props.location.pathname.split('/')
    let topicId = pathnameArr[1]
    let subtopicId = pathnameArr[2]
    let questionId = pathnameArr[3]
    await this.props.getQuestion(topicId, subtopicId, questionId)
  }

  onChange(newValue) {
    if (this.state.isWorking !== 0) {
      this.setState({isWorking: 0})
    }
    if (this.state.errorMessage) {
      this.setState({errorMessage: ''})
    }
    this.setState({code: newValue})
  }

  handleClick() {
    try {
      const tests = this.props.questions.CTStuffs
      let userFunc = new Function(`return ${this.state.code}`)()
      console.log('tests:', tests)
      let resultArr = tests.map(test => {
        let result
        try{
          let input = JSON.parse(test.Input)
          let output = JSON.parse(test.Output)
          result = userFunc(...input)
          expect(result).to.be.deep.equal(output)
          return {passed: true, output: result}
        } catch(err){
          console.log(err)
          const error = new Error(err)
          return {passed: false, output: result, error: error.message}
        }
      })
      this.setState({results: resultArr})
    } catch (err) {
      const error = new Error(err)
      this.setState({errorMessage: error.message})
    }

  }

  render() {
    console.log(this.state)
    const {isWorking, errorMessage, code, results} = this.state
    const tests = this.props.questions.CTStuffs
    return (
      <div>
        {tests && (
          <Container>
            <Header as="h1"> {this.props.questions.text} </Header>
            <List horizontal>
              {tests.map((elem, idx) => {
                return (
                  <List.Item key={elem.id}>
                    <Card>
                      <Card.Header> INPUT: </Card.Header>
                      <Card.Meta> {elem.Input.slice(1, -1)} </Card.Meta>
                      <Card.Header> OUTPUT: </Card.Header>
                      <Card.Meta> {elem.Output} </Card.Meta>
                      {!results.length ? null : results[idx].passed ? <p>You passed</p> : <p>You failed. Your output: {JSON.stringify(results[idx].output)} Error: {results[idx].error}</p> }
                    </Card>
                  </List.Item>
                )
              })}
            </List>
          </Container>
        )}
        <AceEditor
          mode="javascript"
          theme="monokai"
          value={code}
          onChange={this.onChange}
          enableLiveAutocompletion={true}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{
            $blockScrolling: true
          }}
        />
        <button onClick={this.handleClick}>run</button>
        {isWorking === 0 ? null : isWorking === 1 ? (
          <p>Your Func is right</p>
        ) : (
          <p>Your func is not right, sorry</p>
        )}
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
