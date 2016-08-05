var roleCapturer = {
    run: function(creep,target) {
        if (target == undefined) {
            creep.moveTo(Game.flags["Assault_Idle"]);
        }
        else {
            if (creep.room.name != target.pos.roomName) {
                roleCapturer.rally(creep,target);
            }  else {
                var target = creep.room.controller;
                if (creep.reserveController(target) == -9) {
                    creep.moveTo(target);
                }
            }
        }
    },
    rally: function(creep,target) {
        creep.say("moving in")
        creep.moveTo(target);
    },
    spawn: function(id) {
        if (Game.spawns["Spawn1"].canCreateCreep([MOVE,CLAIM,CLAIM],"Capturer"+id,{role:"capturer"}) == -3) {
            roleCapturer.spawn(id+1);
        }  else {
            Game.spawns["Spawn1"].createCreep([MOVE,CLAIM,CLAIM],"Capturer"+id,{role:"capturer"});
        }
    }
}
module.exports = roleCapturer