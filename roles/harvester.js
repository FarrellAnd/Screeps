var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(!creep.memory.collecting && creep.carry.energy == 0) {
            creep.memory.collecting = true;
	    }
	    if(creep.memory.collecting && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.collecting = false;
	    }
		
	    if(creep.memory.collecting) {
			var sources = creep.room.find(FIND_SOURCES);
            //var sources = creep.room.Memory.sources;
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return((structure.structureType == STRUCTURE_EXTENSION || 
							structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity) || 
							(structure.structureType == STRUCTURE_CONTAINER &&
							structure.store < structure.storeCapacity);
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }else{
				if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
					creep.moveTo(creep.room.controller);
				}
			}
        }
	}
};

module.exports = roleHarvester;