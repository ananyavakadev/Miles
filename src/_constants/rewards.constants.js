export const ACTION_TYPE = {
    REWARDS_DATA: 'REWARDS_DATA',
    CATEGORIES_LIST: 'CATEGORIES_LIST'
};

export const REWARDS_DATA = [
    {
        name: 'R1',
        id: 'r1',
        categories: {
            c1: true,
            c2: false,
            c3: false,
            c4: false,
            c5: false
        }
    },
    {
        name: 'R2',
        id: 'r2',
        categories: {
            c1: false,
            c2: true,
            c3: true,
            c4: false,
            c5: false
        }
    },
    {
        name: 'R3',
        id: 'r3',
        categories: {
            c1: false,
            c2: false,
            c3: false,
            c4: true,
            c5: false
        }
    },
    {
        name: 'R4',
        id: 'r4',
        categories: {
            c1: false,
            c2: false,
            c3: true,
            c4: false,
            c5: false
        }
    },
    {
        name: 'R5',
        id: 'r5',
        categories: {
            c1: false,
            c2: false,
            c3: false,
            c4: false,
            c5: true
        }
    }
];

export const CATEGORIES_LIST = [
    {
        name: 'C1',
        id: 'c1'
    },
    {
        name: 'C2',
        id: 'c2'
    },
    {
        name: 'C3',
        id: 'c3'
    },
    {
        name: 'C4',
        id: 'c4'
    },
    {
        name: 'C5',
        id: 'c5'
    }
];
