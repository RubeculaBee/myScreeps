upkeep = require('upkeep')
role = require('role')
command = require('commands')

module.exports.loop = function() {
    for(let name in Game.creeps)
    {
        var creep = Game.creeps[name]
        role[creep.memory.role].run(creep)
    }
    
    upkeepSpawn()
}

function upkeepSpawn()
{
    for(let roleName of role.inProduction)
    {
        var numActive = _.filter(Game.creeps, (creep) => creep.memory.role == roleName).length
        if(numActive < role[roleName].maxUnits)
            upkeep.spawn(roleName)
    }
}