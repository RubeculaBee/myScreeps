actions = require('actions')

module.exports.miner = {
	maxUnits: 8,
	run(creep)
	{
		const CHANGE_TARGET_AFTER = 5
		creep.memory.inactivityTimer++
		if(actions.harvest(creep) == OK)
			creep.memory.inactivityTimer = 0

		if(creep.memory.inactivityTimer == CHANGE_TARGET_AFTER|| Game.getObjectById(creep.memory.target).energy == 0)
            creep.memory.target = null
	}
}

module.exports.cable = {
	maxUnits: 3,
	run(creep)
	{
		if(creep.store.getFreeCapacity() == 0 || actions.grabEnergy(creep) == ERR_NOT_FOUND)
			actions.storeEnergy(creep)
	}
}

module.exports.builder = {
	maxUnits: 5,
	run(creep)
	{
		if(creep.store.getUsedCapacity() == 0)
            creep.memory.building = false
        if(creep.store.getFreeCapacity() == 0)
            creep.memory.building = true
        
        if(!creep.memory.building)
            actions.grabEnergy(creep)
        else if (actions.build(creep) == ERR_NOT_FOUND)
			actions.repair(creep)
	}
}

module.exports.upgrader = {
	maxUnits: 5,
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

module.exports.repairman = {
	maxUnits: 3,
	run(creep)
	{
		if(creep.store.getUsedCapacity() == 0)
            creep.memory.repairing = false
        if(creep.store.getFreeCapacity() == 0)
            creep.memory.repairing = true
        
        if(!creep.memory.repairing)
            actions.grabEnergy(creep)
        else if(actions.repair(creep) != OK)
			actions.goHome(creep)
	}
}