// Background Images
const backgrounds = [
    'background.png', 'background1.png', 'background2.png', 'background3.png', 'background4.png'
  ];
  
  function changeBackground() {
    let randomImage = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url(${randomImage})`;
  }
  setInterval(changeBackground, 5000);
  changeBackground();
  
  // Update Clock
  function updateClock() {
    let now = new Date();
    document.getElementById("clock").innerText = now.toLocaleTimeString();
  }
  setInterval(updateClock, 1000);
  updateClock();
  
  // Google Search
  document.getElementById("searchBox").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      window.location.href = "https://www.google.com/search?q=" + this.value;
    }
  });
  
  // Tic-Tac-Toe Game
  const ticTacToe = document.getElementById("ticTacToe");
const board = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

function createBoard() {
  ticTacToe.innerHTML = "";
  board.forEach((value, index) => {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.innerText = value;
    cell.addEventListener("click", () => makeMove(index));
    ticTacToe.appendChild(cell);
  });
}

function makeMove(index) {
  if (board[index] || gameOver) return;
  board[index] = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  createBoard();
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
  for (let combo of winningCombos) {
    let [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameOver = true;
      setTimeout(() => alert(`${board[a]} Wins!`), 100);
      return;
    }
  }
  
  if (!board.includes(null)) {
    gameOver = true;
    setTimeout(() => alert("It's a Draw!"), 100);
  }
}
  
createBoard();
  
  // YouTube API Music Search
  const API_KEY = "YOUR_YOUTUBE_API_KEY";
  const searchInput = document.getElementById("musicSearch");
  const resultsList = document.getElementById("results");
  const player = document.getElementById("player");
  
  searchInput.addEventListener("keypress", async function(event) {
    if (event.key === "Enter") {
      let query = searchInput.value;
      let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&key=${API_KEY}&maxResults=5`;
      
      let response = await fetch(url);
      let data = await response.json();
      
      resultsList.innerHTML = "";
      data.items.forEach(item => {
        let videoId = item.id.videoId;
        let title = item.snippet.title;
        
        let li = document.createElement("li");
        li.classList.add("result-item");
        li.innerText = title;
        li.onclick = () => playVideo(videoId);
        resultsList.appendChild(li);
      });
    }
  });
  
  function playVideo(videoId) {
    player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }  
