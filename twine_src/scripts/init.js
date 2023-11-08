window.setup = window.setup || {};

// this is demented, but it works
// couldn't figure out how to override default behaviour of Twine's a tags

$(document).on("click", "div[data-next]", function (e) {
  var passageName = $(this).attr("data-next");
  renderToSelector("#passage", passageName);
});

function startObserving() {
  var targetNode = document.getElementById("passageContainer");
  if (targetNode) {
    var config = { childList: true, subtree: true };
    var callback = function (mutationsList, observer) {
      for (var mutation of mutationsList) {
        if (mutation.type === "childList") {
          setup.modifyLinks();
          break;
        }
      }
    };
    var observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  } else {
    setTimeout(startObserving, 500);
  }
}
startObserving();

// scripts/init.js
setup.game = {
  turn: 1,
  energy: 100,
  planets: [
    {
      id: 1,
      imgSrc: "img/planet-1.png",
      repImgSrc: "img/rep-1.png",
      splashImgSrc: "img/planet-1-splash.png",
      name: "FuNKybEAtZ",
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
      name: "Razzmatazz",
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
      name: "Chanterella",
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
      name: "Kelpler",
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
      name: "Barkenberg",
      rep: "Spike (cat), Spook (raccoon), and Spark (dog) - (independent genders)",
      project: "Audio drama of their heists narrated (like War of the Worlds).",
      description:
        "Ghost pets who care. They will send you short videos of pets doing weird n cute things to cheer you up. Sometimes go full goblin mode. They love to cause mischief and mess with capitalism -- sneak into the Dominion Plantation and mess things up.",
    },
  ],
  scenarios: [
    {
      scenarioPassage: "Melodic Quest",
      complete: false,
    },
    // {
    //   scenarioPassage: "Quantum Conundrum",
    //   complete: false,
    // },
    // {
    //   scenarioPassage: "Stellar Cradle",
    //   complete: false,
    // },
  ],
  turns: [
    {
      turnNumber: 1,
      planets: [
        {
          id: 1,
          need: {
            askText: "Plant a garden",
            energyChange: 5,
            helpSuccessText: "Success Text",
            helpFailedText: "Failed Text",
          },
        },
        {
          id: 3,
          need: {
            askText: "Capture the bees",
            energyChange: 15,
            helpSuccessText: "Success Text",
            helpFailedText: "Failed Text",
          },
        },
        {
          id: 5,
          need: {
            askText: "Invite the Queen to dinner",
            energyChange: 25,
            helpSuccessText: "Success Text",
            helpFailedText: "Failed Text",
          },
        },
      ],
    },
    // ... other turns
  ],
};

setup.savePlayerInfo = function () {
  var playerName = document.getElementById("playerName").value;
  var planetName = document.getElementById("planetName").value;
  var projectDescription = document.getElementById("projectDescription").value;

  var planetImgSrc = document.querySelector(
    'input[name="planetImage"]:checked'
  ).value;

  story.state.playerPlanet = {
    name: planetName,
    description: projectDescription,
    imgSrc: planetImgSrc,
  };

  story.state.playerName = playerName;

  story.show("Map Screen");
};

setup.checkInputs = function () {
  var playerName = document.getElementById("playerName").value.trim();
  var planetName = document.getElementById("planetName").value.trim();
  var projectDescription = document
    .getElementById("projectDescription")
    .value.trim();

  // Access the checked radio button by name
  var planetImage = document.querySelector(
    'input[name="planetImage"]:checked'
  )?.value;

  var nextButton = document.getElementById("nextButton");

  // Enable the button only if all fields have values
  nextButton.disabled = !(
    playerName &&
    planetName &&
    projectDescription &&
    planetImage
  );
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
  setup.updateEnergyBar();
  var energyChangeText = document.getElementById("energyChangeText");
  if (change >= 0) {
    energyChangeText.innerText = `+${change}`;
  } else {
    energyChangeText.innerText = `+${change}`;
  }

  energyChangeText.style.opacity = 0;

  setTimeout(function () {
    energyChangeText.style.opacity = 1;
  }, 10);

  setTimeout(function () {
    energyChangeText.style.opacity = 0;
  }, 2000);
};

setup.showPlanet = function (planetIndex) {
  const planet = setup.game.planets[planetIndex];
  let content = planet.description;
  let repContent = `<img class='repImage' src='${planet.repImgSrc}' /><div class='repName'>${planet.rep}</div>`;
  var repContainer = document.getElementById("rep");

  var splashContainer = document.getElementById("planet-splash");
  splashContainer.style.backgroundImage = `url(${planet.splashImgSrc})`;
  splashContainer.innerHTML =
    "<h1 class='text-xl md:text-6xl text-neutral-200 font-display uppercase'>" +
    planet.name +
    "</h1> <div id='planetContent' class='text-neutral-300 text-base'></div>";

  repContainer.innerHTML = repContent;

  return content;
};

setup.modifyLinks = function () {
  $("a[data-passage]").each(function () {
    var $this = $(this);
    var passageName = $this.attr("data-passage");
    var text = $this.text();
    var newDiv = $('<div data-next="' + passageName + '"></div>').text(text);
    $this.replaceWith(newDiv);
  });
};

setup.renderPlanetPassage = function (planetIndex) {
  try {
    var planetContent = setup.showPlanet(planetIndex);
    var scenarioData = setup.showRandomIncompleteScenario();
    var scenarioContent = scenarioData.content;
    var passageContent = "";
    // Add check for inactive class
    if (
      document
        .querySelector(".planet" + planetIndex)
        .classList.contains("inactive")
    ) {
      return; // exit the function if the planet should not be clickable
    }
    // Only render the passage if scenarioPassage is not null
    if (scenarioData.scenarioPassage) {
      passageContent = story.render(scenarioData.scenarioPassage);
    } else {
      console.error("scenarioPassage is null for scenario", scenarioData);
    }

    var mapScreen = document.getElementById("mapScreen");
    var passage = document.getElementById("passage");
    var planetContentContainer = document.getElementById("planetContent");
    var passageContainer = document.getElementById("passageContainer");
    var hud = document.getElementById("hud");

    if (mapScreen) mapScreen.style.display = "none";
    if (hud) hud.style.display = "flex";
    if (passageContainer) {
      passage.innerHTML = passageContent;
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

  if (hud) hud.style.display = "none";
  if (mapScreen) mapScreen.style.display = "grid";
  if (passage) passage.innerHTML = "";

  story.state.currentPlanetIndex = null;
};

setup.showRandomIncompleteScenario = function () {
  var incompleteScenarios = setup.game.scenarios.filter(function (scenario) {
    return !scenario.complete;
  });

  if (incompleteScenarios.length > 0) {
    var scenario = either(incompleteScenarios);

    return {
      scenarioPassage: scenario.scenarioPassage,
    };
  } else {
    return {
      scenarioPassage: null,
    };
  }
};

setup.showMap = function () {
  var mapScreen = document.getElementById("mapScreen");
  if (mapScreen) {
    mapScreen.style.display = "grid";
    mapScreen.innerHTML = "";

    let loadedPlanets = 0;
    const totalPlanets =
      setup.game.planets.length + (story.state.playerPlanet ? 1 : 0);

    setup.game.planets.forEach((planet, index) => {
      const planetContainer = document.createElement("div");
      planetContainer.className = `planet-container planet-container${planet.id}`;
      const img = document.createElement("img");
      img.className = `planet planet${planet.id}`;
      img.src = planet.imgSrc;

      img.onload = function () {
        if (setup.checkTurnNeeds(planet, img)) {
          img.classList.add("active-turn");
        }
        img.onclick = function () {
          setup.renderPlanetPassage(planet.id - 1);
          setup.toggleHUD(true);
        };
        planetContainer.appendChild(img);
        setup.appendTooltip(planet, planetContainer);
        mapScreen.appendChild(planetContainer);
        checkAllPlanetsLoaded(++loadedPlanets, totalPlanets);
      };
    });

    if (story.state.playerPlanet) {
      const playerPlanetContainer = document.createElement("div");
      playerPlanetContainer.className =
        "planet-container planet-container-player";
      const playerPlanetImg = document.createElement("img");
      playerPlanetImg.className = "planet planet-player";
      playerPlanetImg.src = story.state.playerPlanet.imgSrc;

      playerPlanetImg.onload = function () {
        playerPlanetImg.onclick = function () {
          setup.renderPlanetPassage("player");
          setup.toggleHUD(true);
        };
        playerPlanetContainer.appendChild(playerPlanetImg);
        setup.appendTooltip(story.state.playerPlanet, playerPlanetContainer);
        mapScreen.appendChild(playerPlanetContainer);
        checkAllPlanetsLoaded(++loadedPlanets, totalPlanets);
      };
    }
  }
};

function checkAllPlanetsLoaded(loaded, total) {
  if (loaded === total) {
    setup.checkForIncompleteScenarios();
  }
}

setup.checkForIncompleteScenarios = function () {
  var incompleteScenarios = setup.game.scenarios.filter(function (scenario) {
    return !scenario.complete;
  });
  console.log(incompleteScenarios.length);

  if (incompleteScenarios.length === 0) {
    console.log("All scenarios complete");
    document.querySelectorAll(".planet").forEach(function (planet) {
      console.log("Getting planets…");
      planet.style.pointerEvents = "none";
      planet.classList.add("inactive");
    });
    var message = document.createElement("div");
    message.textContent =
      "All scenarios complete. Click here to start the next turn.";

    // Tailwind CSS classes to center the message
    message.classList.add("next-turn-message");

    message.onclick = setup.startNewTurn;
    document.body.appendChild(message);
  }
};

setup.checkTurnNeeds = function (planet, img) {
  const currentTurn = setup.game.turns.find(
    (turn) => turn.turnNumber === setup.game.turn
  );
  return currentTurn && currentTurn.planets.find((p) => p.id === planet.id);
};

setup.appendTooltip = (planet, container) => {
  const tooltipDiv = document.createElement("div");
  tooltipDiv.className = "tooltip";
  tooltipDiv.innerText = planet.name;
  // Hide the tooltip initially
  tooltipDiv.style.visibility = "hidden";
  tooltipDiv.style.opacity = "0";
  tooltipDiv.style.transition =
    "visibility 0s linear 0.5s, opacity 0.5s linear";
  container.appendChild(tooltipDiv);

  // Show the tooltip on hover
  container.onmouseover = function () {
    tooltipDiv.style.visibility = "visible";
    tooltipDiv.style.opacity = "1";
    tooltipDiv.style.transitionDelay = "0s";
  };

  // Hide the tooltip when not hovered
  container.onmouseleave = function () {
    tooltipDiv.style.visibility = "hidden";
    tooltipDiv.style.opacity = "0";
    tooltipDiv.style.transitionDelay = "0.5s";
  };
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
setup.updateEnergyBar = function () {
  var energyBar = document.querySelector(".energy-bar"); // Assuming you add a class "energy-bar" to the div
  if (energyBar) {
    var newWidth = (setup.game.energy / 700) * 100;
    newWidth = Math.min(Math.max(newWidth, 0), 100); // Clamp the value between 0 and 100
    energyBar.style.width = newWidth + "%";
  } else {
    console.error("Energy bar element not found");
  }
};

setup.startNewTurn = function () {
  setup.game.turn += 1;
  document.getElementById("turnCounter").innerText = setup.game.turn;
  setup.game.addressedNeeds = [];
  setup.checkPlanetaryNeeds();
  setup.checkTurnEvents();
  // srt checkpoint?
};

setup.checkPlanetaryNeeds = function () {
  setup.game.planets.forEach((planet) => {
    const turnNeed = setup.game.turns.find(
      (turn) =>
        turn.turnNumber === setup.game.turn &&
        turn.planets.some((p) => p.id === planet.id)
    );
    if (turnNeed) {
      // Handle the planet's need here
      console.log(
        "Planet " + planet.name + " has a need: " + turnNeed.need.askText
      );
    }
  });
};

setup.checkTurnEvents = function () {
  // Check if there is an event for the current turn
  const turnEvent = setup.game.turns.find(
    (turn) => turn.turnNumber === setup.game.turn && turn.event
  );
  if (turnEvent) {
    // Handle the event here
    console.log("Event occurs: " + turnEvent.event.description);
  }
};

setup.addressPlanetaryNeed = function (planetId) {
  setup.game.addressedNeeds.push(planetId);

  const needsForTurn = setup.game.turns
    .find((turn) => turn.turnNumber === setup.game.turn)
    .planets.map((planet) => planet.id);

  const allNeedsAddressed = needsForTurn.every((id) =>
    setup.game.addressedNeeds.includes(id)
  );

  if (allNeedsAddressed) {
    setup.endTurn();
  }
};

setup.completeScenario = function (energyChange) {
  var currentPassageTitle = story.passage.title;
  const scenario = setup.game.scenarios.find(
    (s) => s.title === currentPassageTitle
  );
  if (scenario) scenario.complete = true;
  story.checkpoint("Completed " + currentPassageTitle);
  story.show("Map Screen");
  story.state.changeEnergy(energyChange);
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
