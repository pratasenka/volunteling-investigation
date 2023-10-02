import React from 'react';


import { Chart } from './Chart';
import { findWinnerCorrection, findWinnerUniform } from '../utils';

export interface UserData {
    id: string;
    wins: number;
    rounds: number;
}

const usersDataCorrection: UserData[] = [];
const usersDataUniform: UserData[] = [];

const wins = 100;
const rounds = 1000;

for (let i = 0; i < 5; i++) {
    usersDataCorrection.push({
        id: `#${i}`,
        wins: wins * i,
        rounds: rounds,
    })

    usersDataUniform.push({
        id: `#${i}`,
        wins: wins * i,
        rounds: rounds,
    })
}

export const Workplace = () => {
    for (let i = 0; i < 100000; i++) {
        const winnerWithCorrection = findWinnerCorrection(usersDataCorrection);
        ++winnerWithCorrection.wins;
        usersDataCorrection.forEach(userData => ++userData.rounds);

        const winnerWithUniform = findWinnerUniform(usersDataUniform);
        ++winnerWithUniform.wins;
        usersDataUniform.forEach(userData => ++userData.rounds);
    }


    console.log(usersDataCorrection, usersDataUniform)


    const labels = usersDataCorrection.map(userData => userData.id);
    const data = {
        labels,
        datasets: [
            {
                label: 'Uniform Distribution',
                data: usersDataUniform.map(userData => userData.wins),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Distribution with corrections',
                data: usersDataCorrection.map(userData => userData.wins),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };



    return <div className="workplace">
        <h1>Volunteling Distributions Chart</h1>
        <Chart data={data} />
    </div>
}