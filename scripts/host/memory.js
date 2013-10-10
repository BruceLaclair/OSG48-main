/* ------------  
   memory.js

   Requires global.js.
   
   Creates, initializes, manages and updates the main memory of the OS.
   ------------ */
   
function memory(){
	this.memory = new Array();
	
	
	this.init = function() {
		for(i = 0; i < 768; i++)
		{
			this.memory[i] = "00";
			document.getElementById(i).innerHTML=this.memory[i];
		}
	};
	
	this.checkLimit = function(locale) 
	{
		if (_PID === 1)
		{
			var limit = parseInt(locale,16);
			if(limit >= 256)
			{
				krnTrapError("Hey! Don't touch me there");
			}
			else
			{
				return limit;
			}
		}
		else if (_PID === 2)
		{
			var limit = parseInt(locale,16);
			if(limit >= 512)
			{
				krnTrapError("Hey! Don't touch me there");
			}
			else
			{
				return limit;
			}
		}
		else
		{
			var limit = parseInt(locale,16);
			if(limit >= 768)
			{
				krnTrapError("Hey! Don't touch me there");
			}
			else
			{
				return limit;
			}
		}
	}
}