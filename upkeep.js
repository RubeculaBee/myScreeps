var roleParts = {
    'miner': [WORK, WORK, WORK, MOVE],
    'cable': [CARRY, CARRY, MOVE, MOVE],
	'builder': [WORK, CARRY, MOVE, MOVE],
	'upgrader': [WORK, CARRY, MOVE, MOVE]
}

module.exports = {
	spawn(role)
	{
		if(Memory.creepsCreated[role] == null)
			Memory.creepsCreated[role] = 0

		var spawner = Game.spawns['spCentral']
        var name = role + (Memory.creepsCreated[role] + 1)
        
        if(spawner.spawnCreep(roleParts[role], name, {memory: {role: role}}) == 0)
            Memory.creepsCreated[role]++;
	}
}