import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import {Link} from 'react-router-dom'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

export default class Editor extends React.Component {
	constructor() {
		super()
		this.state = {
			code: '',
			input: [10, [1, 10, 5, 3]],
			output: true,
			isWorking: 0 // 0: default state; 1: if the user func works; 2: if user func doesn't work
		}
		this.onChange = this.onChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	onChange(newValue) {
		this.setState({code: newValue})
	}

	handleClick() {
		let userFunc = new Function(`return ${this.state.code}`)()
		if (userFunc(...this.state.input) === this.state.output) {
			this.setState({isWorking: 1})
		} else {
			this.setState({isWorking: 2})
		}
	}

	render() {
		const {isWorking} = this.state
		return (
			<div>
				<p>
					Given a target sum and an array of positive integers, return
					true if any combination of numbers in the array can add to
					the target. Each number in the array may only be used once.
					Return false if the numbers cannot be used to add to the
					target sum.
				</p>
				<p>
					Input: ({this.state.input.map((el, idx) => {
						return <span key={idx}>{JSON.stringify(el)},</span>
					})})
				</p>
				<p>Output: {this.state.output}</p>
				<AceEditor
					mode="javascript"
					theme="monokai"
					value={this.state.code}
					onChange={this.onChange}
					enableLiveAutocompletion={true}
					name="UNIQUE_ID_OF_DIV"
					editorProps={{
						$blockScrolling: true
					}}
				/>
				<button onClick={this.handleClick}>run</button>
				{isWorking === 0 ? null : isWorking === 1 ? (
					<p>
						Your Func is right<Link
							to={
								this.props.history.location.pathname + '/optimize'
							}
						>
							Go Next
						</Link>
					</p>
				) : (
					<p>Your func is not right, sorry</p>
				)}
			</div>
		)
	}
}
