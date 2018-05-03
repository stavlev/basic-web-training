const heroesJson = loadJson();

/*console.log(heroesJson);*/

const heroes = getHeroes();

/*console.log(groupBy(heroes));*/
/*console.log(groupBy(heroes, 'name'));*/

/*console.log(getByRoles(heroes, ['Offense']));
console.log(getByRoles(heroes, ['Support', 'Offense']));*/

var niceHeroes = makeHeroesNice(heroes);
niceHeroes[0].sayHello();

function loadJson() {
    var jsonFile = require('./ow.json');
    return jsonFile;
};

function getHeroes() {
    const names = heroesJson.names;
    const roles = heroesJson.roles;

    const heroes = names.map(function (currName, currIndex) {
        return {
            name: currName,
            role: roles[currIndex]
        };
    });

    return heroes;
};

function groupBy(array, propToGroupBy) {
    const resultArray = array.reduce(function (groupedByArray, currElement) {
        propToGroupBy = propToGroupBy || 'role';

        var currValOfPropToGroupBy = currElement[propToGroupBy]; // Equivalent to 'currElement.role' (or 'currElement.name' etc.)
        var currValOfKeyToGroupBy = groupedByArray[currValOfPropToGroupBy];

        if (!currValOfKeyToGroupBy) {
            groupedByArray[currValOfPropToGroupBy] = [];
        }
        /* else {
                    groupedByArray[currValOfPropToGroupBy] = currValOfKeyToGroupBy;
                }*/

        (groupedByArray[currValOfPropToGroupBy]).push(currElement); // Push the hero object to the cell in the result array which has the selected key

        return groupedByArray;
    }, []);

    return resultArray;
};

function getByRoles(array, requestedRoles) {
    return array.filter(function (element) {
        var doesElementHaveAnyOfTheRequestedRoles = requestedRoles.some(function (requestedRole) {
            return requestedRole === element.role;
        });

        if (doesElementHaveAnyOfTheRequestedRoles) {
            return element;
        }
    });
};

function makeHeroesNice(heroes) {
    heroes.forEach(function(hero) {
       hero.sayHello = function() {
           console.log("Hi! My name is " + hero.name + ", nice to meet you!");
       };
    });

    return heroes;
};

