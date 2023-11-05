window.setup = window.setup || {};

// scripts/init.js
setup.game = {
  playerName: "",
  energy: 100,

  planets: [
    {
      id: 1,
      imgSrc: "img/planet-1.png",
      repImgSrc: "img/rep-1.png",
      splashImgSrc: "img/planet-1-splash.png",
      name: "Planet A (Tutorial): FuNKybEAtZ",
      rep: "DJ FuNKybEAtZ (they/them)",
      project:
        "EmCee for the show. The broadcast is actually being transmitted through DJ FUNKYBEATZ.",
      description:
        "DJ FUNKYBEATZ is the onboarder & tutorial for the game. Very welcoming and a little wacky.",
    },
    {
      id: 2,
      imgSrc: "img/planet-2.png",
      repImgSrc: "img/rep-2.png",
      splashImgSrc: "img/planet-2-splash.png",
      name: "Planet B: Razzmatazz",
      rep: "Boris the Clown (he/him)",
      project:
        "Holographic circus show. Involves juggling spoons and repurposing all kinds of garbage. Very silly and wild.",
      description:
        "Boris is a loveable grump who has seen some stuff. Loves collecting the weirdos to join his circus planet.",
    },
    {
      id: 3,
      imgSrc: "img/planet-3.png",
      repImgSrc: "img/rep-3.png",
      splashImgSrc: "img/planet-3-splash.png",
      name: "Planet C: Chanterella",
      rep: "Spore T. Spice (she/they high femme drag)",
      project: "Holographic psychedelic performance art drag show.",
      description:
        "High fashion. High drama. Dragtastic. Spore T. Spice is fun. Definitely probably on mushrooms some of the time. Incredible gardener and environmentalist. Makes some mean food.",
    },
    {
      id: 4,
      imgSrc: "img/planet-4.png",
      repImgSrc: "img/rep-4.png",
      splashImgSrc: "img/planet-4-splash.png",
      name: "Planet D: Kelpler",
      rep: "Flotsam (they/them)",
      project:
        "Videography radio livestream of water show (with surfers!) Airships, boats, all things. Tricks! Clown planet lends them some unicylers.",
      description:
        "Genderless being made of water. Somewhat surfer-bro but real genuine n sweet. Has a sibling Jestam they refer to, who is stuck trying to make it big in the Dominion Planetation. Jetsam is MORE surfer bro. Jetsam is maybe a shark (but art team can decide.) We may only see Jetsam in a special scenario ending.",
    },
    {
      id: 5,
      imgSrc: "img/planet-5.png",
      repImgSrc: "img/rep-5.png",
      splashImgSrc: "img/planet-5-splash.png",
      name: "Planet E: Barkenberg",
      rep: "Spike (cat), Spook (raccoon), and Spark (dog) - (independent genders)",
      project: "Audio drama of their heists narrated (like War of the Worlds).",
      description:
        "Ghost pets who care. They will send you short videos of pets doing weird n cute things to cheer you up. Sometimes go full goblin mode. They love to cause mischief and mess with capitalism -- sneak into the Dominion Plantation and mess things up.",
    },
  ],

  scenarios: [
    {
      title: "Stellar Harmony",
      description:
        "The Intergalactic Orchestra has lost its melody, scattering notes across the cosmos. Retrieve the musical fragments to restore harmony to the galaxy.",
      relatedPassage: "Melodic Quest",
      complete: false,
    },
    {
      title: "Quantum Quandary",
      description:
        "A quantum computer has gone haywire, creating chaos in the time-space continuum. Solve complex puzzles to recalibrate the machine and stabilize reality.",
      relatedPassage: "Quantum Conundrum",
      complete: false,
    },
    {
      title: "Nebula Nurturing",
      description:
        "A newborn nebula is struggling to form stars. Gather stardust and cosmic energy to nurture its growth and witness the birth of new suns.",
      relatedPassage: "Stellar Cradle",
      complete: false,
    },
  ],
  turns: [
    {
      1: {},
      2: {},
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
story.state.changeEnergy = function (change) {
  setup.game.energy += change;
  console.log("Energy is now ", setup.game.energy);
  setup.updateEnergy(setup.game.energy);
};
setup.showPlanet = function (planetIndex) {
  const planet = setup.game.planets[planetIndex];
  let content = `<h1>${planet.name}</h1><p>${planet.description}</p>`;
  let repContent = `<span class='repName text-sm uppercase p-1 bg-neutral-300 text-center'>${planet.rep}</span><div><img class='repImage w-40 h-40 -mb-4' src='${planet.repImgSrc}' /></div>`;
  var repContainer = document.getElementById("rep");

  var splashContainer = document.getElementById("planet-splash");
  splashContainer.style.backgroundImage = `url(${planet.splashImgSrc})`;

  repContainer.innerHTML = repContent;

  return content;
};
setup.renderPlanetPassage = function (planetIndex) {
  try {
    var planetContent = setup.showPlanet(planetIndex);
    var scenarioData = setup.showRandomIncompleteScenario();
    var scenarioContent = scenarioData.content;
    var passageContent = "";

    // Only render the passage if relatedPassage is not null
    if (scenarioData.relatedPassage) {
      passageContent = window.story.render(scenarioData.relatedPassage);
    } else {
      console.error("relatedPassage is null for scenario", scenarioData);
    }

    var content = scenarioContent + passageContent;
    var mapScreen = document.getElementById("mapScreen");
    var passage = document.getElementById("passage");
    var planetContentContainer = document.getElementById("planetContent");
    var passageContainer = document.getElementById("passageContainer");
    var hud = document.getElementById("hud");

    if (mapScreen) mapScreen.style.display = "none";
    if (hud) hud.style.display = "flex";
    if (passageContainer) {
      passage.innerHTML = content;
      planetContentContainer.innerHTML = planetContent;
      passageContainer.style.display = "block";
    }
  } catch (error) {
    console.error("Error in renderPlanetPassage:", error);
  }
};

setup.returnToMap = function () {
  var hud = document.getElementById("hud");
  var mapScreen = document.getElementById("mapScreen");
  var passageContainer = document.getElementById("passageContainer");

  if (hud) hud.style.display = "none"; // Hide the HUD
  if (mapScreen) mapScreen.style.display = "grid"; // Show the map
  if (passageContainer) passage.innerHTML = ""; // Clear the passage content

  // Reset the current planet index or any other state variables if needed
  // story.state.currentPlanetIndex = null;
};

setup.showRandomIncompleteScenario = function () {
  var incompleteScenarios = setup.game.scenarios.filter(function (scenario) {
    return !scenario.complete;
  });

  if (incompleteScenarios.length > 0) {
    var randomIndex = Math.floor(Math.random() * incompleteScenarios.length);
    // var scenario = incompleteScenarios[randomIndex];
    var scenario = either(incompleteScenarios);

    return {
      content: `<h2>${scenario.title}</h2><p>${scenario.description}</p>`,
      relatedPassage: scenario.relatedPassage,
    };
  } else {
    return {
      content: "<p>No incomplete scenarios left.</p>",
      relatedPassage: null,
    };
  }
};

setup.showMap = function () {
  var mapScreen = document.getElementById("mapScreen");
  if (mapScreen) {
    mapScreen.style.display = "grid"; // Show the map
    setup.game.planets.forEach((planet) => {
      const img = document.createElement("img");
      img.className = `planet planet${planet.id}`;
      img.src = planet.imgSrc;
      img.onclick = function () {
        setup.renderPlanetPassage(planet.id - 1);
        setup.toggleHUD(true);
      };
      mapScreen.appendChild(img);
    });
  }
};
setup.toggleHUDTop = function (shouldShow) {
  var hudTop = document.getElementById("hudTop");
  if (hudTop) {
    hudTop.style.display = shouldShow ? "flex" : "none";
  }
};
setup.toggleHUD = function (shouldShow) {
  var hud = document.getElementById("hud");
  if (hud) {
    hud.style.display = shouldShow ? "flex" : "none";

    if (!shouldShow) {
      var passageContainer = document.getElementById("passageContainer");
      var passage = document.getElementById("passage");

      if (passageContainer) {
        passage.innerHTML = ""; // Clear the passage container
      }
    }
  } else {
    console.error("HUD element not found");
  }
};
setup.updateEnergy = function (change) {
  // update the $energy div when energy changes
  var energy = document.getElementById("energy");
  if (energy) {
    energy.innerHTML = setup.game.energy;
  } else {
    console.error("Energy element not found");
  }
};

// planet interactiosn

setup.buddyUp = function () {
  // Code for the BUDDY UP action
};

setup.trackTime = function () {
  // Code for the TRACK TIME action
};

setup.engageInProject = function () {
  // Code for the ENGAGE IN PROJECT action
};

setup.shareSkills = function () {
  // Code for the SHARE SKILLS action
};

setup.accountForValue = function () {
  // Code for the ACCOUNT FOR VALUE action
};

// Bind the actions to the list items
// window.onload = function () {
//   document.getElementById("buddyUp").onclick = setup.buddyUp;
//   document.getElementById("trackTime").onclick = setup.trackTime;
//   document.getElementById("engageInProject").onclick = setup.engageInProject;
//   document.getElementById("shareSkills").onclick = setup.shareSkills;
//   document.getElementById("accountForValue").onclick = setup.accountForValue;
// };
