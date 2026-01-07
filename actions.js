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

            return ERR_NOT_FOUND
        }
        else
        {
            creep.say("⛏️!")
            if(creep.harvest(Game.getObjectById(creep.memory.target)) == ERR_NOT_IN_RANGE)
                return creep.moveTo(Game.getObjectById(creep.memory.target), {visualizePathStyle: {}, maxRooms: 1})
            else
                return OK
        }
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
        var site = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
        if(site == null)
            return ERR_NOT_FOUND

        creep.say("🛠️!")
        if(creep.build(site) == ERR_NOT_IN_RANGE)
            creep.moveTo(site, {visualizePathStyle: {}})

        return OK
    },

    repair(creep)
    {
        var site = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
                return(structure.hits < structure.hitsMax/2)
            }
        })
        if(site == '')
            return ERR_NOT_FOUND

        creep.say("🔧!")
        if(creep.repair(site[0]) == ERR_NOT_IN_RANGE)
            return creep.moveTo(site[0], {visualizePathStyle: {}})

        return OK
    },

    upgrade(creep)
    {
        creep.say("🆙!")
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            creep.moveTo(creep.room.controller, {visualizePathStyle: {}})
    },

    goHome(creep)
    {
        creep.say("🏠")
        creep.moveTo(Game.spawns['spCentral'])
    },

    manifestDestiny(creep)
    {
        var destiny = Game.getObjectById(Memory.goals.destiny)

        if(creep.claimController(destiny) == ERR_GCL_NOT_ENOUGH)
            if(creep.reserveController(destiny) == ERR_NOT_IN_RANGE)
                creep.moveTo(destiny)
        else if (creep.claimController(destiny) == ERR_NOT_IN_RANGE)
            creep.moveTo(destiny)
    }
};