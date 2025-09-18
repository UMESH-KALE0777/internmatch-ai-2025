import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputForm = () => {
  const [formData, setFormData] = useState({
    education: '',
    skills: '',
    sectors: [],
    location: '',
  });
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const skillsArray = Array.isArray(formData.skills)
      ? formData.skills.map(s => s.trim()).filter(s => s)
      : formData.skills.split(',').map(s => s.trim()).filter(s => s);
    const updatedFormData = { ...formData, skills: skillsArray };
    navigate('/recommendations', { state: { formData: updatedFormData } });
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData(prev => ({
        ...prev,
        skills: prev.skills ? prev.skills + ', ' + transcript : transcript
      }));
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Tell Us About Yourself</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Education Level</label>
          <select
            value={formData.education}
            onChange={(e) => setFormData({ ...formData, education: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="highschool">High School</option>
            <option value="undergrad">Undergraduate</option>
            <option value="grad">Graduate</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Skills</label>
          <input
            type="text"
            placeholder="e.g., JavaScript, Python"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({ ...formData, skills: e.target.value.split(',') })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Sector Interests</label>
          <div className="flex flex-wrap">
            {['Tech', 'Finance', 'Healthcare', 'Education'].map((sector) => (
              <label key={sector} className="mr-4">
                <input
                  type="checkbox"
                  value={sector}
                  onChange={(e) => {
                    const newSectors = e.target.checked
                      ? [...formData.sectors, sector]
                      : formData.sectors.filter((s) => s !== sector);
                    setFormData({ ...formData, sectors: newSectors });
                  }}
                />
                {sector}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location Preference</label>
          <select
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="remote">Remote</option>
            <option value="onsite">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={handleVoiceInput}
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-green-600"
          >
            🎤 Voice Input
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-600"
        >
          Get Recommendations
        </button>
      </form>
    </div>
  );
};

export default InputForm;
