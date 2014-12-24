
/* 
---

Essential JS Design Patterns by Addy Osmani
http://addyosmani.com/resources/essentialjsdesignpatterns/book/

code comments from the original will be prefaced with the usual //
some of my own comments or extrapolations will be prefaced with ///, both in code and elsewhere
or it will be obvious because, unlike me, Addy Osmani didn't pepper his text with foul language

-> denotes what is logged from a console.log();, e.g.: 

/// var newObject = new Object();
/// console.log(newObject);
///-> Object {}


----

We already use patterns, even if we don't think we do.

For example:

Situation: for each DOM element on a page with class '.foo' you need to increment a counter.
Question: What is the most efficient way to query for this collection of elements?
Possible solutions:
	1. Select all elements on page; store references to them; filter this collection; use RegEx to store those w/ class '.foo'
	2. Use modern native browser feature, e.g. querySelectorAll(), to select all of the elements w/ class '.foo'
	3. Use a native feature, e.g. getElementsByClassName(), to get the desired collection.
  
	#3 is 8-10x faster, but not supported below IE9. 
	If you use jQuery, you don't need to worry about this question; it's abstracted in the Facade pattern.
	The library opts for the most optimal approach to selecting elements depending on current browser support.

What even IS a pattern?
	1. Patterns are proven solutions
	2. that can be easily reused
	3. and are expressive (there's a set structure and vocabulary to the solution; it's not an obfuscated or uglified function)

What is a GOOD pattern?
	1. Solves a particular problem; it does not simply capture principles or strategies, it captures solutions.
	2. The solution cannot be obvious. A pattern that solves the problem of "add two numbers" isn't a good pattern.
	3. The concept described must have been proven; design patterns need to be solid, not speculative.
	4. It must describe a relationship -- deeper system structures and mechanisms that explain a relationship to code.

What is the structure of a design pattern?
It is presented in the form of a 'rule' that establishes a relationship between:
	1. A context;
	2. A system of forces that arises in that context;
	3. A configuration that allows these forces to resolve themselves in context;
  
What is an anti-pattern?
	One of these two things:
		1. A description of a bad solution to a particular problem which resulted in a bad situation occuring
		2. A description of how to get out of that bad situation via a good solution
		/// i like how these are both definitions for the same word but are so different conceptually
	An anti-pattern is a bad design that is worthy of documenting.
  
Examples of anti-patterns:
	1. Polluting global namespace w/ vars defined in global context
	2. Passing strings, rather than functions, to setTimeout or setInterval (triggers use of eval() internally)
	3. Modifying Object class prototype
		/// I'm guessing this is at least partially because EVERYTHING is an object and you're simply just gonna fuck shit up
		/// & won't play nice with others' scripts/plugins/etc
	4. Using JS inline
		/// ew
	5. Using document.write where native DOM alternatives such as document.createElement exist/work. 
	document.write has been misused & has issues: 
		- if it is executed after page is loaded, it can overwrite page.
		- doesn't work with XHTML
		- just use document.createElement instead jfc

Categories of Design Pattern
	
	Creational Design Patterns
		The basic / traditional / simple /obvious approaches to object *creation* might accidentally increase complexity.
		These patterns focus on handling object creation to reduce complexity & smooth everything out.

		Examples: Constructor, Factory, Abstract, Prototype, Singleton, Builder

	Structural Design Patterns
		These patterns identify simple ways to form *relationships* between objects.
		When used well, they help ensure that when one part of a system changes,
		the entire structure of the entire system doesn't also need to change.

		Examples: Decorator, Facade, Flyweight, Adapter, Proxy

	Behavioral Design Patterns
		These focus on improving or streamlining the *communication* between objects.

		Examples: Iterator, Mediator, Observer, Visitor

Gang of Four Design Pattern Categorizations
	note: these are based on explicitly classed languages. 

	Creational -- Based on the concept of creating an object
		Class
			Factory Method
				This makes an instance of several derived classes based on interfaced data or events
		Object
			Abstract Factory
				Creates an instance of several families of classes without detailing concrete classes
			Builder
				Separates object construction form its representation, always creates the same type of object.
			Prototype
				A fully initialized instance used for copying or cloning
			Singleton
				A class with only a single instance with global access points
	Structural -- Based on the idea of building blocks of objects
		Class
			Adapter
				Match interfaces of different classes w/ incompatible interfaces
		Object
			Adapter
				ibid
			Bridge
				Separates an object's interface from its implementation so that each can vary
			Composite
				A structure of simple + composite objects which makes a gestalt object
			Decorator
				Dynamically add alternate processing to objects
			Facade
				A single class which hides a complex subsystem
			Flyweight
				A fine-grained instance used for efficient sharing of information that is contained elsewhere
			Proxy
				A placeholder object representing the true object
	Behavioral -- Based on the way objects work together
		Class
			Interpreter
				A way to include language elements in an application to match the grammar of the intended language
			Template Method
				Creates the shell of an algorithm in a method, then defer the actual exact steps to a subclass
		Object
			Chain of Responsibility
				A way of passing a request between a chain of objects to find the object that can handle said request
			Command
				Encapsulate a command request as an object to enable logging and/or queuing of requests; provides error-handling for unhandled requests
			Iterator
				Sequentially access the elements of a collaection w/o knowing the inner workings of said collection
			Mediator
				Defines simplified communication between classes to prevent a group of classes from explicitly referring to each other
			Memento
				Capture an object's internal state so that it can be restored later
			Observer
				Notify change to a number of classes to ensure consistency
			State
				Alter an object's behavior when its state changes
			Strategy
				Encapsulates an algorithm inside a class, separating the selection from the implementation
			Visitor
				Adds a new operation to a class without changing the class

---

JS design patterns covered will be both classic and modern.
Some devs wonder: "is there an IDEAL pattern (or set of patterns) to implement?
There isn't a true single answer; it's context / app / script specific

The patterns that will be explored in this section:
	Constructor
	Module
	Revealing Module
	Singleton
	Observer
	Mediator
	Prototype
	Command
	Facade
	Factory
	Mixin
	Decorator
	Flyweight

---

CONSTRUCTOR PATTERN

In OOP languages, a constructor is a method that initializes a newly created object once memory has been allocated for it.
In JavaScript, everything is an object; we're talking here about *object* constructors.
Object constructors create specific types of object -- they both prepare the object and accept parameters for when that object is created.

Object Creation

	There are three common ways to create new objects in JS: */

	// A.
	var newObject = {};

	// B.
	var newObject = Object.create(Object.prototype);

	// C.
	var newObject = new Object();

// When 'C' object creates an object wrapper for a specific value, or when no value is passed, it creates & returns an empty object. 

	var newObject = new Object();
	/// console.log(newObject)
	///-> Object {}

// Keys and values can be assigned to an object in four ways:

	// A. Dot syntax
		// set
			newObject.someKey = "Hello World";
		// get
			var value = newObject.someKey;

	// B. Square bracket syntax
		// set
			newObject["someKey"] = "Hello World";
		// get
			var value = newObject["someKey"];
		/// this method is useful when you need to assign dynamically-named keys

	// ECMA5-only (see http://kangax.github.com/es5-compat-table/):

	// C. Object.defineProperty

		// set
			Object.defineProperty( newObject, "someKey", {
				value: "for more control of the property's behavior",
				writable: true,
				enumerable: true,
				configurable: true
			});

		// shorthand of above
			// set
			var defineProp = function ( obj, key, value ) {
				var config = {
					value: value,
					writable: true,
					enumerable: true,
					configurable: true
				};
				Object.defineProperty( obj, key, config );
			}

			var person = Object.create( Object.prototype );
			defineProp ( person, "car", "Delorean" );
			defineProp ( person, "dateOfBirth", "1981");
			defineProp ( person, "hasBeard", false );

			console.log(person);
			///-> Object {car: "Delorean", dateOfBirth: "1981", hasBeard: false}

	// D. 
		Object.defineProperties( newObject, {
			"someKey": {
				value: "Hello World",
				writable: true
			},
			"anotherKey": {
				value: "bar",
				writable: false
			}
		});

	// All of these methods can also be used for inheritance

		var driver = Object.create( person );
		defineProp(driver, "topSpeed", "100mph");
		console.log(driver.dateOfBirth);
		///-> 1981

/* Basic constructors
	JS doesn't have classes, but does have constructor funcitons. 
	Prefixing a call to a constructor w/ 'new' tells JS to treat function like constructor 
	*/

	function Car( model, year, miles ) {
		this.model = model;
		this.year = year;
		this.miles = miles;

		this.toString = function() {
			return this.model + "has done " + this.miles + "miles";
		};
	}

	var civic = new Car( "Honda Civic", 2009, 20000 );
	console.log(civic.toString());
	///-> Honda Civic as done 20000 miles

	/*
	Problems with this approach: it makes inheritance difficult; 
	functions such as toString() are redefined for each new object created w/ constructor

	instead, both ES3 and ES5 compatible:

	Constructor w/ Prototype */

	function Car ( model, year, miles ){
		this.model = model;
		this.year = year;
		this.miles = miles;
	}
	Car.prototype.toString= function(){
		return this.model + " has done " + this.miles + " miles";
	}
	
// MODULE PATTERN

// Modules help keep units of code both separated and organized
// JS has several options for implementing these, including:
// Module pattern, Object literal notation, AMD modules, CommonJS modules, ECMAScript Harmony modules
// The last three will be discussed later

// Module pattern is based on object literals, so a quick review:
// In object literal notation, an object is described as a set of comma-separated name / value pairs enclosed in {}
// Names inside of object may be strings or identifiers followed by a colon

	var myObjectLiteral = {
		variableKey: variableValue,
		functionKey: function(){
			// ...
		}
	};

// Object literals don't require instantiation w/ new, 
// but shouldn't be used at the start of a statement:
// the opening { may be interpreted as the beginning of a block.

// Outside of an object, new members added as follows:
	myModule.property = "someValue";

// the Module pattern provides both private and public encapsulation
// in JS it emulates the concept of classes.
// Similar to IIFE, except that an object is returned instead of a function.
// There's no real 'privacy' in JS -- no access modifiers. Function scope simulates this concept.

// Self-contained Module example:

var testModule = (function() {
	var counter = 0;

	return {
		incrementCounter: function () {
			return counter++;
		},
		resetCounter: function() {
			console.log( "counter value prior to reset: " + counter );
			counter = 0;
		}
	}
}) ();

// Module template that covers namespacing, public and private vars

var myNamespace = (function () {
	var myPrivateVar, myPrivateMethod;

	myPrivateVar = 0;

	myPrivateMethod = function( foo ) {
		console.log( foo );
	};

	return {
		myPublicVar: 'foo',
		
		myPublicFunction: function( bar ) {
			myPrivateVar++;
			myPrivateMethod( bar );
		}
	};
}) ();

// Modules return an object that is used to interact with the Module
// The scoping function is wrapped around all of the functions,
// which are then called, and their return value is immediately stored

// Advantages to this: private functions can be expressed that are only consumable by the module
// As functions are declared normally and named, it's easier to show call stacks
// It also enables us to return different functions depending on environment

// Module pattern variations

	// Import mixins
	// Globals can be passed in as arguments & locally aliased

		// Global module
		var myModule = (funciton ( jQ, _ ){

			function privateMethod1(){
				jQ(".container").html("test");
			}

			function privateMethod2(){
				console.log(_.min([10, 5, 100, 2, 1000]) ); 
			}

			return {
				publicMethod: function(){
					privateMethod1();
				}
			};

		})(jQuery, _ );

	// Exports
	// This variation allows globals to be declared w/o consuming them

		//Global module
		var myModule = (function () {

			var module = {},
				privateVariable = "Hello World";

			function privateMethod() {
				// ...
			}

			module.publicProperty = "Foobar";
			module.publicMethod = function () {
				console.log( privateVariable );
			};

			return module;

		}) ();

	// jQuery 
	// define a library function which declares a new library 
	// & binds init to document.ready when new libraries (i.e. modules) are created

		function library( module ) {
			$( function() {
				if ( module.init )	{
					module.init();
				}
			});

			return module;
		}

		var myLibrary = library(function () {
			return{
				init: function () {
					// module implementation
				}
			}
		}());

	// Module pattern disadvantages: as public / private members are accessed differently, visibility changes must be made every place the member was called
	// Also, private members can't be called in methods added to the object later on
	// this includes unit tests

// Revealing Module pattern
// Essentially the same as Module, except public pointers are revealed to private functions
// e.g.

	var myRevealingModule = (function () {

		var privateCounter = 0;

		function privateFunction () {
			privateCounter++;
		}
		function publicFunction() {
			publicIncrement();
		}
		function publicIncrement() {
			privateFunction();
		}
		function publicGetCount(){
			return: privateCounter;
		}

		return {
			start: publicFunction,
			increment: publicIncrement,
			count: publicGetCount
		}
	}) ();
	myRevealingModule.start();

	// advantages: more consistent syntax, more clear what is publicly accessible
	// disadvantages: if a priv function refers to a pub function, pub function can't be patched;
	// priv function will continue to refer to priv implementation, & pattern doesn't apply to public members, only to functions
	// ditto for public object members which refer to private variables

// Singleton 

