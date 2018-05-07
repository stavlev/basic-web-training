const {names, roles, hp} = require('./ow.json');

const getHeroes = () => names.map((name, currIndex) => ({name, role: roles[currIndex], hp: hp[currIndex]}));

const getByRoles = (heroes, ...requestedRoles) => (
    heroes.filter(hero => requestedRoles.includes(hero.role))
);

const groupBy = (array, propToGroupBy = 'role') => {
    return array.reduce((groupedByArray, currElement) => {
        groupedByArray[currElement[propToGroupBy]] = groupedByArray[currElement[propToGroupBy]] || [];
        (groupedByArray[currElement[propToGroupBy]]).push(currElement); // Push the hero object to the cell in the result array which has the selected key

        return groupedByArray;
    }, []);
};

const makeHeroesNice = (heroes) => {
    return heroes.map((currHero, currIndex) => ({
            ...currHero,
            sayHello: () => {
                console.log(`Hi! My name is ${currHero.name}, nice to meet you!`)
            }
        })
    );
};

const heroes = getHeroes();

console.log(groupBy(heroes));
console.log(groupBy(heroes, 'name'));

console.log(getByRoles(heroes, 'Offense'));
console.log(getByRoles(heroes, 'Support', 'Offense'));

const niceHeroes = makeHeroesNice(heroes);
niceHeroes[0].sayHello();