window.setup = window.setup || {};

// scripts/init.js
setup.game = {
  planets: [
    {
      id: 0,
      imgSrc: "img/planet-1.png",
      repImgSrc: "img/rep-1.png",
      splashImgSrc: "img/planet-1-splash.png",
      name: "FuNKybEAtZ",
      rep: "DJ FuNKybEAtZ (they/them)",
      project:
        "EmCee for the show. The broadcast is actually being transmitted through DJ FUNKYBEATZ.",
      description:
        "DJ FUNKYBEATZ is the onboarder & tutorial for the game. Very welcoming and a little wacky.",
      availableTurns: [1, 2, 4, 6],
    },
    {
      id: 1,
      imgSrc: "img/planet-2.png",
      repImgSrc: "img/rep-2.png",
      splashImgSrc: "img/planet-2-splash.png",
      name: "Razzmatazz",
      rep: "Boris the Clown (he/him)",
      project:
        "Holographic circus show. Involves juggling spoons and repurposing all kinds of garbage. Very silly and wild.",
      description:
        "Boris is a loveable grump who has seen some stuff. Loves collecting the weirdos to join his circus planet.",
      availableTurns: [1, 3, 5, 6],
    },
    {
      id: 2,
      imgSrc: "img/planet-3.png",
      repImgSrc: "img/rep-3.png",
      splashImgSrc: "img/planet-3-splash.png",
      name: "Chanterella",
      rep: "Spore T. Spice (she/they high femme drag)",
      project: "Holographic psychedelic performance art drag show.",
      description:
        "High fashion. High drama. Dragtastic. Spore T. Spice is fun. Definitely probably on mushrooms some of the time. Incredible gardener and environmentalist. Makes some mean food.",
      availableTurns: [1, 4, 5, 7],
    },
    {
      id: 3,
      imgSrc: "img/planet-4.png",
      repImgSrc: "img/rep-4.png",
      splashImgSrc: "img/planet-4-splash.png",
      name: "Kelpler",
      rep: "Flotsam (they/them)",
      project:
        "Videography radio livestream of water show (with surfers!) Airships, boats, all things. Tricks! Clown planet lends them some unicylers.",
      description:
        "Genderless being made of water. Somewhat surfer-bro but real genuine n sweet. Has a sibling Jestam they refer to, who is stuck trying to make it big in the Dominion Planetation. Jetsam is MORE surfer bro. Jetsam is maybe a shark (but art team can decide.) We may only see Jetsam in a special scenario ending.",
      availableTurns: [2, 3, 4, 6],
    },
    {
      id: 4,
      imgSrc: "img/planet-5.png",
      repImgSrc: "img/rep-5.png",
      splashImgSrc: "img/planet-5-splash.png",
      name: "Barkenberg",
      rep: "Spike (cat), Spook (raccoon), and Spark (dog) - (independent genders)",
      project: "Audio drama of their heists narrated (like War of the Worlds).",
      description:
        "Ghost pets who care. They will send you short videos of pets doing weird n cute things to cheer you up. Sometimes go full goblin mode. They love to cause mischief and mess with capitalism -- sneak into the Dominion Plantation and mess things up.",
      availableTurns: [2, 3, 5, 7],
    },
  ],
};

setup.game.scenarios = window.story.passages
  .filter((passage) => passage.tags.includes("scenario"))
  .map((passage) => ({
    scenarioPassage: passage.name,
    complete: false,
  }));

story.state.scenarioCompletedThisTurn = false;
story.state.turn = 1;
// this is demented, but it works
// couldn't figure out how to override default behaviour of Twine's a tags

$(document).on("click", "div[data-next]", function (e) {
  var passageName = $(this).attr("data-next");
  renderToSelector("#passage", passageName);
});

setup.startObserving = function () {
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
};

document.addEventListener("DOMContentLoaded", function () {
  setup.startObserving();
});

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

setup.showPlanet = function (planetIndex) {
  story.state.currentPlanet = planetIndex;

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
  setup.startObserving();

  if (story.state.scenarioCompletedThisTurn) {
    console.log("A scenario has already been completed this turn.");
    return; // Exit the function
  }

  try {
    // Log the planetIndex for debugging
    console.log("Rendering planet passage for index: ", planetIndex);

    // Check if the element with the class exists in the DOM
    const planetElementSelector = ".planet" + planetIndex;
    const planetElement = document.querySelector(planetElementSelector);

    if (!planetElement) {
      throw new Error(
        `Element with selector "${planetElementSelector}" does not exist in the DOM.`
      );
    }

    // Check for inactive class
    if (planetElement.classList.contains("inactive")) {
      console.log(
        `Planet with index ${planetIndex} is inactive and should not be clickable.`
      );
      return; // Exit the function if the planet should not be clickable
    }

    var planetContent = setup.showPlanet(planetIndex);
    var scenarioData = setup.showRandomIncompleteScenario();
    var scenarioContent = scenarioData.content;
    var passageContent = "";

    // Only render the passage if scenarioPassage is not null
    if (scenarioData.scenarioPassage) {
      passageContent = story.render(scenarioData.scenarioPassage);
      story.state.currentScenario = scenarioData.scenarioPassage;
    } else {
      console.error("scenarioPassage is null for scenario", scenarioData);
    }

    var mapScreen = document.getElementById("mapScreen");
    var passageContainer = document.getElementById("passageContainer");
    var passage = document.getElementById("passage");
    var planetContentContainer = document.getElementById("planetContent");
    var hud = document.getElementById("hud");

    if (mapScreen) mapScreen.style.display = "none";
    if (hud) hud.style.display = "flex";
    if (passageContainer) {
      passage.innerHTML = passageContent;
      if (planetContentContainer) {
        planetContentContainer.innerHTML = planetContent;
      }
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

  story.state.currentPlanet = null;
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

setup.planetClickHandlers = {};

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
        if (planet.availableTurns.includes(story.state.turn)) {
          img.classList.add("active-turn");

          // Check if a click handler already exists and remove it before adding a new one
          if (setup.planetClickHandlers[planet.id]) {
            img.removeEventListener(
              "click",
              setup.planetClickHandlers[planet.id]
            );
          }

          // Create a new click handler for the planet
          const clickHandler = setup.handlePlanetClick(index);
          setup.planetClickHandlers[planet.id] = clickHandler;
          img.addEventListener("click", clickHandler);
        }
        planetContainer.appendChild(img);
        setup.appendTooltip(planet, planetContainer);
        mapScreen.appendChild(planetContainer);
        checkAllPlanetsLoaded(++loadedPlanets, totalPlanets);
      };
    });

    // Check if there is a player's planet and display it
    if (story.state.playerPlanet) {
      const playerPlanetContainer = document.createElement("div");
      playerPlanetContainer.className =
        "planet-container planet-container-player";
      const playerPlanetImg = document.createElement("img");
      playerPlanetImg.className = "planet planet-player";
      playerPlanetImg.src = story.state.playerPlanet.imgSrc;

      playerPlanetImg.onload = function () {
        // Logic for player planet click
        playerPlanetImg.addEventListener("click", function () {
          setup.renderPlanetPassage("player"); // Assuming this is the correct way to render the player's planet
          setup.toggleHUD(true);
        });
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

  if (incompleteScenarios.length === 0) {
    document.querySelectorAll(".planet").forEach(function (planet) {
      console.log("Getting planets…");
      planet.style.pointerEvents = "none";
      planet.classList.add("inactive");
    });
    var message = document.createElement("div");
    message.textContent = "All scenarios complete.";

    // Tailwind CSS classes to center the message
    message.classList.add("next-turn-message");

    message.onclick = setup.startNewTurn;
    document.body.appendChild(message);
  }
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

setup.completeScenario = function () {
  var currentScenario = story.state.currentScenario;
  const scenario = setup.game.scenarios.find(
    (s) => s.scenarioPassage === currentScenario
  );

  if (scenario && !story.state.scenarioCompletedThisTurn) {
    var currentPlanet = setup.game.planets[story.state.currentPlanet];
    scenario.complete = true;
    story.state.scenarioCompletedThisTurn = true;

    document
      .querySelectorAll(".planet")
      .forEach(function (planetElement, index) {
        planetElement.classList.remove("active-turn");
        planetElement.classList.add("inactive");
        const clickHandler = setup.planetClickHandlers[index];
        if (clickHandler) {
          planetElement.removeEventListener("click", clickHandler);
        }
      });

    if (currentPlanet) {
      currentPlanet.connections++;
    } else {
      console.error("currentPlanet is undefined or not found");
    }

    setup.startNewTurn();
  }

  story.checkpoint("Completed " + currentScenario);
  story.show("Map Screen");
};

setup.startNewTurn = function () {
  // Increment the turn counter in the story's state
  story.state.turn += 1;
  // Reset the scenario completion flag for the new turn in the story's state
  story.state.scenarioCompletedThisTurn = false;

  // Re-enable interaction with the planets for the new turn
  document.querySelectorAll(".planet").forEach(function (planetElement, index) {
    planetElement.classList.remove("inactive");
    planetElement.classList.add("active-turn");

    // Reattach the event listener using the stored handler
    const clickHandler = setup.planetClickHandlers[index];
    if (clickHandler) {
      planetElement.addEventListener("click", clickHandler);
    }
  });

  // Update the turn display, if you have one
  const turnCounterElement = document.getElementById("turnCounter");
  if (turnCounterElement) {
    turnCounterElement.innerText = `Turn: ${story.state.turn}`;
  }

  // Re-render the map screen to reflect any changes
  setup.showMap();

  // Save the game state at the start of a new turn
  story.checkpoint();
};

setup.handlePlanetClick = function (planetIndex) {
  return function (event) {
    if (!story.state.scenarioCompletedThisTurn) {
      setup.renderPlanetPassage(planetIndex);
      setup.toggleHUD(true);
    } else {
      console.log("A scenario has already been completed this turn.");
    }
  };
};
setup.attachEventListenersToPlanets = function () {
  document.querySelectorAll(".planet").forEach((planetElement, index) => {
    // Ensure that the 'index' passed is correct, based on how you store your planets
    // It might be 'planet.id - 1' or another method to identify the specific planet data
    const planetIndex = planet.id; // or another way to get the index if necessary

    // Remove any previously attached handlers to avoid multiple assignments
    if (setup.planetClickHandlers[planetIndex]) {
      planetElement.removeEventListener(
        "click",
        setup.planetClickHandlers[planetIndex]
      );
    }

    // Create a new handler and attach it
    setup.planetClickHandlers[planetIndex] =
      setup.handlePlanetClick(planetIndex);
    planetElement.addEventListener(
      "click",
      setup.planetClickHandlers[planetIndex]
    );
  });
};
