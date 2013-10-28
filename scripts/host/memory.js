/* ------------  
   memory.js

   Requires global.js.
   
   Creates, initializes, manages and updates the main memory of the OS.
   ------------ */
   
function memory(){
	this.memory = new Array();
	this.baseOne = 0;
	this.baseTwo = 0;
	this.baseThree = 0;
	this.limitOne = 0;
	this.limitTwo = 0;
	this.limitThree = 0;
	
	
	this.init = function() {
		for(i = 0; i < _MaxMemory; i++)
		{
			this.memory[i] = "00";
			document.getElementById(i).innerHTML=this.memory[i];
		}
		this.baseOne = _BlockOne;
		this.limitOne = _BlockOne + _BlockSize;
		this.baseTwo = _BlockTwo;
		this.limitTwo = _BlockTwo + _BlockSize;
		this.baseThree = _BlockThree;
		this.limitThree = _BlockThree + _BlockSize;
	};
	
	this.convert = function(locale, block) 
	{
			var locale = parseInt(locale,16);
			if(block === "1")
			{
				if(locale > this.baseOne && locale < this.limitOne)
					return locale;
				else
				{
					//stop executing and send an interrupt
				}
			}
			else if(block === "2")
			{
				if(locale > this.baseTwo && locale < this.limitTwo)
					return locale;
				else
				{
					//stop executing and send an interrupt
				}
			}
			else
			{
				if(locale > this.baseThree && locale < this.limitThree)
					return locale;
				else
				{
					//stop executing and send an interrupt
				}
			}
	};
}