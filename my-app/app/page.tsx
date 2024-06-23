import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Ghananese River Running</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section
          title="Your Running Stats"
          description="View detailed statistics about your running performance, including distance, pace, and improvements over time."
          buttonText="View Stats"
          buttonLink="/stats"
        />

        <Section
          title="DASH-board"
          description='Level up your runs by tracking your progress with experience points and achievements'
          buttonText='View DASH-board'
          buttonLink='/dashboard'
        />

        <Section
          title="AI Personal Trainer"
          description="Get personalized training plans based on your current fitness level and running goals, powered by advanced AI."
          buttonText="Start Training"
          buttonLink="/trainer"
        />

        <Section
          title="Friends"
          description="Connect with other runners, share your achievements, and join running groups in your area."
          buttonText="View Friends"
          buttonLink="/friends"
        />

        <Section
          title="Upcoming Runs"
          description="Discover running events in your area and across the nation. Find your next challenge or fun run!"
          buttonText="Explore Events"
          buttonLink="/competitions"
        />

        <Section
          title="Shopping"
          description="Your one stop for finding deals on all running gear. From shoes to watches, we have it all!"
          buttonText="Find deals"
          buttonLink="/shopping"
        />
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-gray-600">
          Made with Next.js, Google Gemini, and Strava API
        </p>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const Section: React.FC<SectionProps> = ({ title, description, buttonText, buttonLink }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link href={buttonLink}>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

export default HomePage;