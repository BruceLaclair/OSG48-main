/* ------------  
   PCB.js

   Requires global.js.
   
 This is the process Control Block Prototype, with any luck this will manage base, limit and PID 
   ------------ */

   
function PCB(){
	this.PID = 0;
	this.PC    = 0;
    this.Acc   = 0;
    this.Xreg  = 0;
    this.Yreg  = 0;
    this.Zflag = 0;
	this.base = 0;
	this.limit = 0;
	
	this.init = function(ID){
		this.PID = ID;
		this.PC    = 0;
        this.Acc   = 0;
        this.Xreg  = 0;
        this.Yreg  = 0;
        this.Zflag = 0;
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
		else if (ID === 2)
		{
			this.base = _BlockThree;
			this.limit = _BlockThree+_BlockSize;
		}
	};
	
	this.checkLimit = function(locale)
	{
		if((locale + this.base) > this.limit)
		{
			_CPU.isExecuting = false;
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
	this.toString = function ()
	{
		var toBeReturned = "";
		toBeReturned = "PID: " + this.PID + " PC: " + this.PC + " X reg: " + this.Xreg + " Y reg: " + this.Yreg;
		return toBeReturned;
	}
}