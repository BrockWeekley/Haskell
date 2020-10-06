-- FUNCTIONS

--Basic Function
myFirstFunc :: Int
myFirstFunc = 1

--Specifying Type
practFunc :: Int -> Int -> Int
practFunc a b = a + b
practFunc0 :: (Num a) => a -> a
practFunc0 x = x
-- Lists
practFunc1 :: (Num a) => a -> [a]
practFunc1 x = [x,x,x]
-- Two Inputs
-- You can use ' to denote minor change
practFunc1' :: (Num a) => a -> a -> a
practFunc1' x y = x+y
-- Nested Lists
practFunc2 :: (Num a) => a -> a -> [[a]]
practFunc2 x y = [[x,x,x],[y,y,y]]

-- Addition
--CHALLENGE: What does the declaration look like?
addTwoNumbers :: (Num a) => a -> a -> a
addTwoNumbers x y = x + y

-- Multiplication
multiplyTwoNumbers :: (Num a) => a -> a -> a
multiplyTwoNumbers x y = x * y

-- Division
divideTwoNumbers :: (Fractional a) => a -> a -> a
divideTwoNumbers x y = x / y

-- Subtraction
subtractTwoNumbers :: (Num a) => a -> a -> a
subtractTwoNumbers x y = x - y

-- Squareroot
findSquareroot :: (Floating a) => a -> a
findSquareroot x = sqrt(x)

-- CHALLENGE: See if you can write a function calculate "Hypotenuse of a traingle given a and b"
calculateHypotenuse :: (Floating a) => a -> a -> a
calculateHypotenuse x y = sqrt(x^2 + y^2)

-- IF/Then Statements
-- Must have else
doubleSmallNumber :: (Ord a, Num a) => a -> a
doubleSmallNumber x = if x > 100
                        then x
                        else x*2






------ LISTSSSSS

-- let myFirstList = [1,2,3,4,5]

---- Strings are also lists
-- let myFirstString = "ello"

----Inserting to List
-- 0 : myFirstList
-- 'H': myFirstString

---- Get an Element
-- myFirstList !! 3
-- myFirstString !! 3

----List of Lists
--let b = [[1,2,3,4],[5,3,3,3],[1,2,2,3,4],[1,2,3]]

----List Comparisons
-- Starts by comparing the first string, then second...
-- [3,2,1] > [2,1,0]
-- [3,2,1] > [2,10,100]
-- [3,4,2] > [3,4] 
-- [3,4,2] > [2,4] 
-- [3,4,2] == [3,4,2]  









---- Head returns first item in list
-- head [5,4,3,2,1]  

---- Tail the rest of the list (besides head)
--tail [5,4,3,2,1]  

---- Last returns last item in list
-- last [5,4,3,2,1]  

---- Init Returns the first part of the list (besides last)
-- init [5,4,3,2,1]








---- Length Returns the length...
-- length [5,4,3,2,1]

----Null checks if the list is empty
-- null [1,2,3]
-- null []

---- Reverse reverses a list
-- reverse [5,4,3,2,1]

---- Take extracts n elements from beginning of list
-- take 3 [5,4,3,2,1]

---- Drop removes n elements from beginning of list
-- drop 3 [8,4,2,1,5,6] 

---- Maximum returns the largest element
-- maximum [1,9,2,3,4]  

---- Minimum returns the smallest element
-- minimum [8,4,2,1,5,6]

---- Sum adds up all elements in a list
-- sum [1,2,3,4]

----Product multiplies all elements in a list
-- product [1,2,3,4]

---- Elem tells you if element is in a list
-- 4 `elem` [3,4,5,6]

---- Cycle infinitely repeats a list
-- cycle [1,2,3]
-- take 10 (cycle [1,2,3])  

---- Repeat infinitely repeats and element
-- repeat 5
-- take 10 (repeat 5) 







---- Texas Ranges
-- let anotherList = [5..10]
-- [2,4..20]
-- [0.1, 0.3 .. 1] --Floats might be weird








------ LIST COMPREHENSION

---- Similar to Comprehension in Math
---- For every element x in the list [1..10], multiply by 2.
-- [x*2 | x <- [1..10]]  

---- Values only greater than 12
-- [x*2 | x <- [1..10], x*2 >= 12] 

---- Values when divided by 7 have a remainder of 3
--[ x | x <- [50..100], x `mod` 7 == 3] 

----Even Incorporate If/Then Statements
boomBangs xs = [ if x < 10 then "BOOM!" else "BANG!" | x <- xs, odd x]

---- Multiple Predicates
--[ x | x <- [10..20], x /= 13, x /= 15, x /= 19]  

----- Multiple Variables
--[ x*y | x <- [2,5,10], y <- [8,10,11]]

----CHALLENGE: Use list comprehension to write your own version of the "length" function.
---- Used length'
---- Hint: You might need sum
length' xs = sum [1 | _ <- xs]

----CHALLENGE: Use list Comprehension to write a function to remove all nonuppercase letters in a string.
---- Hint: You will need to use the range ['A..Z']
---- Hint: You may need to use 'elem'
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']] 

---- Nested List Comprehension
-- let xxs = [[1,3,5,2,3,1,2,4,5],[1,2,3,4,5,6,7,8,9],[1,2,4,2,1,6,3,1,3,2,3,6]]  
-- ghci> [ [ x | x <- xs, even x ] | xs <- xxs]









------ TUPLES
-- (1,1)
-- (1,2,3)
-- [(1,2,3),(1,2,4)]








---- Friday we'll get more into types and functions.