// app/ai-trainer/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { getLocalStorage, setLocalStorage } from '../localStorage';
import { useRouter } from 'next/navigation';
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyC63JzxZHB6RqYrg50yklQ1UcsM0knpJbQ");

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


// Simulated database of national races
const nationalRaces = [
  { id: 1, name: "Chicago Marathon", date: "2024-10-13", distance: 42195, unit: "meters" },
  { id: 2, name: "New York City Marathon", date: "2024-11-03", distance: 42195, unit: "meters" },
  { id: 3, name: "Boston 10K for Women", date: "2024-10-12", distance: 10000, unit: "meters" },
  { id: 4, name: "Atlanta Peachtree Road Race", date: "2024-07-04", distance: 10000, unit: "meters" },
  { id: 5, name: "San Francisco Half Marathon", date: "2024-07-23", distance: 21097, unit: "meters" },
];



const AITrainer = () => {
    const router = useRouter();
    if (getLocalStorage('isSignedIn') !== true) {
      router.push('/signin');
  }
  
  
  const [hasTrainer, setHasTrainer] = useState(false);
  const [goal, setGoal] = useState('');
  const [selectedRun, setSelectedRun] = useState('');
  const [trainerGender, setTrainerGender] = useState('');
  const [customRace, setCustomRace] = useState({ date: '', distance: '', name: '' });
  const [upcomingRuns, setUpcomingRuns] = useState<{ name: string; distance: number; unit: string; date: string; }[]>([]);
  const [selectedNationalRace, setSelectedNationalRace] = useState<number>();
  const [trainerSchedule, setTrainerSchedule] = useState<{ date: string; distance: number; pace: string; heartRateZone: number; }[]>([]);
  const [daysUntilHackathon, setDaysUntilHackathon] = useState(0);
  const [trainingProgress, setTrainingProgress] = useState({ percentage: 0, pace: '', targetPace: '' });
  const [daysOnTrack, setDaysOnTrack] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [aiResponse, setAiResponse] = useState('');


  useEffect(() => {
    const trainerStatus = getLocalStorage('hasTrainer');
    setHasTrainer(trainerStatus === true);
    
    const storedRuns = getLocalStorage('upcomingRuns') || [];
    setUpcomingRuns(storedRuns);

    const mockSchedule = generateMockSchedule();
    setTrainerSchedule(mockSchedule);
    setDaysUntilHackathon(30); // Example: 30 days until hackathon
    setTrainingProgress({ percentage: 95, pace: '8:22', targetPace: '8:20' });
    setDaysOnTrack(14);

  }, []);

  const generateMockSchedule = () => {
    const today = new Date();
    return Array(5).fill(null).map((_, index) => {
      const date = new Date(today);
      date.setDate(date.getDate() + index);
      return {
        date: date.toLocaleDateString(),
        distance: 5 + Math.floor(Math.random() * 3), // 5-7 miles
        pace: `8:${20 + Math.floor(Math.random() * 10)}`, // 8:20 - 8:29 pace
        heartRateZone: Math.floor(Math.random() * 3) + 1, // Zone 1-3
      };
    });
  };


  const handleCreateTrainer = () => {
    // Logic to create a trainer based on selections
    setLocalStorage('hasTrainer', true);
    setHasTrainer(true);
  };

  const handleCustomRaceSubmit = () => {
    const newRun = {
      name: customRace.name,
      distance: parseInt(customRace.distance),
      unit: 'meters',
      date: customRace.date
    };
    const updatedRuns = [...upcomingRuns, newRun];
    setUpcomingRuns(updatedRuns);
    setLocalStorage('upcomingRuns', updatedRuns);
    setCustomRace({ date: '', distance: '', name: '' });
  };

  const handleNationalRaceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const raceId = parseInt(e.target.value);
    const selectedRace = nationalRaces.find(race => race.id === raceId);
    if (selectedRace) {
      setSelectedNationalRace(raceId);
      const updatedRuns = [...upcomingRuns, selectedRace];
      setUpcomingRuns(updatedRuns);
      setLocalStorage('upcomingRuns', updatedRuns);
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAiResponse('Loading...');
    e.preventDefault();

    try {
      // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
      const prompt = searchTerm;
    
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      setAiResponse(text);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real app, you would make an API call here to search for friends
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">AI Trainer</h1>
        
        {!hasTrainer ? (
          <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Create Your AI Trainer</h2>
            
            <div className="mb-4">
              <label className="block mb-2">Goal:</label>
              <select 
                value={goal} 
                onChange={(e) => setGoal(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4"
              >
                <option value="">Select a goal</option>
                <option value="3k">3K Race</option>
                <option value="5k">5K Race</option>
                <option value="10k">10K Race</option>
                <option value="half-marathon">Half Marathon</option>
                <option value="marathon">Marathon</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Upcoming Run:</label>
              <select 
                value={selectedRun} 
                onChange={(e) => setSelectedRun(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4"
              >
                <option value="">Select a run</option>
                {upcomingRuns.map((run, index) => (
                  <option key={index} value={run.name}>
                    {run.name} - {run.distance}{run.unit === 'meters' ? 'm' : 'km'} on {run.date}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2">Trainer Gender:</label>
              <select 
                value={trainerGender} 
                onChange={(e) => setTrainerGender(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Add Custom Race</h3>
              <input 
                type="date" 
                value={customRace.date} 
                onChange={(e) => setCustomRace({...customRace, date: e.target.value})}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 mb-2"
              />
              <input 
                type="number" 
                placeholder="Distance (meters)" 
                value={customRace.distance} 
                onChange={(e) => setCustomRace({...customRace, distance: e.target.value.toString() || ''})}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 mb-2"
              />
              <input 
                type="text" 
                placeholder="Race Name" 
                value={customRace.name} 
                onChange={(e) => setCustomRace({...customRace, name: e.target.value})}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 mb-2"
              />
              <button 
                onClick={handleCustomRaceSubmit}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Add Custom Race
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Select from National Races</h3>
              <select 
                value={selectedNationalRace} 
                onChange={handleNationalRaceSelect}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4"
              >
                <option value="">Select a national race</option>
                {nationalRaces.map((race) => (
                  <option key={race.id} value={race.id}>
                    {race.name} - {race.distance}m on {race.date}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={handleCreateTrainer}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Create AI Trainer
            </button>
          </div>
        ) : (
            <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your AI Trainer</h2>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold mb-2">Upcoming Run Schedule</h3>
              <ul>
                {trainerSchedule.map((day, index) => (
                  <li key={index} className="mb-2">
                    {day.date}: {day.distance} miles, {day.pace} pace, Zone {day.heartRateZone} heart rate
                  </li>
                ))}
              </ul>
            </div>
        
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold mb-2">Competition Countdown</h3>
              <p>{daysUntilHackathon} days until the competition</p>
            </div>
        
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold mb-2">Training Progress</h3>
              <p>On pace: {trainingProgress.percentage}%</p>
              <p>Current pace: {trainingProgress.pace} / Target pace: {trainingProgress.targetPace}</p>
              <p>Days on track: {daysOnTrack}</p>
            </div>

            <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter questions about your training plan..."
                    value={searchTerm}
                    onChange={handleOnChange}
                    className="flex-grow bg-gray-800 text-white border border-gray-700 rounded-l-md py-2 px-4"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
              
            {aiResponse && <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-xl font-semibold mb-2">{aiResponse}</h3>

            </div> }
          </div>
        )}
      </div>
    </div>
  );
};

export default AITrainer;

function preventDefault() {
  throw new Error('Function not implemented.');
}
