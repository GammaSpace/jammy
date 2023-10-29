window.setup = window.setup || {};

// scripts/init.js
setup.game = {
  playerName: "",
  energyReserves: 100,
  planets: [
    {
      name: "Planet A (Tutorial): FuNKybEAtZ",
      rep: "DJ FuNKybEAtZ (they/them)",
      project:
        "EmCee for the show. The broadcast is actually being transmitted through DJ FUNKYBEATZ.",
      description:
        "DJ FUNKYBEATZ is the onboarder & tutorial for the game. Very welcoming and a little wacky.",
      scenarios: {
        regular: [
          { title: "Scenario A1", description: "Description of Scenario A1" },
          { title: "Scenario A2", description: "Description of Scenario A2" },
        ],
        dependent: [
          {
            title: "Dependent Scenario A1",
            description: "Description of Dependent Scenario A1",
          },
        ],
      },
    },
    {
      name: "Planet E: Barkenberg",
      rep: "Spike (cat), Spook (raccoon), and Spark (dog) - (independent genders)",
      project: "Audio drama of their heists narrated (like War of the Worlds).",
      description:
        "Ghost pets who care. They will send you short videos of pets doing weird n cute things to cheer you up. Sometimes go full goblin mode. https://twitter.com/mischiefanimals - They love to cause mischief and fuck with capitalism -- sneak into the Dominion Planetation and mess things up.",
      scenarios: {
        regular: [
          { title: "Scenario E1", description: "Description of Scenario E1" },
          { title: "Scenario E2", description: "Description of Scenario E2" },
        ],
        dependent: [
          {
            title: "Dependent Scenario E1",
            description: "Description of Dependent Scenario E1",
          },
        ],
      },
    },
  ],
};

story.state.setHe = function () {
  story.state.pronouns = ["he", "him", "his", "his", "he's"];
  story.state.cPronouns = ["He", "Him", "His", "His", "He's"];
  story.show("Preface");
};
story.state.setShe = function () {
  story.state.pronouns = ["she", "her", "her", "hers", "she's"];
  story.state.cPronouns = ["She", "Her", "Her", "Hers", "She's"];
  story.show("Preface");
};
story.state.setThey = function () {
  story.state.pronouns = ["they", "them", "their", "theirs", "they're"];
  story.state.cPronouns = ["They", "Them", "Their", "Theirs", "They're"];
  story.show("Preface");
};
story.state.setIt = function () {
  story.state.pronouns = ["it", "it", "its", "its", "it's"];
  story.state.cPronouns = ["It", "It", "Its", "Its", "It's"];
  story.show("Preface");
};

setup.showPlanet = function (planetIndex) {
  const planet = setup.game.planets[planetIndex];
  let content = `<h1>${planet.name}</h1><p>${planet.description}</p>`;
  // ... generate more content based on planet data ...
  story.render(content);
};

setup.showScenario = function (planetIndex, scenarioType, scenarioIndex) {
  const scenario =
    setup.game.planets[planetIndex].scenarios[scenarioType][scenarioIndex];
  let content = `<h1>${scenario.title}</h1><p>${scenario.description}</p>`;
  // ... generate more content based on scenario data ...
  story.render(content);
};

setup.getScenarioContent = function (planetIndex, scenarioType, scenarioIndex) {
  const scenario =
    setup.game.planets[planetIndex].scenarios[scenarioType][scenarioIndex];
  let content = `<h1>${scenario.title}</h1><p>${scenario.description}</p>`;
  // ... generate more content based on scenario data ...
  return content;
};
