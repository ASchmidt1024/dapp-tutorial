import React from 'react';
import {Bond, TimeBond} from 'oo7';
import {Rspan, Rimg} from 'oo7-react';
import {InputBond, HashBond, BButton} from 'parity-reactive-ui';
import {bonds, formatBlockNumber, formatBalance, GitHubHintABI} from 'oo7-parity';

export class App extends React.Component {
	constructor() {
		super();
		this.gavofyork = bonds.registry.lookupAddress('gavofyork', 'A');
	}
	render() {
		return (
			<div>
				My balance: <Rspan>
					{bonds.balance(bonds.me).map(formatBalance)}
				</Rspan>
				<br />
				<BButton
					content='Give gavofyork 100 Finney'
					onClick={() => bonds.post({to: this.gavofyork, value: 100 * 1e12})}
				/>
			</div>
		);
	}
}
