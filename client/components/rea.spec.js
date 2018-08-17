import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Repeat} from './repeat'
import {Example} from './example'
import {Approach} from './approach'


const adapter = new Adapter()
enzyme.configure({adapter})

describe('Repeat', () => {
    let repeat
    let instance

    beforeEach(() => {
        let location = {pathname: '/1/1/1'}
        repeat = shallow(<Repeat location={location}/>);
        instance = repeat.instance()
        console.log(repeat.name())
       
    })

    it('repeat shallow render instance should not be null ', () => {
        expect(instance).to.be.instanceOf(Repeat)
    })

    it('renders a div', () => {
        expect(repeat.name()).to.equal('div')
    })


})

describe('example', () => {
    let example
    let instance

    beforeEach(() => {
        let location = {pathname: '/1/1/1'}
        example = shallow(<Example location={location}/>);
        instance = example.instance()
        console.log(example.name())
       
    })

    it('Approac shallow render instance should not be null ', () => {
        expect(instance).to.be.instanceOf(Example)
    })

    it('renders a div', () => {
        expect(example.name()).to.equal('div')
    })
})

describe('Approach', () => {
    let approach
    let instance

    beforeEach(() => {
        let location = {pathname: '/1/1/1'}
        approach = shallow(<Approach location={location}/>);
        instance = approach.instance()
        console.log(approach.name())
       
    })

    it('Approac shallow render instance should not be null ', () => {
        expect(instance).to.be.instanceOf(Approach)
    })

    it('renders a div', () => {
        expect(approach.name()).to.equal('div')
    })

    
})

