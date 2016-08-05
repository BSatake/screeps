var roleRanger = {
    run: function(creep,target) {
        if (target == undefined) {
            roleRanger.defend(creep);
        }
        
        else {
            if (creep.room.name != target.pos.roomName) {
                roleRanger.rally(creep,target);
            }  else {
                // var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var target = creep.pos.findClosestByRange(FIND_STRUCTURES);
                creep.say("Engaging",true);
                if(target) {
                    roleRanger.engage(creep,target);
                }  else {
                    creep.say("EXTERMINATE",true)
                    target = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
                    if (target) {
                        roleRanger.engage(creep,target);
                    }  else {
                        roleRanger.defend(creep);
                    }
                }
            }
        }
    },
    
    engage:function(creep,target) {
        if (creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    },
    
    defend: function(creep) {
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) {
            if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                creep.say("Engaging",true);
                creep.moveTo(target);
            }
        }  else {
            creep.moveTo(Game.flags["Assault_Idle"]);
        }
    },
    
    rally: function(creep,target) {
        creep.say("moving in")
        creep.moveTo(target);
    },
    
    spawn: function(id) {
        if (Game.spawns["Spawn1"].canCreateCreep([MOVE,RANGED_ATTACK,RANGED_ATTACK],"Ranger"+id,{role:""}) == -3) {
            roleRanger.spawn(id+1);
        }  else {
            Game.spawns["Spawn1"].createCreep([MOVE,RANGED_ATTACK,RANGED_ATTACK],"Ranger"+id,{role:"ranger"});
        }
    }
};

module.exports = roleRanger;