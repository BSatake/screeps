var roleSalvager = {
    run: function(creep) {
        var scraps = creep.room.findClosestByPath(FIND_DROPPED_RESOURCES);
        if(creep.moveTo(scraps[0]) == -3) {
            
        }
    },
    spawn: function(id) {
        if (Game.spawns["Spawn1"].canCreateCreep([MOVE,CARRY,CARRY,CARRY,CARRY],"Scavenger"+id) == -3) {
            roleScavenger.spawn(id+1);
        }  else {
            Game.spawns["Spawn1"].createCreep([MOVE,CARRY,CARRY,CARRY,CARRY],"Scavenger"+id,{role:"scavenger"});
        }
    }
}