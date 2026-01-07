role = require('role')

module.exports = {
	forgetDead()
	{
		for(var name in Memory.creeps) {
    		if(!Game.creeps[name]) {
        		delete Memory.creeps[name];
        		console.log(`Clearing non-existing creep memory: ${name}`);
    		}			
		}
	},

	resetUpgraders()
	{
		for(let name in Game.creeps)
		{
			var creep = Game.creeps[name]

			if(creep.memory.role == 'upgrader')
			{
				console.log(`Killing Creep: ${creep}`)
				creep.suicide()
			}
		}
	},

	identifyAll()
	{
		for(let name in Game.creeps)
		{
			var creep = Game.creeps[name]
			creep.say(creep.memory.role)
		}
	},

	identify(roleName)
	{
		for(let name in Game.creeps)
		{
			var creep = Game.creeps[name]
			if(creep.memory.role == roleName)
				creep.say(creep.memory.role)
		}
	},

	viewCosts()
	{
		console.log('----- Parts -----')
		for(let part in BODYPART_COST)
			console.log(`${part}: ${BODYPART_COST[part]}`)
		
		console.log('----- Roles -----')
		for(let roleName in role.roleParts)
		{
			let sum = 0
			for(let part of role.roleParts[roleName])
				sum += BODYPART_COST[part]

			console.log(`${roleName}: ${sum}`)
		}
	},

	viewCost(roleName)
	{
		console.log('----- Parts -----')
		for(let part in BODYPART_COST)
			console.log(`${part}: ${BODYPART_COST[part]}`)
		
		console.log('----- Roles -----')
		let sum = 0
		for(let part of role.roleParts[roleName])
			sum += BODYPART_COST[part]
		console.log(`${roleName}: ${sum}`)
	}
}