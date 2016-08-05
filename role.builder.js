var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        //toggle state
        if (creep.memory.full && creep.carry.energy == 0) {
            creep.memory.full = false;
            creep.say('harvesting');
        }
        
        if (!creep.memory.full && creep.carry.energy == creep.carryCapacity) {
            creep.memory.full = true;
            creep.say('building');
        }
        //commands
        if (creep.memory.full) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }  else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });
                
                targets.sort((a,b) => a.hits - b.hits);
                
                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);    
                    }
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
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER));
                    }
                })
                
                targets.sort((a,b) => a.store.energy - b.store.energy);
                if (targets.length > 0) {
                    if (creep.withdraw(targets[0],RESOURCE_ENERGY) == -9) {
                        creep.moveTo(targets[0]);
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
        if (Game.spawns.Spawn1.canCreateCreep(creepModel,"Builder"+id,{role: "builder"}) === 0) {
            console.log("Constructing Builder")
            Game.spawns.Spawn1.createCreep(creepModel,"Builder"+id,{role: "builder"});
        }  else if (Game.spawns.Spawn1.canCreateCreep(creepModel,"Builder"+id,{role: "builder"}) === -3) {
            roleBuilder.spawn(id+1,creepScale);
        }
    }
};

module.exports = roleBuilder;