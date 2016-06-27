var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
	
	/*
	for(var room_name in Game.rooms) {
		var room = Game.rooms[room_name];
		vai i = 0;
		for(var source in  room.find(FIND_SOURCES)){
			room.memory.sources[i] = source.id;
			i ++;
		}
	}
	*/

    var harvesters = 0;
    var upgraders = 0;
    var builders = 0;

	// Memory rather than Game to remove a loop on creeps
    for(var name in Memory.creeps) {
        var creep = Game.creeps[name];
		
		if(!creep) {
			// Dead Creep
            delete Memory.creeps[name];
		}else {
			if(creep.memory.role == 'harvester') {
				roleHarvester.run(creep);
				harvesters ++;
			} else if(creep.memory.role == 'upgrader') {
				roleUpgrader.run(creep);
				upgraders ++;
			} else if(creep.memory.role == 'builder') {
				roleBuilder.run(creep);
				builders ++;
			}
		}
    }

    if(builders < 2) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
    }

    if(upgraders < 2) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
    }

    if(harvesters < 4) {
        var newName = Game.spawns.Spawn1.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'harvester'});
    }
}