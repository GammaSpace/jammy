window.setup = window.setup || {};

// scripts/init.js
setup.game = {
  playerName: "",
  energyReserves: 100,

  planets: [
    {
      id: 1,
      imgSrc: "img/planet-1.png",
      name: "Planet A (Tutorial): FuNKybEAtZ",
      rep: "DJ FuNKybEAtZ (they/them)",
      project:
        "EmCee for the show. The broadcast is actually being transmitted through DJ FUNKYBEATZ.",
      description:
        "DJ FUNKYBEATZ is the onboarder & tutorial for the game. Very welcoming and a little wacky.",
      scenarios: {
        regular: [
          {
            title: "Scenario A1",
            description: "Description of Scenario A1",
            complete: false,
          },
          {
            title: "Scenario A2",
            description: "Description of Scenario A2",
            complete: false,
          },
        ],
        dependent: [
          {
            title: "Dependent Scenario A1",
            description: "Description of Dependent Scenario A1",
            complete: false,
          },
          {
            title: "Dependent Scenario A2",
            description: "Description of Dependent Scenario A2",
            complete: false,
          },
        ],
      },
    },
    {
      id: 2,
      imgSrc: "img/planet-2.png",
      name: "Planet B: Razzmatazz",
      rep: "Boris the Clown (he/him)",
      project:
        "Holographic circus show. Involves juggling spoons and repurposing all kinds of garbage. Very silly and wild.",
      description:
        "Boris is a loveable grump who has seen some stuff. Loves collecting the weirdos to join his circus planet.",
      scenarios: {
        regular: [
          {
            title: "Scenario B1",
            description: "Description of Scenario B1",
            complete: false,
          },
          {
            title: "Scenario B2",
            description: "Description of Scenario B2",
            complete: false,
          },
        ],
        dependent: [
          {
            title: "Dependent Scenario B1",
            description: "Description of Dependent Scenario B1",
            complete: false,
          },
          {
            title: "Dependent Scenario B2",
            description: "Description of Dependent Scenario B2",
            complete: false,
          },
        ],
      },
    },
    {
      id: 3,
      imgSrc: "img/planet-3.png",
      name: "Planet C: Chanterella",
      rep: "Spore T. Spice (she/they high femme drag)",
      project: "Holographic psychedelic performance art drag show.",
      description:
        "High fashion. High drama. Dragtastic. Spore T. Spice is fun. Definitely probably on mushrooms some of the time. Incredible gardener and environmentalist. Makes some mean food.",
      scenarios: {
        regular: [
          {
            title: "Scenario C1",
            description: "Description of Scenario C1",
            complete: false,
          },
          {
            title: "Scenario C2",
            description: "Description of Scenario C2",
            complete: false,
          },
        ],
        dependent: [
          {
            title: "Dependent Scenario C1",
            description: "Description of Dependent Scenario C1",
            complete: false,
          },
          {
            title: "Dependent Scenario C2",
            description: "Description of Dependent Scenario C2",
            complete: false,
          },
        ],
      },
    },
    {
      id: 4,
      imgSrc: "img/planet-4.png",
      name: "Planet D: Kelpler",
      rep: "Flotsam (they/them)",
      project:
        "Videography radio livestream of water show (with surfers!) Airships, boats, all things. Tricks! Clown planet lends them some unicylers.",
      description:
        "Genderless being made of water. Somewhat surfer-bro but real genuine n sweet. Has a sibling Jestam they refer to, who is stuck trying to make it big in the Dominion Planetation. Jetsam is MORE surfer bro. Jetsam is maybe a shark (but art team can decide.) We may only see Jetsam in a special scenario ending.",
      scenarios: {
        regular: [
          {
            title: "Scenario D1",
            description: "Description of Scenario D1",
            complete: false,
          },
          {
            title: "Scenario D2",
            description: "Description of Scenario D2",
            complete: false,
          },
        ],
        dependent: [
          {
            title: "Dependent Scenario D1",
            description: "Description of Dependent Scenario D1",
            complete: false,
          },
          {
            title: "Dependent Scenario D2",
            description: "Description of Dependent Scenario D2",
            complete: false,
          },
        ],
      },
    },
    {
      id: 5,
      imgSrc: "img/planet-5.png",
      name: "Planet E: Barkenberg",
      rep: "Spike (cat), Spook (raccoon), and Spark (dog) - (independent genders)",
      project: "Audio drama of their heists narrated (like War of the Worlds).",
      description:
        "Ghost pets who care. They will send you short videos of pets doing weird n cute things to cheer you up. Sometimes go full goblin mode. They love to cause mischief and mess with capitalism -- sneak into the Dominion Plantation and mess things up.",
      scenarios: {
        regular: [
          {
            title: "Scenario E1",
            description: "Description of Scenario E1",
            complete: false,
          },
          {
            title: "Scenario E2",
            description: "Description of Scenario E2",
            complete: false,
          },
        ],
        dependent: [
          {
            title: "Dependent Scenario E1",
            description: "Description of Dependent Scenario E1",
            complete: false,
          },
          {
            title: "Dependent Scenario E2",
            description: "Description of Dependent Scenario E2",
            complete: false,
          },
        ],
      },
    },
  ],
};

setup.saveNames = function () {
  var playerName = document.getElementById("playerName").value;
  var planetName = document.getElementById("planetName").value;
  story.state.playerName = playerName;
  story.state.planetName = planetName;
  story.show("MapScreen");
};
setup.checkInputs = function () {
  var playerName = document.getElementById("playerName").value;
  var planetName = document.getElementById("planetName").value;
  var nextButton = document.getElementById("nextButton");

  nextButton.disabled = !(playerName && planetName);
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
  return content;
};
setup.renderPlanetPassage = function (planetIndex) {
  try {
    var planetContent = setup.showPlanet(planetIndex);
    var scenarioContent = setup.showRandomIncompleteScenario(planetIndex);
    var content = planetContent + scenarioContent;
    var contentContainer = document.getElementById("contentContainer");

    if (contentContainer) {
      contentContainer.innerHTML = content;
    } else {
      console.error("contentContainer element not found");
    }
  } catch (error) {
    console.error("Error in renderPlanetPassage:", error);
  }
};
setup.toggleContentContainer = function (shouldShow) {
  var contentContainer = document.getElementById("contentContainer");
  contentContainer.style.display = shouldShow ? "flex" : "none";
};
// For displaying the map
setup.showMap = function () {
  var mapScreen = document.getElementById("mapScreen");
  mapScreen.style.display = "grid"; // Show the map
  setup.game.planets.forEach((planet) => {
    const img = document.createElement("img");
    img.className = `planet planet${planet.id}`;
    img.src = planet.imgSrc;
    img.onclick = function () {
      setup.renderPlanetPassage(planet.id - 1);
      setup.toggleContentContainer(true); // Show the content container when a planet is clicked
    };
    mapScreen.appendChild(img);
  });

  // Add event listener to the mapScreen
  mapScreen.addEventListener("click", function (event) {
    if (event.target === mapScreen) {
      setup.toggleContentContainer(false); // Hide the content container if mapScreen is clicked
    }
  });
};

// For returning to the map from a planet/scenario
setup.returnToMap = function () {
  var contentContainer = document.getElementById("contentContainer");
  var mapScreen = document.getElementById("mapScreen");

  contentContainer.style.display = "none"; // Hide the content
  mapScreen.style.display = "grid"; // Show the map
};

setup.showRandomIncompleteScenario = function (planetIndex) {
  try {
    // console.log("showRandomIncompleteScenario ran!", planetIndex);
    var planet = setup.game.planets[planetIndex];
    // console.log("planet: ", planet);
    var allScenarios = planet.scenarios.regular.concat(
      planet.scenarios.dependent
    );
    // console.log("allScenarios: ", allScenarios);
    var incompleteScenarios = allScenarios.filter(function (scenario) {
      return !scenario.complete;
    });
    // console.log("incompleteScenarios: ", incompleteScenarios);

    if (incompleteScenarios.length > 0) {
      var randomIndex = Math.floor(Math.random() * incompleteScenarios.length);
      var scenario = incompleteScenarios[randomIndex];
      var content = `<h2>${scenario.title}</h2><p>${scenario.description}</p>`;
      console.log("content: ", content);
      return content;
    } else {
      story.render("<p>No incomplete scenarios left for this planet.</p>");
    }
  } catch (error) {
    console.error("Error in showRandomIncompleteScenario:", error);
  }
};
