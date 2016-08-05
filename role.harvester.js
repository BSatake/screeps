var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        //toggle state
        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        
        if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('filling');
        }
        
        if (creep.memory.full) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                roleHarvester.fill(creep,targets);
            }  else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store.energy < structure.storeCapacity;
                    }
                });
                if(targets.length > 0) {
                    roleHarvester.fill(creep,targets);
                }  else {
                    //Have them fuck off away from the source
                    creep.moveTo(Game.flags["Harvester_Idle"])
                }
            }
        }
        
        else {
            var trash = creep.room.find(FIND_DROPPED_ENERGY)
            if (trash.length > 0) {
                if (creep.pickup(trash[0]) == -9) {
                    creep.moveTo(trash[0]);
                }
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
        }
	},
	
	fill: function(creep,targets) {
	    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
	},
	
	spawn: function (id, creepScale) {
	    var creepModel = (function() {
	        var arr = [MOVE,WORK,CARRY];
	        for (var i = 0; i < creepScale; i++) {
	            arr.push(WORK);
	            arr.push(CARRY);
	        }
	        return arr;
        });
        
        if (Game.spawns.Spawn1.canCreateCreep(creepModel(),"Harvester"+id,{role: "harvester"}) === 0) {
            Game.spawns.Spawn1.createCreep(creepModel(),"Harvester"+id,{role: "harvester"});
        }  else if (Game.spawns.Spawn1.canCreateCreep(creepModel(),"Harvester"+id,{role: "harvester"}) === -3) {
            roleHarvester.spawn(id+1,creepScale);
        }
    }
};

module.exports = roleHarvester;