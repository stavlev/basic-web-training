const heroesJson = loadJson();

console.log(heroesJson);

const heroes = getHeroes();

console.log(groupBy(heroes));
console.log(groupBy(heroes, 'name'));

console.log(getByRoles(heroes, ['Offense']));
console.log(getByRoles(heroes, ['Support', 'Offense']));

const niceHeroes = makeHeroesNice(heroes);
niceHeroes[0].sayHello();

function loadJson() {
    const jsonFile = require('./ow.json');
    return jsonFile;
};

function getHeroes() {
    const names = heroesJson.names;
    const roles = heroesJson.roles;

    const heroes = names.map((currName, currIndex) => {
        return {
            name: currName,
            role: roles[currIndex]
        };
    });

    return heroes;
};

function groupBy(array, propToGroupBy) {
    const resultArray = array.reduce((groupedByArray, currElement) => {
        propToGroupBy = propToGroupBy || 'role';

        const currValOfPropToGroupBy = currElement[propToGroupBy]; // Equivalent to 'currElement.role' (or 'currElement.name' etc.)
        const currValOfKeyToGroupBy = groupedByArray[currValOfPropToGroupBy];

        if (!currValOfKeyToGroupBy) {
            groupedByArray[currValOfPropToGroupBy] = [];
        }

        (groupedByArray[currValOfPropToGroupBy]).push(currElement); // Push the hero object to the cell in the result array which has the selected key

        return groupedByArray;
    }, []);

    return resultArray;
};

function getByRoles(array, requestedRoles) {
    return array.filter(element => {
        const doesElementHaveAnyOfTheRequestedRoles = requestedRoles.some(requestedRole => {
            return requestedRole === element.role;
        });

        if (doesElementHaveAnyOfTheRequestedRoles) {
            return element;
        }
    });
};

function makeHeroesNice(heroes) {
    heroes.forEach(hero =>
       hero.sayHello = () => {
           console.log("Hi! My name is " + hero.name + ", nice to meet you!");
       }
    );

    return heroes;
};

