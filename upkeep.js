role = require('role')

module.exports = {
	spawn(roleName)
	{
		if(Memory.creepsCreated[roleName] == null)
			Memory.creepsCreated[roleName] = 0

		var spawner = Game.spawns['spCentral']
        var name = roleName + (Memory.creepsCreated[roleName] + 1)
        
        if(spawner.spawnCreep(role.roleParts[roleName], name, {memory: {role: roleName, inactivityTimer: 0}}) == 0)
            Memory.creepsCreated[roleName]++;
	}
}