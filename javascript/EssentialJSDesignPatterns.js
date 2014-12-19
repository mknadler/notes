
/* 
---

Essential JS Design Patterns by Addy Osmani
http://addyosmani.com/resources/essentialjsdesignpatterns/book/

code comments from the original will be prefaced with the usual //
some of my own comments or extrapolations will be prefaced with ///, both in code and elsewhere

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



*/