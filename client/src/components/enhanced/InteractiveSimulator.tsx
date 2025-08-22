import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { 
  Play, 
  Pause, 
  Square, 
  RotateCcw,
  Zap,
  Cpu,
  Wifi,
  Battery,
  Settings,
  Code,
  Eye,
  Users,
  Award
} from "lucide-react";

interface SimulatorProps {
  isOpen: boolean;
  onClose: () => void;
  activity?: any;
}

interface RobotState {
  position: { x: number; y: number };
  angle: number;
  ledPattern: string;
  sensors: {
    temperature: number;
    light: number;
    accelerometer: { x: number; y: number; z: number };
    magnetometer: number;
  };
  isConnected: boolean;
  batteryLevel: number;
}

interface AnimationFrame {
  timestamp: number;
  position: { x: number; y: number };
  angle: number;
  ledPattern: string;
  action: string;
}

export function InteractiveSimulator({ isOpen, onClose, activity }: SimulatorProps) {
  const { user } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  
  const [isRunning, setIsRunning] = useState(false);
  const [robotState, setRobotState] = useState<RobotState>({
    position: { x: 400, y: 300 },
    angle: 0,
    ledPattern: "happy",
    sensors: {
      temperature: 22,
      light: 75,
      accelerometer: { x: 0, y: 0, z: -1000 },
      magnetometer: 180
    },
    isConnected: false,
    batteryLevel: 85
  });
  
  const [commands, setCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [animationHistory, setAnimationHistory] = useState<AnimationFrame[]>([]);
  const [simulatorMode, setSimulatorMode] = useState<'basic' | 'advanced' | 'collaborative'>('basic');
  const [codeInput, setCodeInput] = useState('');
  
  const isLittleCoder = user?.ageGroup === '6-11';

  const ledPatterns = {
    happy: "😊",
    sad: "😢", 
    heart: "❤️",
    star: "⭐",
    arrow_up: "⬆️",
    arrow_down: "⬇️",
    arrow_left: "⬅️",
    arrow_right: "➡️",
    flash: "⚡",
    custom: "🤖"
  };

  const samplePrograms = isLittleCoder ? {
    "Dance Party": `
// Make the robot dance!
show_led("happy")
move_forward(50)
turn_right(90)
show_led("heart")
move_forward(50)
turn_right(90)
show_led("star")
move_forward(50)
turn_right(90)
show_led("happy")
move_forward(50)
turn_right(90)
show_led("flash")
    `,
    "Treasure Hunter": `
// Find the hidden treasure!
show_led("arrow_up")
while (light_sensor() < 80) {
  move_forward(20)
  if (temperature() > 25) {
    show_led("heart")
    play_sound("treasure")
    break
  }
  turn_right(45)
}
show_led("star")
    `,
    "Pet Robot": `
// Your virtual pet robot
show_led("happy")
forever() {
  if (button_a_pressed()) {
    show_led("heart")
    play_sound("happy")
  }
  if (shake_detected()) {
    show_led("sad") 
    play_sound("worried")
    wait(2000)
    show_led("happy")
  }
  wait(100)
}
    `
  } : {
    "Autonomous Navigation": `
// Advanced pathfinding algorithm
import { AStar, ObstacleMap } from 'pathfinding'

class AutonomousRobot {
  constructor() {
    this.position = {x: 0, y: 0}
    this.sensors = new SensorArray()
    this.pathfinder = new AStar()
  }
  
  async navigateToTarget(target) {
    const obstacles = await this.scanEnvironment()
    const path = this.pathfinder.findPath(this.position, target, obstacles)
    
    for (const waypoint of path) {
      await this.moveToWaypoint(waypoint)
      if (this.obstacleDetected()) {
        // Recompute path
        return this.navigateToTarget(target)
      }
    }
  }
  
  async moveToWaypoint(point) {
    const angle = this.calculateAngle(this.position, point)
    await this.turnToAngle(angle)
    await this.moveForward(this.calculateDistance(this.position, point))
  }
}
    `,
    "Machine Learning": `
// Simple neural network for gesture recognition
import tensorflow as tf
from microbit import *

class GestureRecognizer:
    def __init__(self):
        self.model = self.build_model()
        self.training_data = []
        
    def build_model(self):
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(32, activation='relu', input_shape=(9,)),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(16, activation='relu'),
            tf.keras.layers.Dense(4, activation='softmax')  # 4 gestures
        ])
        model.compile(optimizer='adam', loss='categorical_crossentropy')
        return model
    
    def collect_training_data(self, gesture_label):
        accel_data = [
            accelerometer.get_x(), accelerometer.get_y(), accelerometer.get_z(),
            accelerometer.get_x(), accelerometer.get_y(), accelerometer.get_z(),
            accelerometer.get_x(), accelerometer.get_y(), accelerometer.get_z()
        ]
        self.training_data.append((accel_data, gesture_label))
        
    def train_model(self):
        X = [data[0] for data in self.training_data]
        y = [data[1] for data in self.training_data]
        self.model.fit(X, y, epochs=50)
        
    def predict_gesture(self):
        current_data = [accelerometer.get_x(), accelerometer.get_y(), accelerometer.get_z()] * 3
        prediction = self.model.predict([current_data])
        return np.argmax(prediction)

recognizer = GestureRecognizer()
    `,
    "IoT Sensor Network": `
// Distributed sensor network with mesh communication
import radio
import json
from machine import Pin, ADC

class SensorNode:
    def __init__(self, node_id, sensor_config):
        self.node_id = node_id
        self.sensors = self.init_sensors(sensor_config)
        self.neighbors = []
        self.data_buffer = []
        
        radio.config(channel=42, power=7)
        radio.on()
        
    def init_sensors(self, config):
        sensors = {}
        if 'temperature' in config:
            sensors['temperature'] = ADC(Pin(config['temperature']))
        if 'humidity' in config:
            sensors['humidity'] = ADC(Pin(config['humidity']))
        if 'light' in config:
            sensors['light'] = ADC(Pin(config['light']))
        return sensors
    
    def read_sensors(self):
        readings = {
            'node_id': self.node_id,
            'timestamp': running_time(),
            'data': {}
        }
        
        for sensor_name, sensor in self.sensors.items():
            readings['data'][sensor_name] = sensor.read_u16()
            
        return readings
    
    def broadcast_data(self, data):
        message = json.dumps(data)
        radio.send(f"DATA:{message}")
        
    def listen_for_data(self):
        message = radio.receive()
        if message and message.startswith("DATA:"):
            try:
                data = json.loads(message[5:])
                self.process_neighbor_data(data)
            except ValueError:
                pass
                
    def process_neighbor_data(self, data):
        # Implement mesh routing and data aggregation
        if data['node_id'] not in [n['id'] for n in self.neighbors]:
            self.neighbors.append({'id': data['node_id'], 'last_seen': running_time()})
        
        # Forward data if not from this node
        if data['node_id'] != self.node_id:
            self.broadcast_data(data)

# Initialize sensor node
node = SensorNode("NODE_01", {'temperature': 26, 'humidity': 27, 'light': 28})

while True:
    # Sensor reading cycle
    sensor_data = node.read_sensors()
    node.broadcast_data(sensor_data)
    node.listen_for_data()
    
    sleep(5000)  # 5 second intervals
    `
  };

  const drawSimulator = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#f0f9ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid for advanced mode
    if (simulatorMode === 'advanced') {
      ctx.strokeStyle = '#e0e7ff';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // Draw environment objects
    if (activity?.gameData) {
      // Draw obstacles, collectibles, etc. based on activity
      const gameData = activity.gameData;
      if (gameData.obstacles) {
        gameData.obstacles.forEach((obstacle: any) => {
          ctx.fillStyle = obstacle.type === 'sea_monster' ? '#ef4444' : 
                           obstacle.type === 'whirlpool' ? '#3b82f6' : '#64748b';
          ctx.fillRect(obstacle.pos[0] * 40, obstacle.pos[1] * 40, 35, 35);
          ctx.fillStyle = 'white';
          ctx.font = '20px serif';
          ctx.textAlign = 'center';
          ctx.fillText(obstacle.type === 'sea_monster' ? '🐙' : 
                      obstacle.type === 'whirlpool' ? '🌀' : '🪨', 
                      obstacle.pos[0] * 40 + 17, obstacle.pos[1] * 40 + 25);
        });
      }
    }

    // Draw robot
    ctx.save();
    ctx.translate(robotState.position.x, robotState.position.y);
    ctx.rotate((robotState.angle * Math.PI) / 180);

    // Robot body
    ctx.fillStyle = robotState.isConnected ? '#10b981' : '#6b7280';
    ctx.fillRect(-20, -20, 40, 40);

    // Robot face (LED display)
    ctx.fillStyle = 'black';
    ctx.fillRect(-15, -15, 30, 30);
    
    // LED pattern
    ctx.fillStyle = '#00ff00';
    ctx.font = '24px serif';
    ctx.textAlign = 'center';
    ctx.fillText(ledPatterns[robotState.ledPattern as keyof typeof ledPatterns] || '🤖', 0, 8);

    // Direction indicator
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(15, 0);
    ctx.lineTo(25, -5);
    ctx.lineTo(25, 5);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // Draw animation trail in advanced mode
    if (simulatorMode === 'advanced' && animationHistory.length > 1) {
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      
      ctx.beginPath();
      for (let i = 0; i < animationHistory.length; i++) {
        const frame = animationHistory[i];
        if (i === 0) {
          ctx.moveTo(frame.position.x, frame.position.y);
        } else {
          ctx.lineTo(frame.position.x, frame.position.y);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }
  };

  const executeCommand = async (command: string) => {
    // Parse and execute commands
    const commandParts = command.trim().split('(');
    const commandName = commandParts[0];
    const params = commandParts[1] ? commandParts[1].replace(')', '').split(',') : [];

    switch (commandName) {
      case 'move_forward':
        const distance = parseInt(params[0]) || 50;
        const newX = robotState.position.x + Math.cos(robotState.angle * Math.PI / 180) * distance;
        const newY = robotState.position.y + Math.sin(robotState.angle * Math.PI / 180) * distance;
        
        setRobotState(prev => ({
          ...prev,
          position: { 
            x: Math.max(20, Math.min(780, newX)), 
            y: Math.max(20, Math.min(580, newY)) 
          }
        }));
        break;

      case 'turn_right':
        const rightAngle = parseInt(params[0]) || 90;
        setRobotState(prev => ({
          ...prev,
          angle: (prev.angle + rightAngle) % 360
        }));
        break;

      case 'turn_left':
        const leftAngle = parseInt(params[0]) || 90;
        setRobotState(prev => ({
          ...prev,
          angle: (prev.angle - leftAngle + 360) % 360
        }));
        break;

      case 'show_led':
        const pattern = params[0]?.replace(/['"]/g, '') || 'happy';
        setRobotState(prev => ({
          ...prev,
          ledPattern: pattern
        }));
        break;

      case 'wait':
        const duration = parseInt(params[0]) || 1000;
        await new Promise(resolve => setTimeout(resolve, duration));
        break;
    }

    // Add to animation history
    setAnimationHistory(prev => [...prev, {
      timestamp: Date.now(),
      position: { ...robotState.position },
      angle: robotState.angle,
      ledPattern: robotState.ledPattern,
      action: command
    }]);
  };

  const runProgram = async () => {
    if (!codeInput.trim()) return;

    setIsRunning(true);
    setCurrentCommand(0);
    
    // Parse code into commands
    const lines = codeInput.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('//') && !line.startsWith('import'));

    try {
      for (let i = 0; i < lines.length; i++) {
        setCurrentCommand(i);
        await executeCommand(lines[i]);
        await new Promise(resolve => setTimeout(resolve, 500)); // Visual delay
      }
    } catch (error) {
      console.error('Program execution error:', error);
    } finally {
      setIsRunning(false);
      setCurrentCommand(0);
    }
  };

  const resetSimulator = () => {
    setRobotState({
      position: { x: 400, y: 300 },
      angle: 0,
      ledPattern: "happy",
      sensors: {
        temperature: 22,
        light: 75,
        accelerometer: { x: 0, y: 0, z: -1000 },
        magnetometer: 180
      },
      isConnected: false,
      batteryLevel: 85
    });
    setAnimationHistory([]);
    setCurrentCommand(0);
  };

  const connectDevice = () => {
    setRobotState(prev => ({
      ...prev,
      isConnected: !prev.isConnected
    }));
  };

  useEffect(() => {
    const animate = () => {
      drawSimulator();
      animationRef.current = requestAnimationFrame(animate);
    };
    
    if (isOpen) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isOpen, robotState, animationHistory, simulatorMode, activity]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-7xl h-[95vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {isLittleCoder ? "🤖 Robot Playground" : "⚙️ Interactive Simulator"}
              </h2>
              <p className="opacity-90">
                {activity?.title || (isLittleCoder 
                  ? "Program your virtual robot and watch it come to life!"
                  : "Advanced robotics simulation with real-time feedback"
                )}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Connection Status */}
              <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${robotState.isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-sm">{robotState.isConnected ? 'Connected' : 'Simulator'}</span>
              </div>
              <Button onClick={onClose} variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                ✕
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Left Panel - Code Editor */}
          <div className="w-1/3 border-r flex flex-col">
            <Tabs defaultValue="code" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3 m-4">
                <TabsTrigger value="code">
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </TabsTrigger>
                <TabsTrigger value="examples">
                  <Eye className="w-4 h-4 mr-2" />
                  Examples
                </TabsTrigger>
                <TabsTrigger value="sensors">
                  <Settings className="w-4 h-4 mr-2" />
                  Sensors
                </TabsTrigger>
              </TabsList>

              <TabsContent value="code" className="flex-1 flex flex-col p-4 pt-0">
                <div className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <div className="flex gap-2 mb-2">
                      <Button
                        onClick={runProgram}
                        disabled={isRunning || !codeInput.trim()}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Run
                      </Button>
                      <Button
                        onClick={() => setIsRunning(false)}
                        disabled={!isRunning}
                        variant="outline"
                      >
                        <Pause className="w-4 h-4 mr-2" />
                        Stop
                      </Button>
                      <Button onClick={resetSimulator} variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                    
                    {isRunning && (
                      <Progress value={(currentCommand / (codeInput.split('\n').length - 1)) * 100} className="mb-2" />
                    )}
                  </div>

                  <textarea
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    className="flex-1 font-mono text-sm border rounded-lg p-4 bg-gray-900 text-green-400 resize-none"
                    placeholder={isLittleCoder 
                      ? "// Write your robot commands here!\n// Try: move_forward(50)\n// Then: turn_right(90)"
                      : "// Write your robot program here\n// Available commands: move_forward(distance), turn_right(angle), show_led(pattern)"
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="examples" className="flex-1 p-4 pt-0">
                <div className="space-y-3">
                  <h3 className="font-semibold mb-4">Sample Programs</h3>
                  {Object.entries(samplePrograms).map(([name, code]) => (
                    <Card key={name} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{name}</h4>
                        <Button
                          size="sm"
                          onClick={() => setCodeInput(code.trim())}
                          className="w-full"
                        >
                          Load Program
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sensors" className="flex-1 p-4 pt-0">
                <div className="space-y-4">
                  <h3 className="font-semibold mb-4">Sensor Readings</h3>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Temperature:</span>
                          <div className="font-mono">{robotState.sensors.temperature}°C</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Light:</span>
                          <div className="font-mono">{robotState.sensors.light}%</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Battery:</span>
                          <div className="font-mono">{robotState.batteryLevel}%</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Compass:</span>
                          <div className="font-mono">{robotState.sensors.magnetometer}°</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Connection</h4>
                      <Button
                        onClick={connectDevice}
                        variant={robotState.isConnected ? "destructive" : "default"}
                        className="w-full"
                      >
                        <Wifi className="w-4 h-4 mr-2" />
                        {robotState.isConnected ? 'Disconnect Device' : 'Connect Device'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Center Panel - Simulator */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-semibold">Simulation View</h3>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant={simulatorMode === 'basic' ? 'default' : 'outline'}
                    onClick={() => setSimulatorMode('basic')}
                  >
                    Basic
                  </Button>
                  <Button
                    size="sm"
                    variant={simulatorMode === 'advanced' ? 'default' : 'outline'}
                    onClick={() => setSimulatorMode('advanced')}
                  >
                    Advanced
                  </Button>
                  <Button
                    size="sm"
                    variant={simulatorMode === 'collaborative' ? 'default' : 'outline'}
                    onClick={() => setSimulatorMode('collaborative')}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Multi-User
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={isRunning ? 'default' : 'secondary'}>
                  {isRunning ? 'Running' : 'Ready'}
                </Badge>
              </div>
            </div>

            <div className="flex-1 p-4">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 w-full h-full"
              />
            </div>
          </div>

          {/* Right Panel - Information & Controls */}
          <div className="w-1/4 border-l flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold mb-4">Activity Info</h3>
              {activity && (
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-2">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="outline">{activity.difficulty}</Badge>
                      <Badge variant="outline">{activity.estimatedMinutes} min</Badge>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium mb-1">Points: {activity.points}</div>
                      <div className="text-gray-600">Theme: {activity.theme}</div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="flex-1 p-4">
              <h3 className="font-semibold mb-4">Robot Status</h3>
              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Position: ({Math.round(robotState.position.x)}, {Math.round(robotState.position.y)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">Angle: {robotState.angle}°</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Battery: {robotState.batteryLevel}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{ledPatterns[robotState.ledPattern as keyof typeof ledPatterns]}</span>
                    <span className="text-sm">LED: {robotState.ledPattern}</span>
                  </div>
                </CardContent>
              </Card>

              {simulatorMode === 'collaborative' && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Collaborative Session
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600">
                      Share code and collaborate with classmates in real-time!
                    </div>
                    <Button size="sm" className="w-full mt-3" disabled>
                      <Users className="w-4 h-4 mr-2" />
                      Start Session
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}