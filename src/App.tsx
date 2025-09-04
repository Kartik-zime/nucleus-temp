import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import { MeetingUploader } from './components/MeetingUploader';
import { TranscriptUpdater } from './components/TranscriptUpdater';
import { SpeakerNameUpdater } from './components/SpeakerNameUpdater';
import { DurationUpdater } from './components/DurationUpdater';
import { DealStageMapper } from './components/DealStageMapper';
import { Upload, FileText, Users, Clock, Map, LogOut, User } from 'lucide-react';
import logo from './assets/zime-logo.png';

type Section = 'meeting' | 'transcript' | 'speaker' | 'duration' | 'deal-stage';

function App() {
  const [user, loading] = useAuthState(auth);
  const [currentSection, setCurrentSection] = useState<Section>('meeting');

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to sign out. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b flex flex-col items-center">
          <img 
            src={logo}
            alt="Zime" 
            className="h-8 w-auto"
          />
          <span className="mt-2 italic text-[#6f3096] text-2xl font-bold">Nucleus</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            <button
              onClick={() => setCurrentSection('meeting')}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentSection === 'meeting'
                  ? 'bg-orange-100 text-orange-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Upload size={20} />
              Upload Meeting
            </button>
            <button
              onClick={() => setCurrentSection('transcript')}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentSection === 'transcript'
                  ? 'bg-orange-100 text-orange-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <FileText size={20} />
              Update Transcript
            </button>
            <button
              onClick={() => setCurrentSection('speaker')}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentSection === 'speaker'
                  ? 'bg-orange-100 text-orange-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Users size={20} />
              Update Speaker
            </button>
            <button
              onClick={() => setCurrentSection('duration')}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentSection === 'duration'
                  ? 'bg-orange-100 text-orange-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Clock size={20} />
              Update Duration
            </button>
            <button
              onClick={() => setCurrentSection('deal-stage')}
              className={`w-full flex flex-nowrap items-center justify-between gap-2 px-4 py-2 rounded-lg transition-colors ${
                currentSection === 'deal-stage'
                  ? 'bg-orange-100 text-orange-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                <Map size={20} />
                <span className="whitespace-nowrap">Map Deal Stages</span>
              </span>
              <span className="text-xs text-red-600 font-semibold ml-2 whitespace-nowrap">(WIP)</span>
            </button>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t mt-auto">
          <div className="flex flex-col space-y-3 items-center w-full">
            <div className="flex items-center gap-2 text-sm text-gray-600 justify-center">
              <User size={16} className="text-gray-400" />
              <span className="truncate">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-8 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors justify-center"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {currentSection === 'meeting' && <MeetingUploader />}
        {currentSection === 'transcript' && <TranscriptUpdater />}
        {currentSection === 'speaker' && <SpeakerNameUpdater />}
        {currentSection === 'duration' && <DurationUpdater />}
        {currentSection === 'deal-stage' && <DealStageMapper />}
      </div>
    </div>
  );
}

export default App;