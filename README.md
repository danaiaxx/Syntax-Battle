# Syntax Battle: Tetris Edition 🕹️

Hey there! This is a web-based retro arcade game built out of whim. It combines classic split-screen Tetris with fast-paced JavaScript coding challenges. You play against a simulated computer bot in real time—answering questions launches attacks, clears your grid, and helps you survive the rising blocks.

The entire game runs directly in your browser. There is no backend server or database setup required!

---

## ✨ Features

* **Split-Screen Action:** Play side-by-side against a CPU bot that automatically drops blocks and answers questions.
* **30 JS Coding Challenges:** Practice core JavaScript skills like arrays, loops, variables, and destructuring while playing.
* **Attack & Defense:** Correct answers send garbage rows to the CPU *and* clear a garbage row from your own board.
* **Local Stats Saving:** Your high scores, wins, and losses are saved using your browser's `localStorage`, so they persist even if you refresh.
* **Retro Audio HUD:** Features a built-in synthwave background music player with working volume controls.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19
* **Build System:** Vite 8
* **Styling:** Tailwind CSS 4
* **Audio:** HTML5 Audio API
* **Storage:** Browser `localStorage`

---

## 🚀 How to Run it Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer (v18 or higher is recommended).

### Setup Steps
1. Clone this repository or download the project files.
2. Open your terminal, navigate to the project directory, and install the dependencies:
```bash
   npm install

```

3. Start the local development server:

```bash
   npm run dev

```

4. Open the link provided in your terminal (usually `http://localhost:5173`) in your browser to play!

---

## 🎵 Adding Music

A default background music is included but if you want to add your favorite track, just place it to the project files at:

```text
public/audio/synthwave.mp3

```

*(Make sure the file is named exactly `synthwave.mp3` so the audio engine can find it).*

---

## 🎮 Game Rules & Controls

1. Hit **Start Game** and get ready—the blocks will start falling automatically on both sides.
2. Focus on the **Player Terminal** instead of steering the pieces. Look at the JavaScript snippet and Hint (if you want), type the missing code, and press **Enter** or **FIRE**.
3. **Getting it right (+150 pts):** Destroys your currently falling block to save you space, clears a row of garbage from your bottom screen, and sends a garbage row to the CPU.
4. **Getting it wrong:** Shows a syntax error, and your blocks keep falling.
5. **CPU Bot:** The bot attempts to solve a question every 8–12 seconds with about a 70% success rate. If it succeeds, it attacks you!
6. **Game Over:** If blocks stack all the way to the top of either grid, the game ends. Click **Retry** to try again.

---

Feel free to use it or tweak it for your own learning!

```

```
