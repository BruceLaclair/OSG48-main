/* ----------------------------------
	FileSystemDeviceDriver.js
   
	Requires deviceDriver.js
   
	The File System Device Driver.
   ---------------------------------- */
   
FileSystemDeviceDriver.prototype = new DeviceDriver;  // "Inherit" from prototype DeviceDriver in deviceDriver.js.
   
function FileSystemDeviceDriver()                     // Add or override specific attributes and method pointers.
{
    // "subclass"-specific attributes.
    // Override the base method pointers.
    this.driverEntry = krnFileDriverEntry;
    this.isr = krnFileOperations;
    // "Constructor" code.
}

function krnFileDriverEntry()
{
    // Initialization routine for this, the kernel-mode File System Device Driver.
	//Just to be safe making sure Local Storage is enabled.
	if(typeof(Storage)!=="undefined")
  {
	this.status = "loaded";
  }
	else
  {
	this.status = "Sorry could not Start Hard Drive, Storage not enabled.";
  }
	
}

function krnFileOperations(params)
{
	//Because it's all being held in the same driver I decided to use one IRQ,
	//and just pass in a parameter that included which operation it wanted on the disk.
	var operation = params;
	
	switch(operation)
	{
		case 0:
			format();
			break;
		case 1: 
			create(params);
			break
		case 2:
			write(params);
			break;
		case 3:
			read(params);
			break;
		case 4:
			deleteFile(params);
			break;
		default:
			krnTrapError("How did you manage that?");
			break;		
	}
}

function format()
{
	for(i = 0; i < 4; i++)
	{
		for(j = 0; j < 8; j++)
		{
			for(k = 0; k < 8; k++)
			{
				var TSP = i.toString() + j.toString() + k.toString();
				localStorage[TSP] = "0AKB-------------------------------------------------------------ね";
			}
		}
	}
	var TSB = "000";
	var TSP = "000";
	localStorage[TSB] = "I am the Master Bootね";
	_StdIn.putText("All done, but...d..don't get used to it...it's not like I did it because I wanted to...");
				
	 
}

function create(params)
{
	_StdIn.putText("It's create");
}

function write(params)
{
	_StdIn.putText("it's write");
}

function read(params)
{
	_StdIn.putText("it's read");
}

function deleteFile(params)
{
	_StdIn.putText("it's delete");
}