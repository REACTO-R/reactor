[![Waffle.io - Issues in progress](https://badge.waffle.io/REACTO-R/reactor.png?label=in%20progress&title=In%20Progress)](http://waffle.io/REACTO-R/reactor)

# REACTO-R -- Technical Interviews, Online!

There are many services online that allow users to practice coding from the comfort of their own home, as well as tackle techincal interview questions that they could be asked. What tends to be neglected, however, is the ability to practice the actual *interview* itself. **REACTO-R** hopes to bridge the gap between working out the coding questions on technical interviews, and the actual interview itself.

---
## What is REACTO?

REACTO, taught prominently by Fullstack Academy, is a step-by-step process in order to help an interviewee ace technical interviews from employers, showcasing understanding of the coding problem and the problem solving process. REACTO is a six step process, with each letter representing its own step:

1. **R - Repeat:** In order to ensure that both the interviewer and interviewee are on the same page with the problem, the *Repeat* step of the REACTO process asks the interviewee to repeat, in their own words, the problem being assigned. This is a simple, but crucial step in the process, as otherwise one could be trying to solve a problem that is entirely different from the one being asked!
2. **E - Examples:** To further ensure that the interviewee understands the problem, they continue onto the *Examples* step of the REACTO process. Here, they list out various inputs that could be placed into the input function, as well as the output of the inputs. This not only reinforces the concept of the problem, but also allows for one to catch edge cases in the problem.
3. **A - Approach:** With a solid understanding of the problem being asked, the interviewee can move onto figuring out the *Approach* to the question. This tends to involve pseudo-code and talking through the broad concept of the problem with the interviewer, and figuring out which method would work best: an iterative approach? Recursive? Utilizing a data structure? Voicing out these approaches can also help the interviewer out by allowing them insight into the interviewee's logic.
4. **C - Code:** Finally, the interviewee reaches the actual *Coding* section of the REACTO process! While the normal REACTO process makes use of a whiteboard, the logic still plays out similarly with an in-browser IDE: write out basic, broad properties of the function first before diving into the details and minutiae of the code, as well as tackling the main problem first, before figuring out edge cases.
5. **T - Test:** Once the code is fully written, it needs to be run through *Tests*, with each test being processed step-by-step. During technical whiteboard interviews, generally this would involve taking an input and literally going step-by-step through the function, but providing test cases and proper error messages within the browser IDE saves on time and mistakes from the user.
6. **O - Optimization:** While the code may run, it may not always be the most optimal solution. WIth small sample sizes, this wouldn't matter much, but with larger datasets reaching into the hundreds and thousands, it can quickly become an issue! The *Optimization* step of the REACTO process prompts the interviewee to look through their code, and attempt to calculate the big O complexity of the code, and if there's still time, to perhaps go back to the Approach step and find a more optimal solution.

## How does REACTO-R implement REACTO?

Due to technical interviews generally requiring two people, in person, with a whiteboard, it is difficult to fully translate the interview process into a website. However, **REACTO-R** provides plenty of resources for the user to improve their interview skills, so that once the proper interview rolls around, they'll be able to successfully navigate the it without a sweat!

Features include: 
+ Guided and unguided approaches to various technical interview questions. The user can either receive help and guidance through the process, or attempt a mock-interview by themself with little guidance to properly simulate an interview.
+ Progress is saved to the user profile, allowing them to keep track of their progress, and where in the REACTO process they were for certain problems.
+ An in-browser IDE and compiler, with tests that automatically run for the user to practice the Coding and Testing sections of the REACTO process.
+ Solution code, and optimization information for the user to peruse and bolster their own understanding of the more technical side of code, as well as graphcial representation of the big O of various approaches.
+ Live video chatting, implemented with Twilio, to allow an interviewee to set up mock interviews or tutoring with others!

If you're confident in your code, but unsure in your interviewing skills, **REACTO-R** is the perfect website for you!

[Get started now!](https://reacto-r.herokuapp.com/home)
