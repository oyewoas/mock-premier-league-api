const AdminsModel = require('../models/adminModel');
const FixtureModel = require('../models/fixtureModel');
const TeamsModel = require('../models/teamModel');
const UsersModel = require('../models/userModel');



const seedUsers = (req, res) => {
    // create some events
    const users = [
        { first_name: 'Samuel',  last_name: 'Victory', email: 'samvictory@gmail.com', password: 'sammyvic'  },
        { first_name: 'Temitope',  last_name: 'King', email: 'temiking@gmail.com', password: 'temitope'  },
        { first_name: 'Excellent',  last_name: 'Patrick', email: 'excellent@gmail.com', password: 'excellent'  },
        { first_name: 'Praise',  last_name: 'Freeman', email: 'praisefreeman@gmail.com', password: 'freeman'  },
        { first_name: 'Ayo',  last_name: 'Olabode', email: 'olabode@gmail.com', password: 'olabode'  },
        { first_name: 'Samuel',  last_name: 'Stephen', email: 'stephen@gmail.com', password: 'stephen'  },

    ];

    // use the User model to insert/save
    UsersModel.remove({}, () => {
        for (user of users) {
            const newUser = new UsersModel(user);
            newUser.save();
        }
    });

    // seeded!
    res.send('Users Database seeded!');
}

const seedAdmins = (req, res) => {
    // create some events
    const admins = [
        { first_name: 'Samuel',  last_name: 'Victory', email: 'samvictory@gmail.com', password: 'sammyvic', is_admin: true  },
        { first_name: 'Temitope',  last_name: 'King', email: 'temiking@gmail.com', password: 'temitope', is_admin: true  },
        { first_name: 'Excellent',  last_name: 'Patrick', email: 'excellent@gmail.com', password: 'excellent', is_admin: true  },
        { first_name: 'Praise',  last_name: 'Freeman', email: 'praisefreeman@gmail.com', password: 'freeman', is_admin: true  },
        { first_name: 'Ayo',  last_name: 'Olabode', email: 'olabode@gmail.com', password: 'olabode', is_admin: true  },
        { first_name: 'Samuel',  last_name: 'Stephen', email: 'stephen@gmail.com', password: 'stephen', is_admin: true },

    ];

    // use the Admin model to insert/save
    AdminsModel.remove({}, () => {
        for (admin of admins) {
            const newAdmin = new AdminsModel(admin);
            newAdmin.save();
        }
    });

    // seeded!
    res.send('Admin Database seeded!');
}

const seedTeams = (req, res) => {
    // create some events
    const teams = [
        { team_name: 'Chelsea',  manager: 'Chelsea Manager', website: 'https://www.chelsea.com', stadium: 'Chelsea Stadium'},
        { team_name: 'Arsenal',  manager: 'Arsenal Manager', website: 'https://www.arsenal.com', stadium: 'Arsenal Stadium'},
        { team_name: 'Liverpool',  manager: 'Liverpool Manager', website: 'https://www.liverpool.com', stadium: 'Liverpool Stadium'},
        { team_name: 'New Castle',  manager: 'New Castle Manager', website: 'https://www.newcastle.com', stadium: 'New Castle Stadium'},
        { team_name: 'Everton',  manager: 'Everton Manager', website: 'https://www.everton.com', stadium: 'Everton Stadium'},

    ];

    // use the Team model to insert/save
    TeamsModel.remove({}, () => {
        for (team of teams) {
            const newTeam = new TeamsModel(team);
            newTeam.save();
        }
    });

    // seeded!
    res.send('Team Database seeded!');
}


const seedFixtures = (req, res) => {
    // create some events
    const fixtures = [
        { home_team: 'Chelsea',  away_team: 'Arsenal', match_date: '12-06-2019', match_week: 1, match_time: '13:00', match_stadium: 'Wembley'},
        { home_team: 'Arsenal',  away_team: 'Chelsea', match_date: '13-06-2019', match_week: 2, match_time: '14:00', match_stadium: 'Stadium'},
        { home_team: 'Liverpool',  away_team: 'Arsenal', match_date: '19-06-2019', match_week: 20, match_time: '13:00', match_stadium: 'Old Trafford'},
        { home_team: 'New Castle',  away_team: 'Arsenal', match_date: '17-06-2019', match_week: 4, match_time: '13:00', match_stadium: 'Wembley'},
        { home_team: 'Everton',  away_team: 'Chelsea', match_date: '14-06-2019', match_week: 3, match_time: '15:00', match_stadium: 'Old Trafford'},


    ];

    // use the Fixture model to insert/save
    FixtureModel.remove({}, () => {
        for (fixture of fixtures) {
            const newFixture = new TeamsModel(fixture);
            newFixture.save();
        }
    });

    // seeded!
    res.send('Fixture Database seeded!');
}


module.exports = {
    seedAdmins,
    seedFixtures,
    seedTeams,
    seedUsers
}

