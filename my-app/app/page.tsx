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
          title="AI Personal Trainer"
          description="Get personalized training plans based on your current fitness level and running goals, powered by advanced AI."
          buttonText="Start Training"
          buttonLink="/trainer"
        />

        <Section
          title="Upcoming Runs"
          description="Discover running events in your area and across the nation. Find your next challenge or fun run!"
          buttonText="Explore Events"
          buttonLink="/events"
        />

        <Section
          title="Community"
          description="Connect with other runners, share your achievements, and join running groups in your area."
          buttonText="Join Community"
          buttonLink="/community"
        />
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
      {/* put what this button should do */}
    </div>
  );
};

export default HomePage;