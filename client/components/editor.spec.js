import enzyme, { shallow } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
const adapter = new Adapter()
import { Editor } from './editor'
enzyme.configure({adapter})
import AceEditor from 'react-ace'
import { List, Button } from 'semantic-ui-react'
const ListItem = List.Item
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

let location = {pathname: '/1/1/1'}
let history = {location:
  {pathname: "/nohelp/1/1/1/repeat/example/approach/editor", search: "", hash: "", state: undefined, key: "lz5qz3"}}
let questions = {CTStuffs: [
  {
    Input: "[[4, 8, 15, 16, 23, 42], [2, 4, 8, 16, 32, 64]]",
    Output: "[4,8,16]",
    QuestionId: 1,
    id: 1
  },
  {
    Input: "[[0,1,2,3], [4,5,6,7,8]]",
    Output: "[]",
    QuestionId: 1,
    id: 2
  }
] }

describe('Editor Component', () => {

  let wrapper

  beforeEach('set up wrapper', () => {
    wrapper = shallow(
    <Editor location={location} history={history} questions={questions}/>)
  })

  describe('renders', () =>{

    let listTests


    it('an IDE', () => {
      expect(wrapper.find(AceEditor)).to.have.length(1)
    })

    it('a list with all tests', () => {
      listTests = wrapper.find(ListItem)
      expect(listTests).to.have.length(questions.CTStuffs.length)

    })
    it('and each one display the Input and Output expected', () => {
      const listOfIO = listTests.map(node => node.html())
      questions.CTStuffs.forEach((question, idx) => {
        const input = question.Input.slice(1, -1)
        const output = question.Output
        expect(listOfIO[idx].includes(input)).to.be.equal(true)
        expect(listOfIO[idx].includes(output)).to.be.equal(true)
      })
    })
  // describe('three different buttons', () => {
  //   let buttons
  //   it('one to run the function', () =>{

  //     buttons = wrapper.find('Button')
  //     console.log(buttons.map(node => node.html()))
  //   })
  //   it('one to save the function in the database', () =>{})
  //   it('one to move to the next page', () => {})
  // })
  })

})
