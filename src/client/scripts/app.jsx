import React from 'react';
import {Bond, TimeBond} from 'oo7';
import {Rspan, Rimg, ReactiveComponent} from 'oo7-react';
import {InputBond, HashBond, BButton, TransactionProgressLabel} from 'parity-reactive-ui';
import {bonds, formatBlockNumber, formatBalance, GitHubHintABI} from 'oo7-parity';

const CounterABI = [{"constant":false,"inputs":[{"name":"_option","type":"uint256"}],"name":"vote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"votes","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"who","type":"address"},{"indexed":true,"name":"option","type":"uint256"}],"name":"Voted","type":"event"}];
const Options = ['Red', 'Green', 'Blue'];

export class App extends React.Component {
	constructor() {
		super();
		this.counter = bonds.makeContract('0x7aC77Cb854E064f22E747F40b90FE6D6Bc1e3197', CounterABI);
		this.state = { tx: null };
		this.voted = this.counter.hasVoted(bonds.me);
	}
	render () {
		var votingEnabled = Bond.all([this.voted, this.state.tx])
			.map(([v, t]) => !v && (!t || !!t.failed));
		return (<div>
			{Options.map((n, i) => (<div key={i}><VoteOption
				label={n}
				enabled={votingEnabled}
				votes={this.counter.votes(i)}
				vote={() => this.setState({tx: this.counter.vote(i)})}
			/></div>))}
			<div style={{marginTop: '1em'}}>
				<TransactionProgressLabel value={this.state.tx}/>
			</div>
		</div>);
	}
}

class VoteOption extends ReactiveComponent {
	constructor () {
		super(['votes','enabled']);
		
	}
	readyRender () {
		var s = {float: 'left', minWidth: '3em'};
		if (!this.state.enabled)
			s.cursor = 'not-allowed';
		return (<span style={{ borderLeft:
			`${1 + this.state.votes * 10}px black solid` }}>
			<a
				style={s}
				href='#'
				onClick={this.state.enabled && this.props.vote}>
				{this.props.label}
			</a>
		</span>);
	}
}