"use strict"; 

var WebIDLParser = require("./webidlparser.js").Parser; 
var fs = require("fs"); 

var idl, out, module, webGlContext, constants, finalObject, i, json, m, args, obj, isSequence;

idl = fs.readFileSync("webgl.idl").toString();
module = WebIDLParser.parse(idl)[0]; 

webGlContext = module.definitions.filter(function(d) {
	return d.name === "WebGLRenderingContext"; 
})[0]; 

constants = webGlContext.members.filter(function(m) { 
	return m.type === "const"; 
}); 

console.log("var"); 

var c; 
for(var i = 0; i != constants.length - 1; i++) {
	c = constants[i]; 
	console.log("  GL_" + c.name + " = " + c.value + ","); 
}

c = constants[i]; 
console.log("  GL_" + c.name + " = " + c.value + ";"); 


