import enzyme, { shallow } from 'enzyme'
import React from 'react'
import { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
const adapter = new Adapter()
import { Editor } from './editor'
enzyme.configure({adapter})
import AceEditor from 'react-ace'

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
  let instance

  beforeEach('set up wrapper', () => {
    wrapper = shallow(<Editor location={location} history={history} questions={questions}/>)
  })

  it('render an IDE', () => {
    expect(wrapper.find(AceEditor)).to.have.length(1)
  })

})
