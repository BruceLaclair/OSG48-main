/* ------------  
   PCB.js

   Requires global.js.
   
 This is the process Control Block Prototype, with any luck this will manage base, limit and PID 
   ------------ */

   
function PCB(){
	this.PID = 0;
	this.base = 0;
	this.limit = 0;
	this.PCLoc = 0;
	this.XRegVal = 0;
	this.YRegVal = 0;
	this.ZFlagVal = 0;
	this.ACCVal = 0;
	this.priority = 0;
	this.isDone = false;
	
	this.init = function(ID, p){
		this.PID = ID;
		this.PCLoc = 0;
		this.XRegVal = 0;
		this.YRegVal = 0;
		this.ZFlagVal = 0;
		this.ACCVal = 0;
		this.priority = p;
		this.isDone = false;
		if(ID === 0)
		{
			this.base = _BlockOne;
			this.limit = _BlockOne+_BlockSize;
		}
		else if(ID === 1)
		{
			this.base = _BlockTwo;
			this.limit = _BlockTwo+_BlockSize;
		}
		else
		{
			this.base = _BlockThree;
			this.limit = _BlockThree+_BlockSize;
		}
		
	};
	
	this.checkLimit = function(locale)
	{
		if((locale + this.base) > this.limit)
		{
			_OSShell.shellKill(this.PID);
			if(!_TsundereMode)
			{
				_StdIn.putText("You know you really shouldn't touch things that don't belong to you");
			}
			else
			{
				_StdIn.putText("Your lucky I am not revoking your access insolent fool");
			}
		}
		else
		{
			return (locale + this.base);
		}
	};
	
	this.toString = function()
	{
		var toBeReturned = "";
		toBeReturned = " PID: " + this.PID + " PC " + this.PCLoc + " ACC " + this.ACCVal + " Base: " + this.base + " Limit: " + this.limit + " X value: " + this.XRegVal + " Y value: " + this.YRegVal + " Zero: " + this.ZFlagVal;
		return toBeReturned;
	}
}