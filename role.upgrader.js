var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //toggle state
	    if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say("harvesting")
        }
        
        if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            creep.say("upgrading")
        }
        //commands
        if (creep.memory.full) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var trash = creep.room.find(FIND_DROPPED_ENERGY)
            if (trash.length > 0) {
                if (creep.pickup(trash[0]) == -9) {
                    creep.moveTo(trash[0]);
                }
            } else {
                var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store.energy > 0);
                    }
                });
                if (sources.length > 0) {
                    if (creep.withdraw(sources[0],RESOURCE_ENERGY) == -9) {
                        creep.moveTo(sources[0]);
                    }
                }
                else {
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[0]);
                    }
                }
            }
        }
	},
	
	spawn: function (id,creepScale) {
	    var creepModel = [MOVE,WORK,CARRY];
	    for (var i = 0; i < creepScale; i++) {
	        creepModel.push(WORK);
	        creepModel.push(CARRY);
	    }
	    
        if (Game.spawns.Spawn1.canCreateCreep(creepModel,"Upgrader"+id,{role: "upgrader"}) === 0) {
            Game.spawns.Spawn1.createCreep(creepModel,"Upgrader"+id,{role: "upgrader"});
        }  else if (Game.spawns.Spawn1.canCreateCreep(creepModel,"Upgrader"+id,{role: "upgrader"}) === -3) {
            roleUpgrader.spawn(id+1,creepScale);
        }
    }
};

module.exports = roleUpgrader;