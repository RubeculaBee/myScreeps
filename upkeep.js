var roleParts = {
    'miner': [WORK, WORK, WORK, WORK, WORK, MOVE],
    'cable': [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
	'builder': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
	'upgrader': [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
	'repairman': [WORK, WORK, CARRY, CARRY, MOVE, MOVE]
}

module.exports = {
	spawn(role)
	{
		if(Memory.creepsCreated[role] == null)
			Memory.creepsCreated[role] = 0

		var spawner = Game.spawns['spCentral']
        var name = role + (Memory.creepsCreated[role] + 1)
        
        if(spawner.spawnCreep(roleParts[role], name, {memory: {role: role, inactivityTimer: 0}}) == 0)
            Memory.creepsCreated[role]++;
	}
}