import React, { useState } from 'react';

import './App.css';

function App() {

	interface trening {
		dataDayEvent: string;
		distantKmEvent: number;
		index: number
	}

	const [arrayTreningDay, setArrayTreningDay] = useState<trening[]>([]);
	const [dataDayEvent, setDataDay] = useState('');
	const [distantKmEvent, setDistantKm] = useState('');

	const diary = () => {
		const parsDistant = parseFloat(distantKmEvent);

		if (!dataDayEvent || isNaN(parsDistant)) {
			alert('Invalid input. Please enter a valid date and distance.');
			return;
		}

		if (dataDayEvent && !isNaN(parsDistant)) {
			const newArrayTreningDay = [...arrayTreningDay];
			let found = false;

			for (let i = 0; i < newArrayTreningDay.length; i++) {
				if (newArrayTreningDay[i].dataDayEvent === dataDayEvent) {
					newArrayTreningDay[i].distantKmEvent += parsDistant
					newArrayTreningDay[i].distantKmEvent = parseFloat(newArrayTreningDay[i].distantKmEvent.toFixed(1))
					found = true
					break
				}
			}

			if (!found) {
				const newTrening: trening = {
					dataDayEvent,
					distantKmEvent: parsDistant,
					index: 0
				};
				newArrayTreningDay.push(newTrening);
			}

			setArrayTreningDay(newArrayTreningDay);

			newArrayTreningDay.sort((a, b) => new Date(a.dataDayEvent).getTime() - new Date(b.dataDayEvent).getTime());


			setDataDay('');
			setDistantKm('');
		}
	};

	const closet = (index: number) => {
		const newArray = [...arrayTreningDay]
		newArray.splice(index, 1);
		setArrayTreningDay(newArray);
	}

	return (

		<div className="icont w-full">
			<div className="input">
				<input
					type="date"
					placeholder="Дата:"
					className="input input-bordered w-full max-w-xs"
					value={dataDayEvent}
					onChange={(e) => setDataDay(e.target.value)}
				/>
				<input
					type="number"
					placeholder="Расстояние (км)"
					className="input input-bordered w-full max-w-xs"
					value={distantKmEvent}
					onChange={(e) => setDistantKm(e.target.value)}
				/>
				<button className="btn btn-outline btn-warning w-28" onClick={diary}>
					Ok
				</button>
			</div>

			<div className="table-link">
				<table className="table">
					<thead>
						<tr>
							<th>
								<p>Дата</p>
							</th>
							<th>
								<p>Пройдено (км)</p>
							</th>
							<th>
								<p>Действия</p>
							</th>
						</tr>
					</thead>
					<tbody>
						{arrayTreningDay.map((trening, index) => (
							<tr key={index}>
								<td>{trening.dataDayEvent}</td>
								<td>{trening.distantKmEvent.toFixed(1)}</td>
								<td className="tdfree">
									<button className="editbtn"></button>
									<button className="btn btn-square btn-outline btn-xs" onClick={() => closet(index)}>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
										</svg>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
