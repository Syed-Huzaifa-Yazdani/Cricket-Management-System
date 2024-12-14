const playerList = document.getElementById('playerList');

// Fetch Players
const fetchPlayers = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/players');
    const players = await response.json();

    playerList.innerHTML = players
      .map(
        (player) =>
          `<li>${player.id}: ${player.name} (${player.country}) - ${player.stats} 
            <button onclick="prepareUpdate('${player.id}', '${player.name}', '${player.stats}', '${player.country}')">Go to Update player section to edit</button>
            <button onclick="deletePlayer('${player.id}')">Delete</button>
          </li>`
      )
      .join('');
  } catch (error) {
    console.error('Error fetching players:', error);
  }
};

// Add Player
document.getElementById('addPlayerBtn').addEventListener('click', async () => {
  const id = document.getElementById('playerId').value.trim();
  const name = document.getElementById('playerName').value.trim();
  const stats = document.getElementById('stats').value.trim();
  const country = document.getElementById('country').value.trim();

  if (!id || !name || !stats || !country) {
    console.log('All fields are required to add a player.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/players/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, stats, country }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      fetchPlayers();
    } else {
      console.error('Error adding player:', data.message);
    }
  } catch (error) {
    console.error('Error adding player:', error);
  }
});

// Prepare Update Form
const prepareUpdate = (id, name, stats, country) => {
  document.getElementById('updateId').value = id;
  document.getElementById('updatePlayerName').value = name;
  document.getElementById('updateStats').value = stats;
  document.getElementById('updateCountry').value = country;
};

// Update Player
document.getElementById('updatePlayerBtn').addEventListener('click', async () => {
  const id = document.getElementById('updateId').value.trim();
  const name = document.getElementById('updatePlayerName').value.trim();
  const stats = document.getElementById('updateStats').value.trim();
  const country = document.getElementById('updateCountry').value.trim();

  if (!id || !name || !stats || !country) {
    console.log('All fields are required to update a player.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/players/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, stats, country }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      fetchPlayers();
    } else {
      console.error('Error updating player:', data.message);
    }
  } catch (error) {
    console.error('Error updating player:', error);
  }
});

// Delete Player
const deletePlayer = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/players/delete/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      fetchPlayers();
    } else {
      console.error('Error deleting player:', data.message);
    }
  } catch (error) {
    console.error('Error deleting player:', error);
  }
};

// Fetch Players on Load
fetchPlayers();


// Set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Get a cookie
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(name + "=") === 0) {
      return cookie.substring((name + "=").length, cookie.length);
    }
  }
  return "";
}

// Check and set the theme based on cookie
function checkThemeCookie() {
  const theme = getCookie("theme");
  if (theme) {
    document.body.className = theme;
  }
}

// Toggle and store the theme preference
function toggleTheme() {
  const currentTheme = document.body.className === "dark-mode" ? "light-mode" : "dark-mode";
  document.body.className = currentTheme;
  setCookie("theme", currentTheme, 7); // Store theme preference for 7 days
}

// Store the last updated player
function storeLastUpdatedPlayer(playerName) {
  setCookie("lastUpdatedPlayer", playerName, 1); // Store for 1 day
  alert("Last updated player stored in cookies: " + playerName);
}

// Set the session start time when the page loads
function setSessionStartTime() {
  const sessionStart = new Date().toLocaleString();
  setCookie("sessionStartTime", sessionStart, 1); // Store for 1 day
}

// Call this function when the page loads
setSessionStartTime();
checkThemeCookie(); // Check theme cookie on load

// Example usage on update player
document.getElementById("updatePlayerBtn").addEventListener("click", () => {
  const updatedPlayerName = document.getElementById("updatePlayerName").value.trim();
  if (updatedPlayerName) {
    storeLastUpdatedPlayer(updatedPlayerName); // Store updated player in cookie
  }
});
