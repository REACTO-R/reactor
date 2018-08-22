import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestion} from '../store/questions'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {Header, Container, Step} from 'semantic-ui-react'
import {Line} from 'react-chartjs-2'

class OptimizeNoHelp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      questionText: '',
      question: '',
      answerText: '',
      answerCode: '',
      chartData: {},
      chartOptions: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Time complexity'
              }
            }
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Number of arguments passed (n)'
              }
            }
          ]
        },
        maintainAspectRatio: true
      }
    }
  }

  async componentDidMount() {
    let pathnameArr = this.props.location.pathname.split('/')
    let topicId = pathnameArr[2]
    let subtopicId = pathnameArr[3]
    let questionId = pathnameArr[4]

    await this.props.getQuestion(topicId, subtopicId, questionId)

    let questionInternalId = this.props.questions.id
    let root = this.props.questions.QuestionList
    let answers = root.AQuestions
    console.log('Answers: ', answers)

    let {data} = await axios.get('/api/users/' + this.props.user.id)
    let userQ = data.userQuestions.find(answerObj => {
      return Number(answerObj.questionId) === Number(questionInternalId)
    })
    let chosenApproach = userQ.AQuestionApproach
    
    let chartArray = []
    answers.forEach(answer => {
      let parsedGraph = JSON.parse(answer.optimizationGraph)
      delete parsedGraph.borderDash
      chartArray.push(parsedGraph)
    })

    let answer = answers.find(ans => {
      return Number(ans.id) === Number(chosenApproach)
    })

    this.setState({
      questionText: this.props.questions.text,
      answers: root.AQuestions,
      loaded: true,
      answerText: answer.optimizationText,
      answerCode: answer.optimizationCode,
      chartData: {
        labels: ['0', '5', '10', '15', '20', '25'],
        datasets: chartArray
      }
    })
  }

  render() {
    let pathnameArr = this.props.location.pathname.split('/')
    const link = `/${pathnameArr[1]}/${pathnameArr[2]}/${pathnameArr[3]}/${
      pathnameArr[4]
    }`
    const steps = [
      {
        key: 'R',
        title: 'R',
        description: 'Repeat',
        active: true,
        href: link + '/repeat'
      },
      {
        key: 'E',
        title: 'E',
        description: 'Example',
        active: true,
        href: link + '/repeat/example'
      },
      {
        key: 'A',
        title: 'A',
        description: 'Approach',
        active: true,
        href: link + '/repeat/example/approach'
      },
      {
        key: 'CT',
        title: 'CT',
        description: 'Code+Test',
        active: true,
        href: link + '/repeat/example/approach/editor'
      },
      {
        key: 'O',
        title: 'O',
        description: 'Optimize',
        active: true,
        href: link + '/repeat/example/approach/editor/optimize'
      }
    ]

    return (
      <div>
        <Step.Group
          items={steps}
          widths={8}
          size="tiny"
          style={{
            width: '60%',
            display: 'flex',
            margin: 'auto',
            height: '42px',
            backgroundColor: 'blue'
          }}
        />
        {this.state.loaded && (
          <div>
            <br />
            <Container>
              <Header size="large">{this.state.questionText}</Header>
              <Header size="medium">{this.state.question}</Header>
              {this.state.answers.map(answer => {
                return (
                  <div key={answer.id} style={{fontSize: '17px'}}>
                    {answer.optimizationText}
                  </div>
                )
              })}
              <Line
                data={this.state.chartData}
                options={this.state.chartOptions}
                width={200}
                height={100}
              />
            </Container>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: (topicId, subtopicId, questionId) =>
      dispatch(fetchQuestion(topicId, subtopicId, questionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptimizeNoHelp)
