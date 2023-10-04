import React, { useState } from 'react';

import { Chart } from './Chart';
import { findWinners } from '../utils';

export interface UserData {
    id: string;
    wins: number;
    rounds: number;
}



export const Workplace = () => {
    const [users, setUsers] = useState(5);
    const [wins, setWins] = useState(10);
    const [rounds, setRounds] = useState(90);
    const [cycles, setCycles] = useState(10000);

    const usersDataCorrection: UserData[] = [];
    const usersDataUniform: UserData[] = [];

    for (let i = 0; i < users; i++) {
        usersDataCorrection.push({
            id: `#${i+1}`,
            wins: i % 2 === 0 ? 0 : wins * i,
            rounds: rounds,
        })

        usersDataUniform.push({
            id: `#${i+1}`,
            wins: i % 2 === 0 ? 0 : wins * i,
            rounds: rounds,
        })
    }

    for (let i = 0; i < cycles; i++) {
        const [winnerWithCorrection, winnerWithUniform] = findWinners(usersDataCorrection, usersDataUniform);
        ++winnerWithCorrection.wins;
        ++winnerWithUniform.wins;
        usersDataCorrection.forEach(userData => userData.rounds++);
        usersDataUniform.forEach(userData => userData.rounds++);
    }

    const labels = usersDataCorrection.map(userData => userData.id);
    const data = {
        labels,
        datasets: [
            {
                label: 'Uniform Distribution',
                data: usersDataUniform.map(userData => userData.wins),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.3)',
                borderWidth: 2,
                tension: 0.2,
            },
            {
                label: 'Distribution with corrections',
                data: usersDataCorrection.map(userData => userData.wins),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.3)',
                borderWidth: 2,
                tension: 0.2,
            },
        ],
    };
    const options = {
    }


    return <div className="workplace">
        <h1>Volunteling Distributions Chart</h1>
        <Chart
            data={data}
            options={options}
        />
    </div>
}
