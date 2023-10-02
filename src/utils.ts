import random from "random";

import { UserData } from "./components/Workplace";

interface UserDataProbability extends UserData {
    probability: number;
}

const FIXED = 2;

const getRandomArbitrary = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

export const getUniformRandom = random.uniform(0, 1);

const calculateUserProbabilityCorrection = (userData: UserData): number => {
    const userWinsToRounds: number = userData.wins / userData.rounds || 0;
    return (1 - (userWinsToRounds !== 1 ? userWinsToRounds : 0.99)) ^ 2;
};

const sortUserProbabilities = (
    usersDataProbability: UserDataProbability[]
): UserDataProbability[] => {
    return usersDataProbability.sort(
        (a: UserDataProbability, b: UserDataProbability) =>
            a.probability - b.probability
    );
};

export const findWinnerCorrection = (usersData: UserData[]): UserData => {
    let usersDataProbability: UserDataProbability[] = usersData.map(
        (userData) => {
            const probability =
                calculateUserProbabilityCorrection(userData) / usersData.length;
            return {
                ...userData,
                probability: Number(probability.toFixed(FIXED)),
            };
        }
    );

    usersDataProbability = sortUserProbabilities(usersDataProbability);

    const sumOfUsersProbbilities: number = usersDataProbability.reduce(
        (acc: number, curr: UserDataProbability) => acc + curr.probability,
        0
    );

    const borderedRandomValue = getRandomArbitrary(0, sumOfUsersProbbilities);

    const usersProbabilityBorders: number[] = usersDataProbability.reduce(
        (acc: number[], curr: UserDataProbability) => {
            const topBorder = curr.probability + (acc[acc.length - 1] ?? 0);
            acc.push(Number(topBorder.toFixed(FIXED)));
            return acc;
        },
        [] as number[]
    );

    // console.log(us ersProbabilityBorders);

    const winnerIndex: number = usersProbabilityBorders.findIndex(
        (probability) => probability >= borderedRandomValue
    );

    const winner: UserData | undefined = usersData.find(
        (userData) => userData.id === usersDataProbability[winnerIndex].id
    );

    if (winner) return winner;
    else return findWinnerCorrection(usersData);
};

export const findWinnerUniform = (usersData: UserData[]): UserData => {
    const userProbability: number = 1 / usersData.length;

    const borderedRandomValue = getUniformRandom();

    const winnerIndex: number = usersData.findIndex((userData, index) => {
        return (
            borderedRandomValue <=
            Number(userProbability.toFixed(FIXED)) * (index + 1)
        );
    });

    return usersData[winnerIndex];
};

export const findWinners = (
    usersDataCorrection: UserData[],
    usersDataUniform: UserData[]
) => {};
