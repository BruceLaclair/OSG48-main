/* ------------
   Console.js

   Requires globals.js

   The OS Console - stdIn and stdOut by default.
   Note: This is not the Shell.  The Shell is the "command line interface" (CLI) or interpreter for this console.
   ------------ */

function CLIconsole() {
    // Properties
    this.CurrentFont      = _DefaultFontFamily;
    this.CurrentFontSize  = _DefaultFontSize;
    this.CurrentXPosition = 0;
    this.CurrentYPosition = _DefaultFontSize;
    this.buffer = "";
	var textMem = new Array();
	var memory = new Array();
	this.index = 0;
    
    // Methods
    this.init = function() {
       this.clearScreen();
       this.resetXY();
    };

    this.clearScreen = function() {
       _DrawingContext.clearRect(0, 0, _Canvas.width, _Canvas.height);
    };

    this.resetXY = function() {
       this.CurrentXPosition = 0;
       this.CurrentYPosition = this.CurrentFontSize;
    };

    this.handleInput = function() {
       while (_KernelInputQueue.getSize() > 0)
       {
           // Get the next character from the kernel input queue.
           var chr = _KernelInputQueue.dequeue();
           // Check to see if it's "special" (enter or ctrl-c) or "normal" (anything else that the keyboard device driver gave us).
           if (chr == String.fromCharCode(13))  //     Enter key
           {
               // The enter key marks the end of a console command, so ...
               // ... tell the shell ...
			   memory[memory.length] = this.buffer;
			   this.index = (memory.length);
               _OsShell.handleInput(this.buffer);
               // ... and reset our buffer.
               this.buffer = "";
           }
		   
		   else if (chr == String.fromCharCode(8))
		   {
		   //this checks to make sure that there is something to delete in textMemory that isn't the prompt.
		   if(this.buffer != "")
			{
				//this calls the function that will handle redrawing text.
				this.removeText();
			}
		   }

			else if (chr == "up")
			{
			//delete what was currently written, clear the buffer, write what is stored in memory, and remember the index
			//so that we can move through the stored commands.
				if(this.index > 0)
				{
					var lastLine = memory[--this.index]
					while(this.buffer.length > 0)
						{
							this.removeText();
						}
						for(var i = 0; i < lastLine.length; i++)
						{
						//this loop makes sure that the only thing added to the buffer is characters so that they will delete right.
							this.putText(lastLine.charAt(i));
							this.buffer += lastLine.charAt(i);
						}
				}
			}
			
			else if (chr == "down")
			{
			//delete what was currently written, clear the buffer, write what is stored in memory, and remember the index
			//so that we can move through the stored commands.
				if(this.index < memory.length-1)
				{
					var nextLine = memory[++this.index]
					while(this.buffer.length > 0)
						{
							this.removeText();
						}
						for(var i = 0; i < nextLine.length; i++)
						{
						//this loop makes sure that the only thing added to the buffer is characters so that they will delete right.
							this.putText(nextLine.charAt(i));
							this.buffer += nextLine.charAt(i);
						}
				}
			}
		   
           // TODO: Write a case for Ctrl-C.
           else
           {
               // This is a "normal" character, so ...
               // ... draw it on the screen...
               this.putText(chr);
               // ... and add it to our buffer.
               this.buffer += chr;
           }
       }
    };

    this.putText = function(text) {
       // My first inclination here was to write two functions: putChar() and putString().
       // Then I remembered that JavaScript is (sadly) untyped and it won't differentiate
       // between the two.  So rather than be like PHP and write two (or more) functions that
       // do the same thing, thereby encouraging confusion and decreasing readability, I
       // decided to write one function and use the term "text" to connote string or char.
       if (text !== "")
       {
           // Draw the text at the current X and Y coordinates.
           _DrawingContext.drawText(this.CurrentFont, this.CurrentFontSize, this.CurrentXPosition, this.CurrentYPosition, text);
         // Move the current X position.
           var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, text);
           this.CurrentXPosition = this.CurrentXPosition + offset;
		   textMem.push(text);
       }
    };
	
	this.removeText = function() {
		// Since everything is drawn on to canvas we have to undraw it... but since we don't have(or need) a Time Machine (Time Machine Nante Iranai)
		// To undraw it, literally, we are going to redraw it in the same place that was just drawn, carefully and with some magical trickery.
		if(textMem.length > 1)
		{
			var delText = textMem.pop();
			var offset = _DrawingContext.measureText(this.CurrentFont, this.CurrentFontSize, delText);
			this.CurrentXPosition = this.CurrentXPosition - offset;
			_DrawingContext.deleteText(this.CurrentFont, this.CurrentFontSize, this.CurrentXPosition, this.CurrentYPosition, delText);
			this.buffer = this.buffer.slice(0, -1);
		}
	};

    this.advanceLine = function() {
       this.CurrentXPosition = 0;
       this.CurrentYPosition += _DefaultFontSize + _FontHeightMargin;
       // TODO: Handle scrolling.
	   
	   if(this.CurrentYPosition >= (_DefaultFontSize + _FontHeightMargin)*29)
	   {
			this.scroll();
	   }
    };
	
	this.scroll = function(){
	//Count the number of lines that we need to go down, and re-draw the canvas starting that many lines down.
		var numLines = 1;
		while(this.CurrentYPosition >= (_DefaultFontSize + _FontHeightMargin)*29)
		{
			numLines++;
			this.CurrentYPosition-= (_DefaultFontSize + _FontHeightMargin);
		}
		_DrawingContext.scrollImage(0, (_DefaultFontSize + _FontHeightMargin)*numLines/2);
	}
}