# Day 8

This one is a nightmare, so I'm taking some notes to help me out.

## Preface

In order to be more clear, refer to the following diagram naming each segment:

```
 aaaa
b    c
b    c
 dddd
e    f
e    f
 gggg
```

## Part 1

This one is actually pretty easy, considering it only wants me to count the occurances of 1, 4, 7, and 8. I just have to count the number of letter squences that are 2, 4, 3, or 7, inputs long respectively.

To solve part 1, I'm going to write a decoder that puts the input data in a more readable format. Then, I'll just find the number of times each sequence length occurs and put that as my answer.

## Part 2

This is where things get tricky. Now we actually have to deduce which segment is which based on the test values.
To do this, I'm going to write a function that maps each "obfuscated" segment, to the real segment name (see above).

Note: All displays and test values should be considered as **sets**. The order of segments does not matter.

## Finding The Numbers:

**1: 2 Segments.**

**4: 4 Segments.**

**7: 3 Segments.**

**8: 7 Segments.**

---

3: 5 Segments, Contains all segments from 1.

5: 5 Segments, Shares 3 segments from 4

2: 5 Segments. Shares 2 segments from 4

6: 6 Segments, Only missing segment is a segment in 1

0: 6 segments, Only missing segment is a segment from 4.

9: 6 Segments, Only missing segment is not a segment from 4

**Once we find the numbers, we can then just compare each displayed number to the segments in every determined number.**
