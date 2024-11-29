document.addEventListener("DOMContentLoaded", () => {
    const artistForm = document.getElementById("submit-artist");
    const searchForm = document.getElementById("search-form");
    const resultsDiv = document.getElementById("search-results");

    // Store artists in localStorage
    const getArtists = () => JSON.parse(localStorage.getItem("artists")) || [];
    const saveArtists = (artists) => localStorage.setItem("artists", JSON.stringify(artists));

    // Handle artist submission
    artistForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const artist = {
            name: document.getElementById("artist-name").value.trim(),
            tiktok: document.getElementById("tiktok-url").value.trim(),
            instagram: document.getElementById("instagram-url").value.trim(),
            facebook: document.getElementById("facebook-url").value.trim(),
            twitter: document.getElementById("twitter-url").value.trim(),
        };

        const artists = getArtists();
        artists.push(artist);
        saveArtists(artists);

        alert("Artist saved!");
        artistForm.reset();
    });

    // Handle artist search
    searchForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("search-name").value.trim();
        const artists = getArtists();

        const artist = artists.find((artist) => artist.name.toLowerCase() === name.toLowerCase());

        if (!artist) {
            resultsDiv.innerHTML = `<p>No artist found with the name "${name}".</p>`;
            return;
        }

        resultsDiv.innerHTML = `<p>Fetching follower data for ${artist.name}...</p>`;

        // Fetch follower data from backend
        try {
            const response = await fetch("https://your-backend-url.com/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(artist),
            });

            const data = await response.json();

            resultsDiv.innerHTML = `
                <h3>${artist.name}</h3>
                <p>TikTok Followers: ${data.tiktok}</p>
                <p>Instagram Followers: ${data.instagram}</p>
                <p>Facebook Followers: ${data.facebook}</p>
                <p>Twitter Followers: ${data.twitter}</p>
            `;
        } catch (error) {
            resultsDiv.innerHTML = `<p>Error fetching follower data. Please try again later.</p>`;
        }
    });
});
