actions = require('actions')

module.exports.miner = {
	run(creep)
	{
		actions.harvest(creep)
	}
}

module.exports.cable = {
	run(creep)
	{
		if(creep.store.getFreeCapacity() == 0 || actions.grabEnergy(creep) == ERR_NOT_FOUND)
			actions.storeEnergy(creep)
	}
}

module.exports.builder = {
	run(creep)
	{
		if(creep.store.getUsedCapacity() == 0)
            creep.memory.building = false
        if(creep.store.getFreeCapacity() == 0)
            creep.memory.building = true
        
        if(!creep.memory.building)
            actions.grabEnergy(creep)
        else
            actions.build(creep)
	}
}

module.exports.upgrader = {
	run(creep)
	{
		if(creep.store.getUsedCapacity() == 0)
            creep.memory.upgrading = false
        if(creep.store.getFreeCapacity() == 0)
            creep.memory.upgrading = true
        
        if(!creep.memory.upgrading)
            actions.grabEnergy(creep)
        else
			actions.upgrade(creep)
	}
}