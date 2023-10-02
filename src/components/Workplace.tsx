import React from 'react';


import { Chart } from './Chart';
import { findWinnerCorrection, findWinnerNormal } from '../utils';

export interface UserData {
    id: string;
    wins: number;
    rounds: number;
}

const usersDataCorrection: UserData[] = [];
const usersDataNormal: UserData[] = [];

for (let i = 0; i < 20; ++i) {
    usersDataCorrection.push({
        id: `#${i}`,
        wins: 0,
        rounds: 0,
    })

    usersDataNormal.push({
        id: `#${i}`,
        wins: 0,
        rounds: 0,
    })
}

export const Workplace = () => {
    for (let i = 0; i < 10000; i++) {
        const winnerWithCorrection = findWinnerCorrection(usersDataCorrection);
        ++winnerWithCorrection.wins;
        usersDataCorrection.forEach(userData => ++userData.rounds);

        const winnerWithNormal = findWinnerNormal(usersDataNormal);
        ++winnerWithNormal.wins;
        usersDataNormal.forEach(userData => ++userData.rounds);
    }


    console.log(usersDataCorrection, usersDataNormal)


    const labels = usersDataCorrection.map(userData => userData.id);
    const data = {
        labels,
        datasets: [
            {
                label: 'Normal Distribution',
                data: usersDataNormal.map(userData => userData.wins),
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