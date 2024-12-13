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
