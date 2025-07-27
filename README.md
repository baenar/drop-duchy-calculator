# Drop Duchy Calculator 🏰

![Sample Calculation Screenshot](/drop-duchy-calculator/public/sampleCalculation.png)

## 1. Overview

Drop Duchy Calculator is a simple Angular web application designed to help players of the game *Drop Duchy* with optimizing their battle strategies by calculating the best unit order to maximize their score. The app allows you to input the units you have available before a battle and then suggests the optimal selection sequence. This assists in getting the highest possible score by leveraging the strengths and weaknesses of different unit types.

Currently, it's hosted with GitHub Pages, check it out at https://baenar.github.io/drop-duchy-calculator/

---

## 2. Combat Rules

Drop Duchy is a strategic rogue-like game inspired by Tetris, where during the _combat phase_, the player has to select a sequence of all units on the battlefield in order to determine the outcome of each battle. Understanding the combat mechanics allows players to gain an advantage and win more effectively.

### Unit Types and Their Interactions

There are four main unit types in the game, represented by these emojis:

| Unit Type | Emoji | Super effective againt |
|-----------|--------|------------------------|
| Sword     | 🗡️      | Arrows unit            |
| Arrows    | 🏹      | Axe unit               |
| Axe       | 🪓      | Sword unit             |
| Boss      | 💀      | -                      |

### Combining Groups

You can combine two groups of the same team to change their type.

The new group keeps the type of the biggest group (or the destination's type if the groups are equal in size).
### Attacking

When two opposite groups meet, they subtract their numbers.

Each type has the advantage against a certain other, giving them **+50% strength** (meaning that 2 soldiers with advantage can eliminate 3 opponents).

## 3. Battle example

Consider the following battlefield scenario:

- Enemy units: 15 Arrows (🏹)
- Player units: 6 Sword (🗡️) and 6 Axe (🪓)

---

### Worst Combination

**Deployment order:**  
`6 Sword (🗡️) → 6 Axe (🪓) → 15 Arrows (🏹)`

**Outcome:**
- Sword vs. Axe: Both units belong to the same side, so they get combined, leaving 12 Axe units.
- Axe vs. Arrows: Arrows have advantage over Axe, resulting in heavy losses for player units.
- After resolution, 7 Arrows remain.

**Score:** `-7` (negative, indicating player's loss)

---

### Best Combination

**Deployment order:**  
`6 Axe (🪓) → 6 Sword (🗡️) → 15 Arrows (🏹)`

**Outcome:**
- Axe vs. Sword: Like before, units get combined but this time they leave 12 Sword units.
- Sword vs. Arrows: Sword units have advantage, significantly diminishing Arrows units.
- After resolution, 2 Sword units remain, even though player has in the start less units overall!

**Score:** `2` (positive, player has won)

## 4. Using the Drop Duchy Calculator

- Enter the units you currently have available for battle.
- Click the **Calculate** button.
- The app will compute and display the best possible selection sequence based on the unit strengths and weaknesses.
- Use the suggested order to maximize your score in battles.

---

## 5. Technologies Used

- **Angular 18**
- **Angular Material**

--- 

