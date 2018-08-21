import {expect} from 'chai'
import React from 'react'
import {shallow} from 'enzyme'
import sinon from 'sinon'
import {question} from './sampledata'
import {List, Header, Message, Container} from 'semantic-ui-react'

//Components
import {Repeat} from './repeat'
import {Example} from './example'
import {Approach} from './approach'

describe('Repeat', () => {
  let repeat
  let instance

  beforeEach(() => {
    let location = {pathname: '/1/1/1'}
    const getQuestionFunc = sinon.spy()
    repeat = shallow(
      <Repeat
        location={location}
        getQuestion={getQuestionFunc}
        questions={question}
      />
    )
    instance = repeat.instance()
  })

  it('should be a class component with an initial local state', () => {
    expect(instance).to.exist // eslint-disable-line no-unused-expressions
    expect(instance.state).to.eql({
      loaded: false,
      questionText: '',
      question: '',
      answers: '',
      showNext: false,
      showAnswers: [],
      questionid: 0
    })
  })

  it('repeat shallow render instance should not be null ', () => {
    expect(instance).to.be.instanceOf(Repeat)
  })

  it('renders the Container', () => {
    let found = repeat.find(Container)
    console.log(found)
    expect(repeat.find(Container)).to.exist
  })
  it('renders the List', () => {
    expect(repeat.find(List)).to.exist
  })
  it('renders the Message', () => {
    expect(repeat.find(Message)).to.exist
  })
})

describe('example', () => {
  let example
  let instance

  beforeEach(() => {
    let location = {pathname: '/1/1/1'}
    const getQuestionFunc = sinon.spy()
    example = shallow(
      <Example
        location={location}
        getQuestion={getQuestionFunc}
        questions={question}
      />
    )
    instance = example.instance()
  })

  it('should be a class component with an initial local state', () => {
    expect(instance).to.exist // eslint-disable-line no-unused-expressions
    expect(instance.state).to.eql({
      loaded: false,
      questionText: '',
      question: '',
      answers: '',
      showNext: false,
      showAnswers: [],
      questionid: 0
    })
  })

  it('Example shallow render instance should not be null ', () => {
    expect(instance).to.be.instanceOf(Example)
  })

  it('renders the Container', () => {
    expect(example.find(Container)).to.exist
  })
  it('renders the List', () => {
    expect(example.find(List)).to.exist
  })
  it('renders the Message', () => {
    expect(example.find(Message)).to.exist
  })
})

describe('Approach', () => {
  let approach
  let instance

  beforeEach(() => {
    let location = {pathname: '/1/1/1'}
    const getQuestionFunc = sinon.spy()
    approach = shallow(
      <Approach
        location={location}
        getQuestion={getQuestionFunc}
        questions={question}
      />
    )
    instance = approach.instance()
  })

  it('should be a class component with an initial local state', () => {
    expect(instance).to.exist // eslint-disable-line no-unused-expressions
    expect(instance.state).to.eql({
      loaded: false,
      questionText: '',
      question: '',
      answers: '',
      showNext: false,
      showAnswers: [],
      questionid: 0
    })
  })

  it('Approach shallow render instance should not be null ', () => {
    expect(instance).to.be.instanceOf(Approach)
  })

  it('renders the Container', () => {
    expect(approach.find(Container)).to.exist
  })
  it('renders the List', () => {
    expect(approach.find(List)).to.exist
  })
  it('renders the Message', () => {
    expect(approach.find(Message)).to.exist
  })
})
