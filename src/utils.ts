import random from "random";

import { UserData } from "./components/Workplace";

// absolutely equal
const calculateUsersEqualsProbabilities = (usersData: UserData[]): number[] => {
    const userProbability = 1 / usersData.length;
    return usersData.map((userData) => {
        const userProbabilityCorrection = userData.wins / userData.rounds || 0;
        return userProbability - userProbabilityCorrection >= 0
            ? userProbability - userProbabilityCorrection
            : 0;
    });
};

// equal with random factor
const calculateUsersProbabilities = (usersData: UserData[]): number[] => {
    const userProbability = 1 / usersData.length;
    return usersData.map((userData) => {
        let userProbabilityCorrection = userData.wins / userData.rounds || 0;

        if (userProbabilityCorrection > userProbability)
            return (
                userProbability - userProbabilityCorrection * userProbability
            );
        if (userProbabilityCorrection < userProbability) {
            return (
                userProbability +
                (1 - userProbabilityCorrection) * userProbability
            );
        }
        return userProbability;
    });
};

export const findWinnerCorrection = (
    usersData: UserData[],
    randomValue: number
): UserData => {
    const usersProbability = calculateUsersEqualsProbabilities(usersData);
    // const usersProbability = calculateUsersProbabilities(usersData);

    const sumOfUsersProbailities: number = usersProbability.reduce(
        (acc: number, curr: number) => acc + curr,
        0
    );

    const usersProbabilityBorders: number[] = usersProbability.reduce(
        (acc: number[], curr: number) => {
            const topBorder = curr + (acc[acc.length - 1] ?? 0);
            acc.push(Number(topBorder));
            return acc;
        },
        [] as number[]
    );

    const borderedRandomValue = sumOfUsersProbailities * randomValue;
    const winnerIndex: number = usersProbabilityBorders.findIndex(
        (probability) => borderedRandomValue <= probability
    );

    return usersData[winnerIndex];
};

export const findWinnerUniform = (
    usersData: UserData[],
    randomValue: number
): UserData => {
    const userProbability: number = 1 / usersData.length;
    const winnerIndex: number = usersData.findIndex((userData, index) => {
        return randomValue <= Number(userProbability) * (index + 1);
    });

    return usersData[winnerIndex];
};

const getUniformRandom = random.uniform(0, 1);

const getRandomArbitrary = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

export const findWinners = (
    usersDataCorrection: UserData[],
    usersDataUniform: UserData[]
) => {
    const borderedRandomValue = getRandomArbitrary(0, 1);

    return [
        findWinnerCorrection(usersDataCorrection, borderedRandomValue),
        findWinnerUniform(usersDataUniform, borderedRandomValue),
    ];
};
