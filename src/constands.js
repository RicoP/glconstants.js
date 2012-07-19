"use strict"; 

var useDefine = false; 

var WebIDLParser = require("./webidlparser.js").Parser; 
var fs = require("fs"); 

var idl, out, module, webGlContext, constants, finalObject, i, json, m, args, obj, isSequence;

process.argv.forEach(function (val, index, array) {
	if(val === "-d") {
		useDefine = true; 
	}
}); 

idl = fs.readFileSync("webgl.idl").toString();
module = WebIDLParser.parse(idl)[0]; 

webGlContext = module.definitions.filter(function(d) {
	return d.name === "WebGLRenderingContext"; 
})[0]; 

constants = webGlContext.members.filter(function(m) { 
	return m.type === "const"; 
}); 

if(!useDefine) { 
	console.log("var"); 

	var c; 
	for(var i = 0; i != constants.length - 1; i++) {
		c = constants[i]; 
		console.log("  GL_" + c.name + " = " + c.value + ","); 
	}

	c = constants[i]; 
	console.log("  GL_" + c.name + " = " + c.value + ";"); 
}
else {	
	console.log("#ifndef GLCONSTANTS_H"); 
	console.log("#define GLCONSTANTS_H"); 
	console.log(""); 

	for(var i = 0; i != constants.length - 1; i++) {
		var c = constants[i]; 
		console.log("#define GL_" + c.name + " " + eval(c.value)); 
	}

	console.log(""); 
	console.log("#endif"); 
}

