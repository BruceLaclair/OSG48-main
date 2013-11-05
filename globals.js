/* ------------  
   Globals.js

   Global CONSTANTS and _Variables.
   (Global over both the OS and Hardware Simulation / Host.)
   
   This code references page numbers in the text book: 
   Operating System Concepts 8th edition by Silberschatz, Galvin, and Gagne.  ISBN 978-0-470-12872-5
   ------------ */

//
// Global CONSTANTS
//
var APP_NAME = "OSG48";     // The 48th generation of Internet Operating Systems
var APP_VERSION = "48.0048";   // What did you expect?

var CPU_CLOCK_INTERVAL = 100;   // This is in ms, or milliseconds, so 1000 = 1 second.

var TIMER_IRQ = 0;  // Pages 23 (timer), 9 (interrupts), and 561 (interrupt priority).
                    // NOTE: The timer is different from hardware/host clock pulses. Don't confuse these.
var KEYBOARD_IRQ = 1; 

var CONTEXTSWITCH_IRQ = 2;

var INVALID_OPCODE_IRQ = 3;


//
// Global Variables
//
var _CPU = null;
var _Memory = null;
var _NumPrograms = 0; //Number of inputed programs so far

//Setting up all of the possible control blocks
var _PCB = null;
var _PCB1 = null;
var _PCB2 = null;
var _PCB3 = null;
/*
*	To be used later
*	var _PCB3 = null;
*/

//Silly things to make things work and stuff...

var _NumTimesRan = 0;


//GLOBAL LIMITZ
var _MaxMemory = 768;
var _BlockSize = 255;
var _BlockOne = 0;
var _BlockTwo = 256;
var _BlockThree = 512;
var _Quantum = 6;

var _OSclock = 0;       // Page 23.

var _Mode = 0;   // 0 = Kernel Mode, 1 = User Mode.  See page 21.

var _Canvas = null;               // Initialized in hostInit().
var _DrawingContext = null;       // Initialized in hostInit().
var _DefaultFontFamily = "sans";  // Ignored, I think. The was just a place-holder in 2008, but the HTML canvas may have use for it.
var _DefaultFontSize = 13;
var _FontHeightMargin = 4;        // Additional space added to font size when advancing a line.

// Default the OS trace to be on.
var _Trace = true;

// OS queues
var _KernelInterruptQueue = null;
var _KernelBuffers = null;
var _KernelInputQueue = null;
var _ReadyQueue = null;

// OS List

var _ResidentList = new Array();

// Standard input and output
var _StdIn  = null;
var _StdOut = null;

// UI
var _Console = null;
var _OsShell = null;

// At least this OS is not trying to kill you. (Yet.)
var _TsundereMode = false;

// Global Device Driver Objects - page 12
var krnKeyboardDriver = null;

// For testing...
var _GLaDOS = null;
