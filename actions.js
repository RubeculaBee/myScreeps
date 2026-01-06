module.exports = {
    harvest(creep)
    {
        var sources = creep.room.find(FIND_SOURCES)

        if(!creep.memory.target)
        {
            creep.say("🚫🎯!")
            var mostSource = sources[0]
            for(let i = 0; i < sources.length; i++)
                if (sources[i].energy > mostSource.energy)
                    mostSource = sources[i]
            creep.memory.target = mostSource.id
        }
        else
        {
            creep.say("⛏️!")
            if(creep.harvest(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE)
                creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {}, maxRooms: 1})
        }

        if(Game.getObjectById(creep.memory.target).energy == 0)
            creep.memory.target = null
    },

    grabEnergy(creep)
    {
        var droppedEnergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)

        if(droppedEnergy == null)
            return ERR_NOT_FOUND

        creep.say("🤲!")
        if(creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE)
            creep.moveTo(droppedEnergy, {visualizePathStyle: {}})

        return OK
    },

    storeEnergy(creep)
    {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
                return (
                    (structure.structureType == STRUCTURE_EXTENSION || 
                    structure.structureType == STRUCTURE_SPAWN) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                )
            }
        })

        if(targets.length > 0)
        {
            creep.say("📥!")
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(targets[0], {visualizePathStyle: {}})
        }
    },

    build(creep)
    {
        creep.say("🛠️!")
        var site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)

        if(creep.build(site) == ERR_NOT_IN_RANGE)
            creep.moveTo(site, {visualizePathStyle: {}, maxRooms: 1})
    },

    upgrade(creep)
    {
        creep.say("🆙!")
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            creep.moveTo(creep.room.controller, {visualizePathStyle: {}, maxRooms: 1})
    }
};