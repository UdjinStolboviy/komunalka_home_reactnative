export const Dada = {
    home: {
        id: 'home1',
        title: 'ДІМ 1',
        flats: [
            {
                address: 'address',
                area: 100,
                calculatorFlat: [],
                dateEviction: 'Заповніть данні',
                dateSettlement: 'Заповніть данні',
                description: 'Заповніть данні',
                emailOccupant: 'Заповніть данні',
                floor: 1,
                id: 'flat1',
                images: [{ url: 'https://picsum.photos/200' }],
                occupant: 'Заповніть данні',
                owner: 'Заповніть данні',
                ownerEmail: 'Заповніть данні',
                ownerPhone: 'Заповніть данні',
                phoneOccupant: 'Заповніть данні',
                price: 100,
                rooms: 1,
                title: 'КВАРТИРА 1',
                wifiName: 'Заповніть данні',
                wifiPassword: 'Заповніть данні',
            },
        ],
    }
} as const;

export const homeNew = (id: number) => {
    return {
        id: `home${id}`,
        title: `ДІМ ${id}`,
        flats: [
            {
                address: 'Заповніть данні',
                area: 100,
                calculatorFlat: [],
                dateEviction: 'Заповніть данні',
                dateSettlement: 'Заповніть данні',
                description: 'Заповніть данні',
                emailOccupant: 'Заповніть данні',
                floor: 1,
                id: 'flat1',
                images: [{ url: 'https://picsum.photos/200' }],
                occupant: 'Заповніть данні',
                owner: 'Заповніть данні',
                ownerEmail: 'Заповніть данні',
                ownerPhone: 'Заповніть данні',
                phoneOccupant: 'Заповніть данні',
                price: 100,
                rooms: 1,
                title: 'КВАРТИРА 1',
                wifiName: 'Заповніть данні',
                wifiPassword: 'Заповніть данні',
            },
        ],
    }
}

export const flatNew = (id: number) => {
    return {
        address: 'Заповніть данні',
        area: 100,
        calculatorFlat: [],
        dateEviction: 'Заповніть данні',
        dateSettlement: 'Заповніть данні',
        description: 'Заповніть данні',
        emailOccupant: 'Заповніть данні',
        floor: 1,
        id: `flat${id}`,
        images: [{ url: 'https://picsum.photos/200' }],
        occupant: 'Заповніть данні',
        owner: 'Заповніть данні',
        ownerEmail: 'Заповніть данні',
        ownerPhone: 'Заповніть данні',
        phoneOccupant: 'Заповніть данні',
        price: 100,
        rooms: 1,
        title: `КВАРТИРА ${id}`,
        wifiName: 'Заповніть данні',
        wifiPassword: 'Заповніть данні',
    }

}