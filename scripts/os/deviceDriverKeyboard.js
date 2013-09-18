/* ----------------------------------
   DeviceDriverKeyboard.js
   
   Requires deviceDriver.js
   
   The Kernel Keyboard Device Driver.
   ---------------------------------- */

DeviceDriverKeyboard.prototype = new DeviceDriver;  // "Inherit" from prototype DeviceDriver in deviceDriver.js.

function DeviceDriverKeyboard()                     // Add or override specific attributes and method pointers.
{
    // "subclass"-specific attributes.
    // this.buffer = "";    // TODO: Do we need this?
    // Override the base method pointers.
    this.driverEntry = krnKbdDriverEntry;
    this.isr = krnKbdDispatchKeyPress;
    // "Constructor" code.
}

function krnKbdDriverEntry()
{
    // Initialization routine for this, the kernel-mode Keyboard Device Driver.
    this.status = "loaded";
    // More?
}

function krnKbdDispatchKeyPress(params)
{
    // Parse the params.    TODO: Check that they are valid and osTrapError if not.
    var keyCode = params[0];
    var isShifted = params[1];
    krnTrace("Key code:" + keyCode + " shifted:" + isShifted);
    var chr = "";
    // Check to see if we even want to deal with the key that was pressed.
	if ( ((keyCode >= 65) && (keyCode <= 90)) ||   // A..Z
         ((keyCode >= 97) && (keyCode <= 123)) )   // a..z
    {
        // Determine the character we want to display.  
        // Assume it's lowercase...
        chr = String.fromCharCode(keyCode + 32);
        // ... then check the shift key and re-adjust if necessary.
        if (isShifted)
        {
            chr = String.fromCharCode(keyCode);
        }
        // TODO: Check for caps-lock and handle as shifted if so.
        _KernelInputQueue.enqueue(chr);        
    }    
    else if (  (keyCode == 32)                     ||   // space
               (keyCode == 13) 					   ||	// enter
			   (keyCode == 8))					   		// delete
    {
        chr = String.fromCharCode(keyCode);
        _KernelInputQueue.enqueue(chr); 
    }
	
	else if(keyCode == 38 && !isShifted)				// up which shares a key code with & so we have to create a different key for it.
	{
		chr = "up";
		_KernelInputQueue.enqueue(chr);
	}
	
	else if(keyCode == 40 && !isShifted)				// down which also shares a key code.
	{
		chr = "down";
		_KernelInputQueue.enqueue(chr);
	}
	
	else
	{
		switch(keyCode)
		{
			case 48:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(41);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			case 49:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(33);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			case 50:
			{
			if(isShifted)
				{
					chr = String.fromCharCode(64);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			case 51:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(35);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			case 52:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(36);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			case 53:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(37);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			case 54:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(94);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			case 55:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(38);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			case 56:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(42);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			case 57:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(40);
				}
				else
				{
					chr = String.fromCharCode(keyCode);
				}
				break;
			}
			
			case 59:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(58);
				}
				else
				{
					chr = String.fromCharCode(59);
				}
				break;
			}
			
			case 173:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(95);
				}
				else
				{
					chr = String.fromCharCode(45);
				}
				break;
			}
			
			
			case 188:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(60);
				}
				else
				{
					chr = String.fromCharCode(44);
				}
				break;
			}
			case 190:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(62);
				}
				else
				{
					chr = String.fromCharCode(46);
				}
				break;
			}
			case 191:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(63);
				}
				else
				{
					chr = String.fromCharCode(0);
				}
				break;
			}
			
			case 192:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(126);
				}
				else
				{
					chr = String.fromCharCode(0);
				}
				break;
			}
			case 222:
			{
				if(isShifted)
				{
					chr = String.fromCharCode(34);
				}
				else
				{
					chr = String.fromCharCode(39);
				}
				break;
			}
			default:
			{
				if(!isShifted)
				{
					krnTrapError("you typed something wrong");
					break;
				}
			}
		}
		_KernelInputQueue.enqueue(chr); 
	}
}
