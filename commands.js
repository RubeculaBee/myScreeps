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

	identify()
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
	}
}