function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const mod_one_rand = getRandomInt(300);
const mod_two_rand = getRandomInt(300);

const mod_one_url = `https://api.modrinth.com/v2/search?facets=[["downloads >= 200"],["project_type:mod"]]&index=follows&offset=${mod_one_rand}&limit=1`;
const mod_two_url = `https://api.modrinth.com/v2/search?facets=[["downloads >= 200"],["project_type:mod"]]&index=follows&offset=${mod_two_rand}&limit=1`;

const fetchMod = async (url) => {
  const res = await fetch(url);
  return res.json();
};

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([fetchMod(mod_one_url), fetchMod(mod_two_url)]).then(([mod_one, mod_two]) => {
    const modData = {
      mod_one: {
        id: 0,
        name: mod_one.hits[0].title,
        slug: mod_one.hits[0].project_id,
        icon: mod_one.hits[0].icon_url,
        downloads: mod_one.hits[0].downloads,
      },
      mod_two: {
        id: 1,
        name: mod_two.hits[0].title,
        slug: mod_two.hits[0].project_id,
        icon: mod_two.hits[0].icon_url,
        downloads: mod_two.hits[0].downloads,
      },
    };

    // Fill Mod One
    const oneLink = document.getElementById("mod_one_link");
    oneLink.href = `https://modrinth.com/mod/${modData.mod_one.slug}`;
    oneLink.textContent = modData.mod_one.name;
    document.getElementById("mod_one_img").src = modData.mod_one.icon;
    document.getElementById("mod_one_component").style.setProperty("--bg-url", `url(${modData.mod_one.icon})`);
    document.getElementById("downloads_one").textContent = modData.mod_one.downloads.toLocaleString();
    document.getElementById("mod_one_button").textContent = `${modData.mod_one.name} Has More Downloads!`;

    // Fill Mod Two
    const twoLink = document.getElementById("mod_two_link");
    twoLink.href = `https://modrinth.com/mod/${modData.mod_two.slug}`;
    twoLink.textContent = modData.mod_two.name;
    document.getElementById("mod_two_img").src = modData.mod_two.icon;
    document.getElementById("mod_two_component").style.setProperty("--bg-url", `url(${modData.mod_two.icon})`);
    document.getElementById("downloads_two").textContent = modData.mod_two.downloads.toLocaleString();
    document.getElementById("mod_two_button").textContent = `${modData.mod_two.name} Has More Downloads!`;

    // Game logic
    const showResults = (playerChoice) => {
      // reveal both download labels
      document.getElementById("downloads_one_label").classList.add("visible");
      document.getElementById("downloads_two_label").classList.add("visible");

      const one = modData.mod_one.downloads;
      const two = modData.mod_two.downloads;
      const correct = one > two ? "one" : "two";

      if (playerChoice === correct) {
        alert("✅ Correct! You guessed right!");
      } else {
        alert("❌ Wrong! Better luck next time!");
      }

      setTimeout(() => location.reload(), 2000);
    };

    document.getElementById("mod_one_button").addEventListener("click", () => showResults("one"));
    document.getElementById("mod_two_button").addEventListener("click", () => showResults("two"));
  });
});
