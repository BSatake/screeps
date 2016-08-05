var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleAmbassador = require("role.ambassador");
var roleRanger = require("role.ranger");
var roleCapturer = require("role.capturer");
var logging = false;
var population = {
    harvester: 3,
    upgrader:  3,
    builder:   3,
    ranger:    2,
    capturer:  2,
    scavenger: 0
};
var creepScale = Math.round(Game.spawns["Spawn1"].room.find(FIND_STRUCTURES, {
    filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION)
    }
}).length/5);
  
module.exports.loop = function () {
    var stats = {
        harvesterCount: 0,
        upgraderCount: 0,
        builderCount: 0,
        rangerCount: 0,
        capturerCount: 0,
        salvagerCount: 0
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            stats.harvesterCount++;
            roleHarvester.run(creep);
        }  else if (creep.memory.role == "upgrader") {
            stats.upgraderCount++;
            roleUpgrader.run(creep);
        }  else if (creep.memory.role == "ambassador") {
            stats.ambassadorCount++;
            roleAmbassador.run(creep);
        }  else if (creep.memory.role == "builder") {
            stats.builderCount++;
            roleBuilder.run(creep);
        }  else if (creep.memory.role == "ranger") {
            stats.rangerCount++;
            roleRanger.run(creep);
        }  else if (creep.memory.role == "capturer") {
            stats.capturerCount++;
            roleCapturer.run(creep, Game.flags["Init1"]);
        }
    }
    
    if (logging) {
        var populationList = ""
        var roleList = Object.keys(stats);
        for (role in roleList) {
            populationList += (roleList[role] + ": " + stats[roleList[role]] + "\n");
        }
        console.log(populationList);
    }
    if (Game.spawns["Spawn1"].spawning == null) {
        if (stats.harvesterCount < population.harvester) {
            roleHarvester.spawn(0,creepScale);
        }  else if (stats.upgraderCount < population.upgrader) {
            roleUpgrader.spawn(0,creepScale);
        }  else if (stats.builderCount < population.builder) {
            roleBuilder.spawn(0,creepScale);
        }  else if (stats.rangerCount < population.ranger) {
            roleRanger.spawn(0,creepScale);
        }  else if (stats.capturerCount < population.capturer) {
            roleCapturer.spawn(0,creepScale);
        }
    }
}

