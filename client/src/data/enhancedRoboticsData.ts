// Enhanced robotics activities with better variety and engagement
export const enhancedRoboticsActivities = {
  "6-11": [
    {
      id: "treasure-hunt-adventure",
      title: "🗺️ Treasure Hunt Adventure",
      description: "Help Captain RoboBeard find hidden treasure by programming your ship to navigate dangerous waters!",
      type: "adventure",
      difficulty: "easy",
      estimatedMinutes: 25,
      points: 150,
      ageGroup: "6-11",
      theme: "pirates",
      imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
      instructions: [
        { 
          step: 1, 
          text: "Study the treasure map and plan your route", 
          image: "treasure-map.svg",
          hint: "Look for the safest path avoiding the sea monsters!" 
        },
        { 
          step: 2, 
          text: "Drag 'Move Forward' and 'Turn' blocks to navigate", 
          image: "navigation-blocks.svg",
          hint: "Remember: 3 steps forward, turn right, then 2 more steps!" 
        },
        { 
          step: 3, 
          text: "Avoid the sea monsters and reach the treasure island", 
          image: "treasure-chest.svg",
          hint: "Watch out for the kraken in the northeast corner!" 
        }
      ],
      gameData: {
        mapSize: [8, 6],
        startPosition: [0, 0],
        treasurePosition: [7, 5],
        obstacles: [
          { pos: [2, 1], type: "sea_monster", name: "Kraken" },
          { pos: [4, 3], type: "whirlpool", name: "Swirling Doom" },
          { pos: [6, 2], type: "rocks", name: "Sharp Rocks" }
        ],
        collectibles: [
          { pos: [3, 2], type: "coins", points: 50 },
          { pos: [5, 4], type: "compass", points: 75 }
        ],
        theme: {
          background: "ocean",
          playerSprite: "pirate_ship",
          sounds: ["wave_splash", "treasure_found", "cannon_fire"]
        }
      },
      learningObjectives: [
        "Sequential thinking and planning",
        "Spatial reasoning and navigation",
        "Problem-solving with constraints",
        "Understanding cause and effect"
      ],
      extensions: [
        "Add a second treasure location",
        "Program the ship to collect all coins first", 
        "Create weather challenges (storms that change the path)"
      ]
    },
    {
      id: "dance-party-robot",
      title: "🕺 Robot Dance Party",
      description: "Program your robot to perform amazing dance moves to the beat of different music styles!",
      type: "creative",
      difficulty: "easy",
      estimatedMinutes: 20,
      points: 120,
      ageGroup: "6-11", 
      theme: "music",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      instructions: [
        { 
          step: 1, 
          text: "Choose your favorite music style", 
          image: "music-selector.svg",
          hint: "Each style has different beats per minute!" 
        },
        { 
          step: 2, 
          text: "Combine dance moves with LED light patterns", 
          image: "dance-blocks.svg",
          hint: "Try 'Spin + Flash Red' for a dramatic effect!" 
        },
        { 
          step: 3, 
          text: "Create a full 30-second dance routine", 
          image: "performance-stage.svg",
          hint: "Don't forget the finale move - robots love to bow!" 
        }
      ],
      gameData: {
        musicStyles: [
          { name: "Pop", bpm: 120, color: "#FF6B9D" },
          { name: "Classical", bpm: 80, color: "#4ECDC4" },
          { name: "Hip-Hop", bpm: 100, color: "#45B7D1" },
          { name: "Electronic", bpm: 140, color: "#96CEB4" }
        ],
        danceMoves: [
          { name: "Spin Left", icon: "↺", duration: 2, difficulty: 1 },
          { name: "Spin Right", icon: "↻", duration: 2, difficulty: 1 },
          { name: "Wave Arms", icon: "🙌", duration: 3, difficulty: 2 },
          { name: "Robot Walk", icon: "🤖", duration: 4, difficulty: 2 },
          { name: "Jump", icon: "⬆️", duration: 1, difficulty: 3 },
          { name: "Freeze Pose", icon: "⏸️", duration: 2, difficulty: 1 }
        ],
        ledPatterns: [
          { name: "Rainbow Flash", code: "rainbow_flash", beats: 4 },
          { name: "Heartbeat", code: "heartbeat", beats: 2 },
          { name: "Disco Lights", code: "disco", beats: 8 },
          { name: "Strobe", code: "strobe", beats: 1 }
        ]
      },
      learningObjectives: [
        "Timing and rhythm concepts",
        "Pattern recognition and creation", 
        "Creative expression through code",
        "Understanding loops and repetition"
      ],
      extensions: [
        "Synchronize two robots for partner dancing",
        "Add sound effects with the buzzer",
        "Create audience reaction with light sensors"
      ]
    },
    {
      id: "pet-care-simulator",
      title: "🐕 Virtual Pet Care Center",
      description: "Program your robot to take care of adorable virtual pets - feed them, play with them, and keep them happy!",
      type: "simulation",
      difficulty: "medium",
      estimatedMinutes: 30,
      points: 180,
      ageGroup: "6-11",
      theme: "animals",
      imageUrl: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=250&fit=crop",
      instructions: [
        { 
          step: 1, 
          text: "Choose your pet and learn about its needs", 
          image: "pet-selection.svg",
          hint: "Cats need 3 meals a day, dogs need more exercise!" 
        },
        { 
          step: 2, 
          text: "Program feeding and play schedules", 
          image: "care-schedule.svg",
          hint: "Use 'If hungry then feed' blocks for smart care!" 
        },
        { 
          step: 3, 
          text: "Monitor happiness levels and adjust care", 
          image: "happiness-meter.svg",
          hint: "Happy pets glow green, sad pets flash red!" 
        }
      ],
      gameData: {
        pets: [
          { 
            name: "Robo-Puppy", 
            type: "dog",
            needs: { food: 3, play: 4, rest: 2 },
            personality: "energetic",
            sounds: ["woof", "happy_bark", "tired_whine"]
          },
          { 
            name: "Cyber-Kitty", 
            type: "cat", 
            needs: { food: 2, play: 2, rest: 4 },
            personality: "calm", 
            sounds: ["meow", "purr", "hiss"]
          },
          { 
            name: "Digital-Bunny", 
            type: "rabbit",
            needs: { food: 4, play: 3, rest: 2 },
            personality: "curious",
            sounds: ["nibble", "hop", "squeak"]
          }
        ],
        careActions: [
          { name: "Feed", icon: "🍽️", effect: "+20 hunger", time: 2 },
          { name: "Play Fetch", icon: "🎾", effect: "+15 happiness", time: 5 },
          { name: "Brush", icon: "🪒", effect: "+10 comfort", time: 3 },
          { name: "Nap Time", icon: "😴", effect: "+25 energy", time: 8 }
        ],
        challenges: [
          { name: "Sick Pet Day", description: "Pet needs extra care and medicine" },
          { name: "Busy Schedule", description: "Limited time blocks for care" },
          { name: "Multiple Pets", description: "Care for 2-3 pets simultaneously" }
        ]
      },
      learningObjectives: [
        "Responsibility and caregiving concepts",
        "Conditional logic (if-then statements)",
        "Time management and scheduling",
        "Empathy and emotional intelligence"
      ],
      extensions: [
        "Add vet visits with diagnostic sensors",
        "Create a pet training mini-game",
        "Design a pet playground with obstacles"
      ]
    },
    {
      id: "eco-garden-builder",
      title: "🌱 Eco-Smart Garden Builder",
      description: "Build an automated garden that takes care of plants using sensors and smart watering systems!",
      type: "project",
      difficulty: "medium", 
      estimatedMinutes: 35,
      points: 200,
      ageGroup: "6-11",
      theme: "environment",
      imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop",
      instructions: [
        { 
          step: 1, 
          text: "Design your garden layout and choose plants", 
          image: "garden-planning.svg",
          hint: "Tomatoes need more water than cacti!" 
        },
        { 
          step: 2, 
          text: "Program sensors to check soil moisture and light", 
          image: "sensor-setup.svg",
          hint: "Use 'If soil dry then water' logic blocks!" 
        },
        { 
          step: 3, 
          text: "Create automated care routines for different plants", 
          image: "automation-system.svg",
          hint: "Morning watering works best for most plants!" 
        }
      ],
      gameData: {
        plants: [
          { 
            name: "Tomatoes", 
            waterNeed: "high", 
            lightNeed: "high",
            growthTime: 14,
            harvestReward: 100
          },
          { 
            name: "Lettuce", 
            waterNeed: "medium", 
            lightNeed: "medium",
            growthTime: 7,
            harvestReward: 60
          },
          { 
            name: "Sunflowers", 
            waterNeed: "medium", 
            lightNeed: "high",
            growthTime: 21,
            harvestReward: 150
          },
          { 
            name: "Herbs", 
            waterNeed: "low", 
            lightNeed: "medium",
            growthTime: 10,
            harvestReward: 80
          }
        ],
        sensors: [
          { name: "Soil Moisture", readings: ["dry", "moist", "wet"], icon: "💧" },
          { name: "Light Level", readings: ["dark", "dim", "bright"], icon: "☀️" },
          { name: "Temperature", readings: ["cold", "warm", "hot"], icon: "🌡️" }
        ],
        tools: [
          { name: "Sprinkler", action: "water", coverage: 3, icon: "💦" },
          { name: "Grow Light", action: "illuminate", coverage: 2, icon: "💡" },
          { name: "Fan", action: "cool", coverage: 4, icon: "🌪️" }
        ],
        weather: [
          { type: "sunny", effects: { light: "+2", water: "-1" } },
          { type: "rainy", effects: { water: "+2", light: "-1" } },
          { type: "cloudy", effects: { light: "-1" } },
          { type: "storm", effects: { water: "+3", damage_risk: true } }
        ]
      },
      learningObjectives: [
        "Environmental awareness and sustainability",
        "Data collection and analysis",
        "Automated systems thinking", 
        "Cause and effect relationships"
      ],
      extensions: [
        "Add pest detection using camera sensors",
        "Create weather prediction algorithms",
        "Build a greenhouse with climate control"
      ]
    }
  ],
  "12-17": [
    {
      id: "ai-powered-assistant",
      title: "🧠 AI Personal Assistant Project", 
      description: "Build an intelligent assistant that can understand voice commands, process natural language, and control smart home devices.",
      type: "ai_project",
      difficulty: "hard",
      estimatedMinutes: 90,
      points: 500,
      ageGroup: "12-17",
      theme: "artificial_intelligence", 
      imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
      instructions: [
        { 
          step: 1, 
          text: "Set up speech recognition and natural language processing", 
          image: "nlp-setup.svg",
          hint: "Use pre-trained models for better accuracy!" 
        },
        { 
          step: 2, 
          text: "Program intent classification and response generation", 
          image: "ai-training.svg",
          hint: "Start with 5-10 common commands like 'turn on lights'" 
        },
        { 
          step: 3, 
          text: "Integrate with IoT devices and test functionality", 
          image: "iot-integration.svg",
          hint: "Test edge cases like 'turn on all bedroom lights'" 
        }
      ],
      gameData: {
        aiModels: [
          { 
            name: "Speech-to-Text", 
            type: "recognition",
            accuracy: 95,
            languages: ["en", "af", "zu"] 
          },
          { 
            name: "Intent Classifier", 
            type: "nlp",
            categories: ["lighting", "temperature", "security", "entertainment"],
            confidence_threshold: 0.8 
          },
          { 
            name: "Response Generator", 
            type: "generation",
            personality: "friendly",
            response_types: ["confirmation", "clarification", "error"] 
          }
        ],
        devices: [
          { name: "Smart Lights", type: "lighting", commands: ["on", "off", "dim", "brighten", "color"] },
          { name: "Thermostat", type: "climate", commands: ["set_temp", "increase", "decrease"] },
          { name: "Security Camera", type: "security", commands: ["arm", "disarm", "status"] },
          { name: "Music Speaker", type: "audio", commands: ["play", "pause", "volume", "next"] }
        ],
        challenges: [
          { name: "Multi-step Commands", description: "Handle 'dim the lights and play jazz music'" },
          { name: "Context Awareness", description: "Remember previous commands for follow-ups" },
          { name: "Error Handling", description: "Gracefully handle misunderstood commands" },
          { name: "Privacy Protection", description: "Implement local processing for sensitive data" }
        ]
      },
      learningObjectives: [
        "Machine learning and AI concepts",
        "Natural language processing techniques",
        "IoT device integration and protocols",
        "Privacy and ethical considerations in AI"
      ],
      extensions: [
        "Add computer vision for gesture recognition",
        "Implement learning from user preferences", 
        "Create multi-user voice identification",
        "Build predictive automation routines"
      ]
    },
    {
      id: "autonomous-delivery-drone",
      title: "🚁 Autonomous Delivery Drone System",
      description: "Design and program a delivery drone that can navigate obstacles, optimize routes, and safely deliver packages.",
      type: "engineering",
      difficulty: "hard",
      estimatedMinutes: 120,
      points: 600,
      ageGroup: "12-17",
      theme: "aviation",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      instructions: [
        { 
          step: 1, 
          text: "Program flight control systems and sensor integration", 
          image: "flight-control.svg",
          hint: "PID controllers are essential for stable flight!" 
        },
        { 
          step: 2, 
          text: "Implement pathfinding algorithms for obstacle avoidance", 
          image: "pathfinding.svg",
          hint: "A* algorithm works well for 3D navigation!" 
        },
        { 
          step: 3, 
          text: "Create delivery protocols and safety systems", 
          image: "delivery-system.svg",
          hint: "Always include return-to-home functionality!" 
        }
      ],
      gameData: {
        sensors: [
          { name: "GPS", accuracy: "±2m", update_rate: "10Hz", purpose: "location" },
          { name: "LiDAR", range: "100m", resolution: "1cm", purpose: "obstacle_detection" },
          { name: "IMU", axes: 9, frequency: "100Hz", purpose: "orientation" },
          { name: "Camera", resolution: "4K", fov: "120°", purpose: "visual_navigation" },
          { name: "Barometer", accuracy: "±0.5m", purpose: "altitude" }
        ],
        flight_modes: [
          { name: "Manual", description: "Full human control" },
          { name: "Assisted", description: "Stability augmentation" },
          { name: "Auto Navigation", description: "GPS waypoint following" },
          { name: "Autonomous", description: "Full AI control with obstacle avoidance" }
        ],
        delivery_scenarios: [
          { 
            name: "Urban Delivery", 
            obstacles: ["buildings", "power_lines", "birds"],
            weather: "clear",
            distance: "2km",
            difficulty: "medium"
          },
          { 
            name: "Rural Delivery", 
            obstacles: ["trees", "hills", "wind"],
            weather: "windy", 
            distance: "5km",
            difficulty: "hard"
          },
          { 
            name: "Emergency Medical", 
            obstacles: ["crowds", "traffic", "time_pressure"],
            weather: "rain",
            distance: "1km", 
            difficulty: "expert"
          }
        ],
        algorithms: [
          { name: "A* Pathfinding", use_case: "Route optimization", complexity: "O(b^d)" },
          { name: "PID Control", use_case: "Flight stabilization", parameters: ["Kp", "Ki", "Kd"] },
          { name: "Kalman Filter", use_case: "Sensor fusion", advantage: "Noise reduction" },
          { name: "Computer Vision", use_case: "Landing detection", techniques: ["edge_detection", "pattern_matching"] }
        ]
      },
      learningObjectives: [
        "Advanced physics and aerodynamics",
        "Control systems and automation",
        "Algorithm optimization and efficiency",
        "Safety systems and fail-safes"
      ],
      extensions: [
        "Add swarm coordination for multiple drones",
        "Implement machine learning for route optimization",
        "Create weather adaptation algorithms",
        "Build ground control station interface"
      ]
    },
    {
      id: "blockchain-voting-system",
      title: "🗳️ Secure Blockchain Voting Platform",
      description: "Create a transparent, tamper-proof voting system using blockchain technology with cryptographic security.",
      type: "cybersecurity",
      difficulty: "expert", 
      estimatedMinutes: 150,
      points: 750,
      ageGroup: "12-17",
      theme: "cryptography",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop",
      instructions: [
        { 
          step: 1, 
          text: "Implement cryptographic hash functions and digital signatures", 
          image: "cryptography.svg",
          hint: "SHA-256 is the standard for blockchain applications!" 
        },
        { 
          step: 2, 
          text: "Design the blockchain structure and consensus mechanism", 
          image: "blockchain-design.svg",
          hint: "Proof-of-Authority works well for private voting networks!" 
        },
        { 
          step: 3, 
          text: "Create voter authentication and ballot verification systems", 
          image: "security-system.svg",
          hint: "Zero-knowledge proofs protect voter privacy!" 
        }
      ],
      gameData: {
        cryptography: {
          hash_functions: ["SHA-256", "SHA-3", "Blake2b"],
          signature_schemes: ["RSA", "ECDSA", "EdDSA"], 
          encryption: ["AES-256", "ChaCha20", "RSA-OAEP"]
        },
        blockchain: {
          consensus_mechanisms: [
            { name: "Proof of Authority", energy_efficient: true, suitable_for: "private_networks" },
            { name: "Proof of Stake", scalability: "high", suitable_for: "public_networks" },
            { name: "Practical Byzantine Fault Tolerance", finality: "immediate", suitable_for: "permissioned" }
          ],
          block_structure: {
            header: ["previous_hash", "merkle_root", "timestamp", "nonce"],
            body: ["transactions", "votes", "metadata"]
          }
        },
        voting_features: [
          { name: "Anonymous Voting", implementation: "ring_signatures" },
          { name: "Verifiable Results", implementation: "public_ledger" },
          { name: "Voter Privacy", implementation: "zero_knowledge_proofs" },
          { name: "Tamper Evidence", implementation: "immutable_records" }
        ],
        security_tests: [
          { name: "Double Voting Attack", mitigation: "unique_voter_ids" },
          { name: "Vote Buying", mitigation: "receipt_freeness" },
          { name: "Coercion Resistance", mitigation: "deniable_encryption" },
          { name: "System Availability", mitigation: "distributed_architecture" }
        ]
      },
      learningObjectives: [
        "Cryptographic principles and applications",
        "Blockchain technology and distributed systems", 
        "Security analysis and threat modeling",
        "Democratic processes and digital governance"
      ],
      extensions: [
        "Implement multi-signature governance",
        "Add homomorphic encryption for private tallying",
        "Create mobile voting applications",
        "Design audit and compliance systems"
      ]
    },
    {
      id: "quantum-simulation-lab",
      title: "⚛️ Quantum Computing Simulation Lab",
      description: "Explore quantum computing concepts by building simulators for quantum algorithms and experiments.",
      type: "research",
      difficulty: "expert",
      estimatedMinutes: 180,
      points: 850,
      ageGroup: "12-17", 
      theme: "quantum_physics",
      imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
      instructions: [
        { 
          step: 1, 
          text: "Implement quantum state representation and basic gates", 
          image: "quantum-gates.svg",
          hint: "Start with Pauli-X, Y, Z gates and the Hadamard gate!" 
        },
        { 
          step: 2, 
          text: "Build quantum circuit simulator with measurement", 
          image: "quantum-circuit.svg",
          hint: "Use complex numbers for quantum amplitudes!" 
        },
        { 
          step: 3, 
          text: "Program famous quantum algorithms like Shor's or Grover's", 
          image: "quantum-algorithms.svg",
          hint: "Grover's algorithm is easier to start with!" 
        }
      ],
      gameData: {
        quantum_gates: [
          { name: "Pauli-X", symbol: "X", matrix: [[0, 1], [1, 0]], description: "Bit flip" },
          { name: "Pauli-Y", symbol: "Y", matrix: [[0, "-i"], ["i", 0]], description: "Bit and phase flip" },
          { name: "Pauli-Z", symbol: "Z", matrix: [[1, 0], [0, -1]], description: "Phase flip" },
          { name: "Hadamard", symbol: "H", matrix: [["1/√2", "1/√2"], ["1/√2", "-1/√2"]], description: "Superposition" },
          { name: "CNOT", symbol: "CX", type: "two_qubit", description: "Controlled NOT" }
        ],
        algorithms: [
          { 
            name: "Grover's Search", 
            purpose: "Database search speedup",
            complexity: "O(√N)",
            qubits_needed: "log₂(N) + ancilla"
          },
          { 
            name: "Shor's Factoring", 
            purpose: "Integer factorization", 
            complexity: "Polynomial",
            qubits_needed: "2n + O(log n)"
          },
          { 
            name: "Quantum Teleportation", 
            purpose: "State transfer",
            resources: "2 classical bits + entanglement"
          },
          { 
            name: "Deutsch-Jozsa", 
            purpose: "Function evaluation",
            advantage: "Exponential query reduction"
          }
        ],
        experiments: [
          { 
            name: "Bell State Preparation", 
            description: "Create maximally entangled states",
            difficulty: "beginner"
          },
          { 
            name: "Quantum Error Correction", 
            description: "Implement 3-qubit bit flip code",
            difficulty: "intermediate" 
          },
          { 
            name: "Variational Quantum Eigensolver", 
            description: "Find ground state energies",
            difficulty: "advanced"
          },
          { 
            name: "Quantum Machine Learning", 
            description: "Quantum neural networks",
            difficulty: "expert"
          }
        ],
        visualization: {
          bloch_sphere: "3D visualization of qubit states",
          circuit_diagrams: "Standard quantum circuit notation", 
          probability_distributions: "Measurement outcome histograms",
          state_vectors: "Complex amplitude visualization"
        }
      },
      learningObjectives: [
        "Quantum mechanics principles", 
        "Linear algebra and complex numbers",
        "Algorithm design and analysis",
        "Cutting-edge technology research"
      ],
      extensions: [
        "Connect to real quantum hardware via cloud APIs",
        "Implement quantum error correction codes",
        "Explore quantum machine learning applications",
        "Design quantum games and puzzles"
      ]
    }
  ]
};

// Enhanced micro:bit projects with real hardware integration
export const microbitProjects = {
  "6-11": [
    {
      id: "magic-wand",
      title: "🪄 Magic Wand Spellcaster",
      description: "Wave your micro:bit like a magic wand to cast spells with lights and sounds!",
      difficulty: "easy",
      estimatedMinutes: 15,
      hardware: ["micro:bit", "battery_pack", "speaker"],
      code: `
from microbit import *
import music

spells = {
    "up": "Levitation Charm!",
    "down": "Ground Stomp!",
    "left": "Lightning Bolt!",
    "right": "Fire Ball!"
}

while True:
    gesture = accelerometer.current_gesture()
    
    if gesture in spells:
        display.scroll(spells[gesture])
        music.play(music.POWER_UP)
        
        # Different light patterns for each spell
        if gesture == "up":
            display.show(Image.ARROW_N)
        elif gesture == "down": 
            display.show(Image.ARROW_S)
        elif gesture == "left":
            display.show(Image.ARROW_W)
        elif gesture == "right":
            display.show(Image.ARROW_E)
            
        sleep(1000)
        display.clear()
    
    sleep(100)
      `,
      learningPoints: [
        "Accelerometer and gesture detection",
        "Conditional statements", 
        "Arrays and data structures",
        "Sound and display output"
      ]
    },
    {
      id: "friend-finder",
      title: "👫 Friend Finder Network",
      description: "Connect with friends using radio signals and see when they're nearby!",
      difficulty: "medium", 
      estimatedMinutes: 25,
      hardware: ["micro:bit", "battery_pack"],
      code: `
from microbit import *
import radio

radio.config(channel=7)
radio.on()

my_name = "Alex"  # Change this to your name
friends = []

while True:
    # Send my signal
    radio.send(f"FRIEND:{my_name}")
    
    # Listen for friends
    message = radio.receive()
    if message:
        if message.startswith("FRIEND:"):
            friend_name = message.split(":")[1]
            if friend_name != my_name and friend_name not in friends:
                friends.append(friend_name)
                display.scroll(f"Hi {friend_name}!")
                music.play(music.BIRTHDAY)
    
    # Show connected friends count
    if button_a.was_pressed():
        display.scroll(f"{len(friends)} friends")
    
    # Clear friend list
    if button_b.was_pressed():
        friends = []
        display.show(Image.SAD)
        
    sleep(1000)
      `,
      learningPoints: [
        "Radio communication",
        "String manipulation",
        "List management",
        "Network protocols"
      ]
    }
  ],
  "12-17": [
    {
      id: "iot-weather-station",
      title: "🌦️ IoT Weather Monitoring Station", 
      description: "Build a connected weather station that uploads data to the cloud and sends alerts.",
      difficulty: "hard",
      estimatedMinutes: 60,
      hardware: ["micro:bit", "temperature_sensor", "humidity_sensor", "wifi_module"],
      code: `
from microbit import *
import radio
import json
from machine import I2C

# Initialize sensors
i2c = I2C(sda=pin20, scl=pin19)
wifi_module = pin16

class WeatherStation:
    def __init__(self):
        self.readings = []
        self.alert_thresholds = {
            'temp_high': 35,
            'temp_low': 0,
            'humidity_high': 80
        }
    
    def read_sensors(self):
        temp = temperature()
        # Simulated additional sensors
        humidity = 45  # Would read from actual sensor
        pressure = 1013.25  # Would read from barometric sensor
        
        reading = {
            'timestamp': running_time(),
            'temperature': temp,
            'humidity': humidity, 
            'pressure': pressure
        }
        
        return reading
    
    def check_alerts(self, reading):
        alerts = []
        
        if reading['temperature'] > self.alert_thresholds['temp_high']:
            alerts.append("HIGH_TEMP")
        elif reading['temperature'] < self.alert_thresholds['temp_low']:
            alerts.append("LOW_TEMP")
            
        if reading['humidity'] > self.alert_thresholds['humidity_high']:
            alerts.append("HIGH_HUMIDITY")
            
        return alerts
    
    def send_to_cloud(self, data):
        # Send via radio to WiFi gateway
        radio.send(json.dumps(data))
        display.show(Image.ANTENNA)
        sleep(500)
        display.clear()

station = WeatherStation()
radio.config(channel=42)
radio.on()

while True:
    # Take reading every 5 minutes
    if running_time() % 300000 == 0:
        reading = station.read_sensors()
        alerts = station.check_alerts(reading)
        
        # Display current conditions
        display.scroll(f"{reading['temperature']}C")
        
        # Send data to cloud
        station.send_to_cloud(reading)
        
        # Handle alerts
        for alert in alerts:
            display.scroll(alert)
            music.play(music.WAWAWAWAA)
    
    sleep(1000)
      `,
      learningPoints: [
        "IoT architecture and protocols",
        "Sensor integration and calibration",
        "Data structures and JSON",
        "Cloud connectivity and APIs"
      ]
    }
  ]
};