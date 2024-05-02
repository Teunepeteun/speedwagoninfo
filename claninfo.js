const fs = require('fs');
const fetch = require('cross-fetch'); // Use the CommonJS compatible version
const { execSync } = require('child_process');

// The rest of your code remains the same


async function fetchData() {
    // Function to make API request to retrieve data
    const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA1NjU2ZmJhLWNkODMtNDc5NS1hNmQ4LTdhOTFiNGI3NTA4MyIsImlhdCI6MTcxNDU3Njk4Niwic3ViIjoiZGV2ZWxvcGVyL2EwMTVhMjM0LTU3YTItYjlkNy03MGIzLWE0YjQ4NDZkMDdhNyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE5NC4yMjQuMTkuMTcxIl0sInR5cGUiOiJjbGllbnQifV19.o6wFTncpkFalGwNpCInljdUtdgpHdCHyezcLNMkRRHuKKgl0dBBj68QTdF-0tvHFohicMCrdvph_SKtMBGYDzA';
    const apiUrl = `https://api.clashofclans.com/v1/clans/%232QJ2QPJYG`;

    const response = await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${apiKey}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return JSON.stringify(data); // Convert data to string
}

// Function to create a file from the retrieved data
function createFile(data) {
    fs.writeFileSync('speedwagon.json', data);
}

// Function to push the file to GitHub using GitHub's API
function pushToGitHub() {
    try {
        // Replace 'username', 'repo', 'branch', 'token' with appropriate values
        const username = 'Teunepeteun';
        const repo = 'speedwagoninfo';
        const branch = 'main';
        const token = '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';

        // Add, commit, and push the file to GitHub
        execSync(`git add .`);
        execSync(`git commit -m "Updata data file"`);
        execSync(`git push https://${token}@github.com/${username}/${repo}`);

        console.log('Data file pushed to GitHub successfully.');
    } catch (error) {
        console.error('Error pushing to GitHub:', error);
    }
}

// Main function to orchestrate the process
async function main() {
    try {
        const data = await fetchData();
        createFile(data);
        pushToGitHub();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Execute the main function
main();
