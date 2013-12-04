/* ------------  
   memory.js

   Requires global.js.
   
   Creates, initializes, manages and updates the main memory of the OS.
   ------------ */
   
function memory(){
	this.memory = new Array();
	
	
	this.init = function() {
		for(i = 0; i < _MaxMemory; i++)
		{
			this.memory[i] = "00";
			document.getElementById(i).innerHTML=this.memory[i];
			_NumPrograms = 0;
		}
	};
	
	this.convert = function(locale) 
	{
			var locale = parseInt(locale,16);
			return locale;
		
	}
}