window.setup = window.setup || {};

$(document).ready(function () {
  //this is for the device display at the start of the game
  // $(".passage").html("");

  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js");
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
        availableTurns: [1, 2, 6],
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
        availableTurns: [1, 5, 7],
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
        availableTurns: [2, 3, 6],
      },
      {
        id: 4,
        imgSrc: "img/planet-5.png",
        repImgSrc: "img/rep-5.png",
        splashImgSrc: "img/planet-5-splash.png",
        name: "Barkenberg",
        rep: "Spike (cat), Spook (raccoon), and Spark (dog) - (independent genders)",
        project:
          "Audio drama of their heists narrated (like War of the Worlds).",
        description:
          "Ghost pets who care. They will send you short videos of pets doing weird n cute things to cheer you up. Sometimes go full goblin mode. They love to cause mischief and mess with capitalism -- sneak into the Dominion Plantation and mess things up.",
        availableTurns: [2, 3, 5],
      },
    ],
  };

  story.state = {
    turn: 1,
    isCrisisTurn: false,
    helpedPlanets: setup.game.planets.map((planet) => ({
      planet: planet.id,
      timesHelped: 0,
    })),
    lastHelpedPlanet: null,
    scenarioCompletedThisTurn: false,
  };

  setup.game.scenarios = window.story.passages
    .filter(
      (passage) =>
        passage.tags.includes("scenario") && !passage.tags.includes("crisis")
    )
    .map((passage) => ({
      scenarioPassage: passage.name,
      complete: false,
    }));
  setup.game.crisisScenarios = window.story.passages
    .filter(
      (passage) =>
        passage.tags.includes("crisis") && passage.tags.includes("scenario")
    )
    .map((passage) => ({
      scenarioPassage: passage.name,
      complete: false,
    }));

  // this is demented, but it works
  // couldn't figure out how to override default behaviour of Twine's a tags

  $(document).on("click", "div[data-next]", function (e) {
    var passageName = $(this).attr("data-next");
    renderToSelector("#passage", passageName);
    setup.typewriter();
  });

  setup.startObserving = function () {
    var passageContainerNode = document.getElementById("passageContainer");
    var passageNode = document.getElementById("passage");

    if (passageContainerNode) {
      var containerConfig = { childList: true, subtree: true };
      var containerCallback = function (mutationsList, observer) {
        for (var mutation of mutationsList) {
          if (mutation.type === "childList") {
            setup.modifyLinks();
            break;
          }
        }
      };
      var containerObserver = new MutationObserver(containerCallback);
      containerObserver.observe(passageContainerNode, containerConfig);
    } else {
      setTimeout(setup.startObserving, 500);
    }

    if (passageNode) {
      var passageConfig = { childList: true, subtree: true };
      var passageCallback = function (mutationsList, observer) {
        for (var mutation of mutationsList) {
          if (mutation.type === "childList") {
            setup.modifyLinks();
            // console.log("A child node has been added or removed.");
            // setup.typewriter();
            break;
          }
        }
      };
      var passageObserver = new MutationObserver(passageCallback);
      passageObserver.observe(passageNode, passageConfig);
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    setup.startObserving();
  });

  setup.renderIntro = function () {
    setup.startObserving();
    $("body").fadeOut("4000", function () {
      setTimeout(function () {
        $("body").fadeIn("2000");
        story.show("Map Screen");
        var planetContent = setup.showPlanet(0);

        var passageContainer = document.getElementById("passageContainer");
        var hud = document.getElementById("hud");
        var backToMap = document.getElementById("backToMap");

        if (mapScreen) mapScreen.style.display = "none";
        if (hud) {
          hud.style.display = "flex";
          backToMap.style.display = "none";
        }
        if (passageContainer) {
          passageContainer.style.display = "block";
        }

        var introContent = story.render("Intro 3");
        var passage = document.getElementById("passage");
        if (passage) {
          setTimeout(function () {
            passage.innerHTML = introContent;
            setup.typewriter();
          }, 2000);
        }

        var planetContentContainer = document.getElementById("planetContent");
        if (planetContentContainer) {
          planetContentContainer.innerHTML = planetContent;
        }
      }, 1000);
    });
  };

  setup.savePlayerInfo = function () {
    var playerName = document.getElementById("playerName").value;
    var planetName = document.getElementById("planetName").value;
    var projectDescription =
      document.getElementById("projectDescription").value;

    var planetImgSrc = document.querySelector(
      'input[name="planetImage"]:checked'
    ).value;

    story.state.playerPlanet = {
      id: -1,
      name: planetName,
      description: projectDescription,
      imgSrc: planetImgSrc,
    };

    story.state.playerName = playerName;

    story.show("Intro");
  };

  setup.checkInputs = function () {
    var playerName = document.getElementById("playerName").value.trim();
    var planetName = document.getElementById("planetName").value.trim();
    var projectDescription = document
      .getElementById("projectDescription")
      .value.trim();

    var planetImage = document.querySelector(
      'input[name="planetImage"]:checked'
    )?.value;

    var nextButton = document.getElementById("nextButton");

    nextButton.disabled = !(
      playerName &&
      planetName &&
      projectDescription &&
      planetImage
    );
  };

  setup.showPlanet = function (planetIndex) {
    setup.startObserving();

    story.state.currentPlanet = planetIndex;
    const planet = setup.game.planets.find((p) => p.id === planetIndex);
    console.log("Showing planet:", planet);
    let content = planet.description;
    let repContent = `<img class='repImage' src='${planet.repImgSrc}' /><div class='repName'>${planet.rep}</div>`;
    var repContainer = document.getElementById("rep");

    var splashContainer = document.getElementById("planet-splash");
    splashContainer.style.backgroundImage = `url(${planet.splashImgSrc})`;
    splashContainer.innerHTML =
      "<h1 id='planetName'>" +
      planet.name +
      "</h1> <div id='planetContent' class='text-neutral-300 text-base'></div>";

    repContainer.innerHTML = repContent;

    return content;
  };

  setup.renderPlanetPassage = function (planetIndex) {
    setup.startObserving();
    console.log("Rendering passage for planet index:", planetIndex);

    if (story.state.scenarioCompletedThisTurn) {
      console.log("A scenario has already been completed this turn.");
      return;
    }

    try {
      const planetElementSelector = `.planet-container${planetIndex}`;
      const planetElement = document.querySelector(planetElementSelector);

      if (!planetElement) {
        throw new Error(
          `Element with selector "${planetElementSelector}" does not exist in the DOM.`
        );
      }

      var planetContent = setup.showPlanet(planetIndex);
      var passageContent = "";

      if (!planetElement.classList.contains("active-turn")) {
        console.log(planetElement.classList);
        console.log(`Planet with index ${planetIndex} is inactive.`);

        var inactiveTurnPassages = story.passages.filter(function (passage) {
          return passage.tags.includes("inactive-turn");
        });

        var selectedPassage =
          inactiveTurnPassages[
            Math.floor(Math.random() * inactiveTurnPassages.length)
          ];

        passageContent = story.render(selectedPassage.name);
      } else {
        console.log(`Planet with index ${planetIndex} is active.`);

        var scenarioData = setup.showRandomIncompleteScenario();

        if (scenarioData.scenarioPassage) {
          passageContent = story.render(scenarioData.scenarioPassage);
          story.state.currentScenario = scenarioData.scenarioPassage;
        } else {
          console.error("scenarioPassage is null for scenario", scenarioData);
        }
      }

      var mapScreen = document.getElementById("mapScreen");
      var passageContainer = document.getElementById("passageContainer");
      var passage = document.getElementById("passage");
      var planetContentContainer = document.getElementById("planetContent");
      var hud = document.getElementById("hud");
      var backToMap = document.getElementById("backToMap");

      if (mapScreen) mapScreen.style.display = "none";
      if (hud) {
        hud.style.display = "flex";
        backToMap.style.display = "block";
      }
      if (passageContainer) {
        passage.innerHTML = passageContent;
        setup.typewriter();

        if (planetContentContainer) {
          planetContentContainer.innerHTML = planetContent;
        }
        passageContainer.style.display = "block";
      }
    } catch (error) {
      console.error("Error in renderPlanetPassage:", error);
    }
  };
  setup.renderCrisisPassage = function (planetIndex, scenarioPassage) {
    setup.startObserving();

    var planetContent = setup.showPlanet(planetIndex); // Display planet info
    var passageContent = story.render(scenarioPassage); // Render crisis passage
    var passageContainer = document.getElementById("passageContainer");
    var planetContentContainer = document.getElementById("planetContent");
    var passage = document.getElementById("passage");

    if (passageContainer) {
      passage.innerHTML = passageContent;
      setup.typewriter();

      if (planetContentContainer) {
        planetContentContainer.innerHTML = planetContent; // Set planet content
      }

      passageContainer.style.display = "block";
    }
  };

  setup.returnToMap = function () {
    var hud = document.getElementById("hud");
    var mapScreen = document.getElementById("mapScreen");
    var passage = document.getElementById("passage");

    var splashContainer = document.getElementById("planet-splash");
    var repContainer = document.getElementById("rep");

    if (splashContainer) {
      splashContainer.style.backgroundImage = "";
      splashContainer.innerHTML = "";
    }

    if (repContainer) {
      repContainer.innerHTML = "";
    }

    if (hud) hud.style.display = "none";
    if (mapScreen) mapScreen.style.display = "grid";
    if (passageContainer)
      passageContainer.innerHTML = "<div id='passage'></div>";

    story.state.currentPlanet = null;

    if (hud) hud.classList.remove("player-screen");
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

      setup.game.planets.forEach((planet) => {
        const planetContainer = document.createElement("div");
        planetContainer.className = `planet-container planet-container${planet.id}`;

        const img = document.createElement("img");
        img.className = `planet planet${planet.id}`;
        img.src = planet.imgSrc;

        const isActiveThisTurn =
          planet.availableTurns.includes(story.state.turn) ||
          (story.state.isCrisisTurn &&
            story.state.crisisOfferingPlanets.includes(planet.id));

        if (isActiveThisTurn) {
          planetContainer.classList.add("active-turn");
          const clickHandler = setup.handlePlanetClick(planet.id);
          setup.planetClickHandlers[planet.id] = clickHandler;
          img.addEventListener("click", clickHandler);
        } else {
          img.addEventListener(
            "click",
            setup.handleInactivePlanetClick(planet.id)
          );
        }

        // Logic for crisis turns
        if (story.state.isCrisisTurn) {
          const mapScreen = document.getElementById("mapScreen");
          $("body").addClass("crisis");
        } else {
          $("body").removeClass("crisis");
          const hasBeenHelped = story.state.helpedPlanets.some(
            (helpedPlanet) =>
              helpedPlanet.planet === planet.id && helpedPlanet.timesHelped > 0
          );

          if (hasBeenHelped) {
            const circleContainer = document.createElement("div");
            circleContainer.className = "circle-container";
            const circle = document.createElement("div");
            circle.className = "circle";
            circleContainer.appendChild(circle);
            planetContainer.appendChild(circleContainer);
          }
        }

        planetContainer.appendChild(img);
        setup.appendTooltip(planet, planetContainer);
        mapScreen.appendChild(planetContainer);
        checkAllPlanetsLoaded(++loadedPlanets, totalPlanets);
      });
      if (story.state.playerPlanet) {
        const playerPlanet = story.state.playerPlanet;
        const playerPlanetContainer = document.createElement("div");
        playerPlanetContainer.className = `planet-container planet-container-player`;

        const img = document.createElement("img");
        img.className = `planet player-planet`;
        img.src = playerPlanet.imgSrc;

        // const clickHandler = setup.handlePlanetClick(-1);
        // img.addEventListener("click", clickHandler);
        img.addEventListener("click", setup.handlePlayerPlanetClick);

        playerPlanetContainer.appendChild(img);
        setup.appendTooltip(playerPlanet, playerPlanetContainer);
        mapScreen.appendChild(playerPlanetContainer);
      }
    }

    var playerContent = "";
    setup.game.planets.forEach(function (planet) {
      var helpedTimes =
        story.state.helpedPlanets.find((p) => p.planet === planet.id)
          ?.timesHelped || 0;
      playerContent +=
        "<p>" + planet.name + ":<br>" + "❤️".repeat(helpedTimes) + "</p>";
    });

    document.getElementById("playerInfo").innerHTML = playerContent;
  };

  function checkAllPlanetsLoaded(loaded, total) {
    if (loaded === total) {
      setup.checkForIncompleteScenarios();
    }
  }

  setup.renderPlayerPlanetPassage = function () {
    story.state.currentPlanet = -1;
    var passage = document.getElementById("passage");
    var passageContent = "<h2>" + story.state.playerName + "'s Project</h2>";
    passageContent += "<p>" + story.state.playerPlanet.description + "</p>";
    passage.innerHTML = passageContent;

    var hud = document.getElementById("hud");
    if (hud) hud.classList.add("player-screen");
    document
      .getElementById("planet-splash")
      .addEventListener("click", function () {
        if (story.state.currentPlanet === -1) {
          setup.returnToMap();
        }
      });
  };

  setup.checkForIncompleteScenarios = function () {
    var incompleteScenarios = setup.game.scenarios.filter(function (scenario) {
      return !scenario.complete;
    });

    if (incompleteScenarios.length === 0) {
      document.querySelectorAll(".planet").forEach(function (planet) {
        planet.style.pointerEvents = "none";
        planet.classList.add("inactive");
      });
      var message = document.createElement("div");
      message.textContent = "All scenarios complete.";

      message.classList.add("next-turn-message");

      message.onclick = setup.startNewTurn;
      document.body.appendChild(message);
    }
  };

  setup.appendTooltip = (planet, container) => {
    const tooltipDiv = document.createElement("div");
    tooltipDiv.className = "tooltip";
    tooltipDiv.innerText = planet.name;
    tooltipDiv.style.visibility = "hidden";
    tooltipDiv.style.opacity = "0";
    tooltipDiv.style.transition =
      "visibility 0s linear 0.5s, opacity 0.5s linear";
    container.appendChild(tooltipDiv);

    container.onmouseover = function () {
      tooltipDiv.style.visibility = "visible";
      tooltipDiv.style.opacity = "1";
      tooltipDiv.style.transitionDelay = "0s";
    };

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
          passage.innerHTML = "";
        }
      }
    } else {
      console.error("HUD element not found");
    }
  };
  setup.updateEnergyBar = function () {
    var energyBar = document.querySelector(".energy-bar");
    if (energyBar) {
      var newWidth = (setup.game.energy / 700) * 100;
      newWidth = Math.min(Math.max(newWidth, 0), 100);
      energyBar.style.width = newWidth + "%";
    } else {
      console.error("Energy bar element not found");
    }
  };
  setup.helpPlanet = function (planetId) {
    const planetHelped = story.state.helpedPlanets.find(
      (p) => p.planet === planetId
    );
    story.state.lastHelpedPlanet = planetHelped;
    console.log("Just helped a planet", planetHelped);
    if (planetHelped) {
      planetHelped.timesHelped += 1;
    } else {
      story.state.helpedPlanets.push({ planet: planetId, timesHelped: 1 });
    }
  };

  setup.completeScenario = function () {
    var planetIndex = story.state.currentPlanet;
    const planet = setup.game.planets.find((p) => p.id === planetIndex);
    var currentScenario = story.state.currentScenario;

    const scenario = setup.game.scenarios.find(
      (s) => s.scenarioPassage === currentScenario
    );

    if (scenario && !story.state.scenarioCompletedThisTurn) {
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

      if (planet) {
        planet.connections++;

        setup.helpPlanet(planet.id);
      } else {
        console.error("currentPlanet is undefined or not found");
      }

      setup.startNewTurn();
    }

    story.checkpoint("Completed " + currentScenario);
    story.show("Map Screen");
  };

  setup.startNewTurn = function () {
    story.state.turn += 1;
    story.state.scenarioCompletedThisTurn = false;
    story.state.isCrisisTurn = story.state.turn === 4 || story.state.turn === 7;

    story.state.crisisOfferingPlanets = [];

    if (story.state.isCrisisTurn) {
      story.state.crisisScenariosForTurn = setup.game.crisisScenarios.filter(
        (scenario) =>
          scenario.scenarioPassage.startsWith("Week " + story.state.turn)
      );

      const shuffledPlanets = setup.game.planets.sort(
        () => 0.5 - Math.random()
      );
      const offeringPlanets = shuffledPlanets
        .slice(0, 3)
        .map((planet) => planet.id);
      story.state.crisisOfferingPlanets = offeringPlanets;
      console.log("Crisis offering planet IDs:", offeringPlanets);
    }

    setup.updatePlanetsAndTurnCounter();
    setTimeout(setup.showWeekPreamble, 0);
  };
  setup.updatePlanetsAndTurnCounter = function () {
    document
      .querySelectorAll(".planet")
      .forEach(function (planetElement, index) {
        planetElement.classList.remove("inactive");

        if (
          story.state.isCrisisTurn &&
          !story.state.crisisOfferingPlanets.includes(index)
        ) {
          // Do not add "active-turn" class if it's a crisis turn and the planet is not offering help
          planetElement.classList.remove("active-turn");
        } else {
          // Add "active-turn" class on regular turns or if the planet is offering help on a crisis turn
          planetElement.classList.add("active-turn");
        }

        const clickHandler = setup.planetClickHandlers[index];
        if (clickHandler) {
          planetElement.addEventListener("click", clickHandler);
        }
      });

    const turnCounterElement = document.getElementById("turnCounter");
    if (turnCounterElement) {
      turnCounterElement.innerText = `Turn: ${story.state.turn}`;
    }
  };

  setup.showWeekPreamble = function () {
    const modal = document.getElementById("weekPreamble");
    const overlay = document.getElementById("overlay");
    const modalContent = document.getElementById("modalContent");
    const turnNumber = story.state.turn;
    const passageTitle = "Week " + turnNumber;
    const targetPassage = window.story.passages.find(
      (passage) =>
        passage &&
        passage.name === passageTitle &&
        passage.tags.includes("preamble")
    );

    if (targetPassage) {
      renderToSelector(modalContent, targetPassage.name);
      // if it's a crisis turn, use setup.typewriter()
      if (story.state.isCrisisTurn) {
        setup.typewriter();
        modal.style.display = "flex";
      } else {
        modal.style.display = "block";
      }
      overlay.classList.remove("hidden");
    } else {
      console.error("No content found for passage: " + passageTitle);
    }
  };

  setup.hideWeekPreamble = function () {
    const modal = document.getElementById("weekPreamble");
    const overlay = document.getElementById("overlay");
    if (modal) {
      modal.style.display = "none";
      overlay.classList.add("hidden");
    }
  };

  setup.handlePlanetClick = function (planetIndex) {
    return function () {
      console.log("Clicked Planet Index:", planetIndex);
      if (!story.state.scenarioCompletedThisTurn) {
        if (
          story.state.isCrisisTurn &&
          story.state.crisisOfferingPlanets.includes(planetIndex)
        ) {
          const crisisScenario = either(story.state.crisisScenariosForTurn);
          if (crisisScenario) {
            setup.renderCrisisPassage(
              planetIndex,
              crisisScenario.scenarioPassage
            );
          } else {
            console.error("No crisis scenario available for this turn.");
          }
        } else if (!story.state.isCrisisTurn) {
          setup.renderPlanetPassage(planetIndex);
        }
        setup.toggleHUD(true);
      } else {
        console.log("A scenario has already been completed this turn.");
      }
    };
  };
  setup.handleInactivePlanetClick = function (planetIndex) {
    return function () {
      console.log("Clicked on an inactive planet");

      var inactiveTurnPassages = story.passages.filter(function (passage) {
        return passage.tags.includes("inactive-turn");
      });

      var selectedPassage =
        inactiveTurnPassages[
          Math.floor(Math.random() * inactiveTurnPassages.length)
        ];

      setup.renderPlanetPassage(planetIndex, selectedPassage.name);

      // Show the HUD
      setup.toggleHUD(true);
    };
  };
  setup.handlePlayerPlanetClick = function () {
    console.log("Player's planet clicked");
    setup.renderPlayerPlanetPassage();
    setup.toggleHUD(true);
    story.state.currentPlanet = -1;
  };

  setup.attachEventListenersToPlanets = function () {
    document.querySelectorAll(".planet").forEach((planetElement, index) => {
      const planetIndex = planet.id;
      if (setup.planetClickHandlers[planetIndex]) {
        planetElement.removeEventListener(
          "click",
          setup.planetClickHandlers[planetIndex]
        );
      }
      setup.planetClickHandlers[planetIndex] =
        setup.handlePlanetClick(planetIndex);
      planetElement.addEventListener(
        "click",
        setup.planetClickHandlers[planetIndex]
      );
    });
  };
  setup.getPlanet = function (planetId) {
    const planet = setup.game.planets.find((p) => p.id === planetId);
    return planet ? planet.name : null;
  };

  var split;

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space" && split) {
      split.revert();
      gsap.to(split.words, { autoAlpha: 1, duration: 0 });
      gsap.to(split.chars, { autoAlpha: 1, duration: 0 });
    }
  });

  $("#startButton").on("click", function () {
    $("body").fadeOut("4000", function () {
      setTimeout(function () {
        $("body").fadeIn("2000");
        story.show("A");
      }, 1000);
    });
  });

  setup.typewriter = function () {
    var passage = $("#passage");
    if (passage) {
      split = new SplitText("#passage", {
        type: "words",
      });
      gsap.from(split.words, {
        autoAlpha: 0,
        ease: "power3",
        stagger: 0.1,
      });
    }
  };

  setup.deviceTextAnimation = function () {
    var passage = $(".device");
    if (passage) {
      split = new SplitText(passage, {
        type: "chars, words",
      });
      gsap.from(split.chars, {
        autoAlpha: 0,
        ease: "power1",
        stagger: 0.01,
      });
    }
  };
});

setup.modifyLinks = function () {
  $("a[data-passage]").each(function () {
    var $this = $(this);
    var passageName = $this.attr("data-passage");
    var text = $this.text();
    var newDiv = $('<div data-next="' + passageName + '"></div>').text(text);
    $this.replaceWith(newDiv);
  });
};

$(window).on("sm.passage.shown", function (event, eventObject) {
  story.state.currentPassage = eventObject.passage;
  var currentPassage = eventObject.passage;
  var passageContainer = $("tw-passage.passage");
  // Device overlay
  // stuff for device wrapper
  passageContainer.find(".device-wrapper").remove();
  if (currentPassage.tags.includes("device-overlay")) {
    var outerWrapper = $('<div class="device-wrapper"></div>');
    var innerWrapper = $('<div class="device"></div>');
    passageContainer.contents().appendTo(innerWrapper);
    innerWrapper.appendTo(outerWrapper);
    passageContainer.prepend(outerWrapper);
    setTimeout(setup.deviceTextAnimation, 1);
  }
  // for passages that fade in
  passageContainer.prepend("<div class='fade-overlay'></div>");
});

// $(".passage").on("click", "a[data-passage]", function (e) {
//   console.log(story.state);
//   $(".passage").off("click", "a[data-passage]");
//   if (story.state.currentPassage !== "A") return;

//   var destination = $(e.target).closest("a[data-passage]").data("passage");
//   $(".passage").fadeOut("fast", function () {
//     story.show(destination);
//     $(".passage").fadeIn("fast");
//   });

//   e.stopPropagation();
// });
