import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Repeat} from './repeat'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Repeat', () => {
    let repeat

    beforeEach(() => {
        repeat = shallow(<Repeat />)
        console.log(repeat)
       
    })

    it('renders ', () => {
        expect(repeat.exists('ui container'.to.equal(true)))
    })
})