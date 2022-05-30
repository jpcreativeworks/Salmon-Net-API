const connection = require('../config/connection');
const { Thoughts, Users } = require('../models');
const { getUser, getEmail, getRandomThought } = require('./data');

connection.on ('error', (err) => err);

connection.once('open', async () => {
    console.log('connected!');

    await Thoughts.deleteMany({});

    await Users.deleteMany({});

    const user = [];

    for ( let i = 0; i < 5; i++) {      
        const userName = getUser(i);
        const email = getEmail(i); 
        user.push({
            userName: userName,
            email: email,
            // friends: friends,
        })
        const thoughts = [];
        for (let j = 0; j < 2; j++) {
            
            thoughts.push({
                thoughtText: getRandomThought(),
                userName: userName,
            // reactions: reactions,          
            })
        }
        await Thoughts.collection.insertMany(thoughts);

    }

    await Users.collection.insertMany(user);
    console.log(Thoughts.find({}));
    console.table(user);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
