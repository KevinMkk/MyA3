// let map;
// let markers = [];
// let selectedScene = null;
// let unityInstance = null;

// const DEFAULT_SCENE = "Env1";

// // =========================================
// // TELEPORT MODE
// // true  = instant teleport
// // false = directions only
// // =========================================
// let teleportMode = false;

// let playerFacing = "north"; // default fallback

// const CLOUD_DIRECTIONS = {

//     "Ts'ehlanyane": "south",
//     "Bokong": "west",
//     "Afriski": "east"
// };

// let currentVoice = null;
// let voiceEnabled = true;

// const locationNarration = {

//     "Bokong": `
// Welcome to Bokong Nature Reserve.

// Nestled in the highlands of Lesotho, Bokong Nature Reserve sits dramatically along the edge of the Maloti Mountains, overlooking the breathtaking Lepaqoa Valley. Established to protect the unique alpine wetlands of the region, Bokong is known for its pristine ecosystems, cascading waterfalls, and rare high-altitude flora and fauna.

// The reserve is especially famous for the Lepaqoa Waterfall, which in winter transforms into a striking frozen column of ice—one of the most iconic natural sights in Lesotho. Its rugged landscapes and clean mountain air make it a sanctuary for hikers, nature lovers, and anyone seeking quiet isolation in a truly untouched environment.

// Enjoy your virtual exploration and stay.
//     `,

//     "Ts'ehlanyane": `
// Welcome to Ts’ehlanyane National Park.

// Deep within the Maloti Mountains lies Ts'ehlanyane National Park, one of Lesotho’s most biologically rich and scenic protected areas. Established in 1992 to preserve one of the last remaining indigenous montane forests in the region, the park is named after the Ts’ehlanyane plant, a type of wild river cabbage found along its streams.

// The park is characterized by lush valleys, crystal-clear rivers, and ancient forest canopies. It is also home to rare wildlife, including bush pigs, baboons, and a variety of bird species.

// Enjoy your virtual exploration and stay.
//     `,

//     "Afriski": `
// Welcome to Afriski Mountain Resort.

// High in the Maloti-Drakensberg range, Afriski Mountain Resort is one of Southern Africa’s premier year-round mountain destinations. Opened in 2005, it is one of the few ski resorts on the African continent.

// During winter, Afriski becomes a hub for skiing and snowboarding, while in summer it transforms into a destination for mountain biking, hiking, and music festivals.

// Enjoy your virtual exploration and stay.
//     `
// };

// function stopNarration() {

//     if (currentVoice) {
//         window.speechSynthesis.cancel();
//         currentVoice = null;
//     }
// }

// function speakNarration(text) {

//     if (!voiceEnabled) return;

//     stopNarration();

//     const utterance = new SpeechSynthesisUtterance(text);

//     utterance.rate = 1;
//     utterance.pitch = 1;
//     utterance.volume = 1;

//     // optional: choose a natural voice if available
//     const voices = window.speechSynthesis.getVoices();
//     if (voices.length > 0) {
//         utterance.voice = voices[0];
//     }

//     currentVoice = utterance;

//     window.speechSynthesis.speak(utterance);
// }

// // =========================================
// // UNITY READY
// // =========================================
// function setUnityInstance(instance) {
//     unityInstance = instance;
//     window.unityInstanceGlobal = instance;

//     console.log("🟢 Unity READY");

//     if (selectedScene) {
//         sendToUnity(selectedScene);
//     }
// }

// // =========================================
// // MAP INIT
// // =========================================
// function initMap() {

//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: -29.45, lng: 28.25 },
//         zoom: 8,
//         mapTypeId: "terrain"
//     });

//     console.log("🗺 Map READY");

//     createMarkers();
// }

// // =========================================
// // LOCATIONS
// // =========================================
// function createMarkers() {

//     const locations = [

//         {
//             name: "Ts'ehlanyane National Park",
//             lat: -29.321581,
//             lng: 28.114089,
//             scene: `Ts'ehlanyane`,
//             info: "Mountain forest reserve with hiking trails."
//         },

//         {
//             name: "Bokong Nature Reserve",
//             lat: -29.069382,
//             lng: 28.426035,
//             scene: "Bokong",
//             info: "Highlands reserve near Lepaqoa waterfall."
//         },

//         {
//             name: "Afriski",
//             lat: -28.820391,
//             lng: 28.727242,
//             scene: "Afriski",
//             info: "Mountain resort known for skiing and adventure tourism."
//         }
//     ];

//     locations.forEach(loc => {

//         const marker = new google.maps.Marker({
//             position: {
//                 lat: loc.lat,
//                 lng: loc.lng
//             },
//             map: map,
//             title: loc.name
//         });

//         const infoWindow = new google.maps.InfoWindow({
//             content: `
//                 <div style="color:black;">
//                     <h3>${loc.name}</h3>
//                     <p>${loc.info}</p>

//                     <button 
//                         class="select-btn"
//                         data-scene="${loc.scene}"
//                         data-name="${loc.name}">
//                         Select
//                     </button>
//                 </div>
//             `
//         });

//         marker.addListener("click", () => {

//             infoWindow.open(map, marker);

//             google.maps.event.addListenerOnce(infoWindow, "domready", () => {

//                 document.querySelectorAll(".select-btn").forEach(btn => {

//                     btn.onclick = () => {

//                         handleLocationSelection(
//                             btn.dataset.scene,
//                             btn.dataset.name
//                         );
//                     };
//                 });
//             });
//         });

//         markers.push(marker);
//     });

//     console.log("📍 Markers created:", markers.length);
// }

// // =========================================
// // LOCATION SELECTED
// // =========================================
// function handleLocationSelection(sceneName, locationName) {

//     console.log("🎯 Selected:", locationName);

//     // =====================================================
//     // DETERMINE DIRECTION RELATIVE TO START
//     // (based on your design: west/south/east)
//     // =====================================================

//     let directionText = "";

//     switch (sceneName) {

//         case "Bokong":
//             directionText = "WEST → Fly into the western clouds";
//             break;

//         case "Ts'ehlanyane":
//             directionText = "SOUTH → Move into the southern cloud layer";
//             break;

//         case "Afriski":
//             directionText = "EAST → Fly toward the eastern sky islands";
//             break;

//         default:
//             directionText = "Follow cloud path to destination";
//             break;
//     }

//     // =====================================================
//     // TELEPORT MODE
//     // =====================================================
//     if (teleportMode) {

//         console.log("🚀 Teleport Mode ON");

//         selectedScene = sceneName;

//         document.getElementById("directionBox").innerHTML =
//             "Arrived: <b>" + locationName + "</b><br><br>" +
//             "Press M to close the map.<br>" +
//             "Press T to return to start.";

//         sendToUnity(sceneName);

//     }

//     // =====================================================
//     // DIRECTION MODE (DEFAULT)
//     // =====================================================
//     else {

//         console.log("🧭 Direction Mode ON");

//         document.getElementById("directionBox").innerHTML =
//             "<b>" + locationName + "</b><br><br>" +
//             directionText + "<br><br>" +
//             "Start position facing determines relative navigation in clouds.";
//     }

//     if (locationNarration[sceneName]) {
//         speakNarration(locationNarration[sceneName]);
//     }
// }

// // =========================================
// // SEND TO UNITY
// // =========================================
// function sendToUnity(sceneName) {

//     stopNarration();

//     if (unityInstance && unityInstance.SendMessage) {

//         unityInstance.SendMessage(
//             "SceneController",
//             "ReceiveSceneFromJS",
//             sceneName
//         );

//         console.log("✅ Sent to Unity:", sceneName);

//     } else {

//         console.warn("⚠ Unity not ready");

//         selectedScene = sceneName;
//     }
// }

// // =========================================
// // TOGGLE MODE
// // =========================================
// function toggleTeleportMode() {

//     teleportMode = !teleportMode;

//     const btn = document.getElementById("modeButton");

//     if (teleportMode) {

//         btn.innerText = "Mode: Instant Teleport";

//     } else {

//         btn.innerText = "Mode: Directions Only";
//     }
// }

// // =========================================
// // MAP UI
// // =========================================
// function showMap() {
//     document.getElementById("mapOverlay").style.display = "flex";
// }

// function hideMap() {
//     document.getElementById("mapOverlay").style.display = "none";
// }

// // =========================================
// // GLOBALS
// // =========================================
// window.setUnityInstance = setUnityInstance;
// window.ShowMap = showMap;
// window.HideMap = hideMap;
// window.toggleTeleportMode = toggleTeleportMode;
// window.handleLocationSelection = handleLocationSelection;
let map;
let markers = [];
let selectedScene = null;
let unityInstance = null;

const DEFAULT_SCENE = "Env1";

// =========================================
// TELEPORT MODE
// =========================================
let teleportMode = false;

// Player reference direction (future expansion)
let playerFacing = "north";

// Cloud direction system (your world design)
const CLOUD_DIRECTIONS = {
    "Ts'ehlanyane": "south",
    "Bokong": "west",
    "Afriski": "east"
};

// =========================================
// SPEECH SYSTEM
// =========================================
let currentVoice = null;
let voiceEnabled = true;

const locationNarration = {

    "Bokong": `
Welcome to Bokong Nature Reserve

Nestled in the highlands of Lesotho, Bokong Nature Reserve sits dramatically along the edge of the Maloti Mountains, overlooking the breathtaking Lepaqoa Valley. Established to protect the unique alpine wetlands of the region, Bokong is known for its pristine ecosystems, cascading waterfalls, and rare high-altitude flora and fauna.

The reserve is especially famous for the Lepaqoa Waterfall, which in winter transforms into a striking frozen column of ice—one of the most iconic natural sights in Lesotho. Its rugged landscapes and clean mountain air make it a sanctuary for hikers, nature lovers, and anyone seeking quiet isolation in a truly untouched environment.

Enjoy your virtual exploration and stay.
    `,

    "Ts'ehlanyane": `
Welcome to Ts’ehlanyane National Park

Deep within the Maloti Mountains lies Ts'ehlanyane National Park, one of Lesotho’s most biologically rich and scenic protected areas. Established in 1992 to preserve one of the last remaining indigenous montane forests in the region, the park is named after the Ts’ehlanyane plant, a type of wild river cabbage found along its streams.

The park is characterized by lush valleys, crystal-clear rivers, and ancient forest canopies—an unusual contrast to Lesotho’s typically rugged alpine terrain. It is also home to rare wildlife, including bush pigs, baboons, and a variety of bird species, making it a haven for eco-tourism and hiking adventures.

Enjoy your virtual exploration and stay.
    `,

    "Afriski": `
Welcome to Afriski Mountain Resort

High in the Maloti-Drakensberg range, Afriski Mountain Resort is one of Southern Africa’s premier year-round mountain destinations. Opened in 2005, it is one of the few ski resorts on the African continent, designed to bring winter sports culture to Lesotho’s snowy peaks.

During winter, Afriski becomes a hub for skiing and snowboarding, while in summer it transforms into a vibrant destination for mountain biking, hiking, and music festivals. Its unique position as a high-altitude resort makes it a rare blend of adventure, recreation, and scenic beauty.

Enjoy your virtual exploration and stay.
    `
};

// =========================================
// SPEECH CONTROL
// =========================================
function stopNarration() {

    if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
    }

    currentVoice = null;
}

function speakNarration(text) {

    if (!voiceEnabled) return;

    stopNarration();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        utterance.voice = voices[0];
    }

    currentVoice = utterance;
    speechSynthesis.speak(utterance);
}

// =========================================
// STOP SPEECH ON "T" (TELEPORT AWAY)
// =========================================
document.addEventListener("keydown", (e) => {

    if (e.key.toLowerCase() === "t") {

        console.log("↩ Teleport away (T pressed)");
        stopNarration();
    }
});

// =========================================
// UNITY READY
// =========================================
function setUnityInstance(instance) {

    unityInstance = instance;
    window.unityInstanceGlobal = instance;

    console.log("🟢 Unity READY");

    if (selectedScene) {
        sendToUnity(selectedScene);
    }
}

// =========================================
// MAP INIT
// =========================================
function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {

        center: { lat: -29.45, lng: 28.25 },
        zoom: 8,
        mapTypeId: "terrain"
    });

    console.log("🗺 Map READY");

    createMarkers();
}

// =========================================
// LOCATIONS
// =========================================
function createMarkers() {

    const locations = [

        {
            name: "Ts'ehlanyane National Park",
            lat: -29.321581,
            lng: 28.114089,
            scene: "Ts'ehlanyane",
            info: "Mountain forest reserve with rivers and wildlife."
        },

        {
            name: "Bokong Nature Reserve",
            lat: -29.069382,
            lng: 28.426035,
            scene: "Bokong",
            info: "Highlands reserve near Lepaqoa waterfall."
        },

        {
            name: "Afriski",
            lat: -28.820391,
            lng: 28.727242,
            scene: "Afriski",
            info: "Mountain resort for skiing and adventure."
        }
    ];

    locations.forEach(loc => {

        const marker = new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            map: map,
            title: loc.name
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="color:black;">
                    <h3>${loc.name}</h3>
                    <p>${loc.info}</p>

                    <button class="select-btn"
                        data-scene="${loc.scene}"
                        data-name="${loc.name}">
                        Select
                    </button>
                </div>
            `
        });

        marker.addListener("click", () => {

            infoWindow.open(map, marker);

            google.maps.event.addListenerOnce(infoWindow, "domready", () => {

                document.querySelectorAll(".select-btn").forEach(btn => {

                    btn.onclick = () => {

                        handleLocationSelection(
                            btn.dataset.scene,
                            btn.dataset.name
                        );
                    };
                });
            });
        });

        markers.push(marker);
    });
}

// =========================================
// LOCATION SELECTION
// =========================================
function handleLocationSelection(sceneName, locationName) {

    console.log("🎯 Selected:", locationName);

    // stop previous narration immediately
    stopNarration();

    let directionText = "";

    switch (sceneName) {

        case "Bokong":
            directionText = "WEST → Fly into the western cloud path";
            break;

        case "Ts'ehlanyane":
            directionText = "SOUTH → Move into the southern clouds";
            break;

        case "Afriski":
            directionText = "EAST → Head into the eastern sky route";
            break;

        default:
            directionText = "Follow cloud path to destination";
            break;
    }

    // =========================================
    // TELEPORT MODE
    // =========================================
    if (teleportMode) {

        selectedScene = sceneName;

        document.getElementById("directionBox").innerHTML =
            "Arrived at <b>" + locationName + "</b><br><br>" +
            "Press T to return to start";

        sendToUnity(sceneName);

    }

    // =========================================
    // DIRECTION MODE
    // =========================================
    else {

        document.getElementById("directionBox").innerHTML =
            "<b>" + locationName + "</b><br><br>" +
            directionText + "<br><br>" +
            "Use clouds as navigation guide.";
    }

    // start narration
    if (locationNarration[sceneName]) {
        speakNarration(locationNarration[sceneName]);
    }
}

// =========================================
// SEND TO UNITY
// =========================================
function sendToUnity(sceneName) {

    stopNarration();

    if (unityInstance && unityInstance.SendMessage) {

        unityInstance.SendMessage(
            "SceneController",
            "ReceiveSceneFromJS",
            sceneName
        );

        console.log("✅ Sent to Unity:", sceneName);

    } else {

        selectedScene = sceneName;
    }
}

// =========================================
// TOGGLE MODE
// =========================================
function toggleTeleportMode() {

    teleportMode = !teleportMode;

    const btn = document.getElementById("modeButton");

    btn.innerText = teleportMode
        ? "Mode: Instant Teleport"
        : "Mode: Directions Only";
}

// =========================================
// MAP UI
// =========================================
function showMap() {
    document.getElementById("mapOverlay").style.display = "flex";
}

function hideMap() {
    document.getElementById("mapOverlay").style.display = "none";
}

// =========================================
// GLOBAL EXPORTS
// =========================================
window.setUnityInstance = setUnityInstance;
window.ShowMap = showMap;
window.HideMap = hideMap;
window.toggleTeleportMode = toggleTeleportMode;
window.handleLocationSelection = handleLocationSelection;