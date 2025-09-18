import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import internships from '../data/internships.json';
import { Progress } from '@radix-ui/react-progress';

const calculateMatchScore = (internship, formData) => {
  let score = 0;
  let reasons = [];
  let skillsMatched = [];
  let missingSkills = [];

  // Skills match +40%
  const matchedSkills = internship.skills.filter(skill =>
    formData.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
  );
  if (matchedSkills.length > 0) {
    score += 40;
    reasons.push(`Matches your skills: ${matchedSkills.join(', ')}`);
    skillsMatched = matchedSkills;
  }

  // Sector interest +30%
  if (formData.sectors.includes(internship.sector)) {
    score += 30;
    reasons.push(`Matches your sector interest: ${internship.sector}`);
  }

  // Location +20%
  if (formData.location === internship.location) {
    score += 20;
    reasons.push(`Preferred location: ${internship.location}`);
  }

  // Education +10%
  if (
    (formData.education === 'highschool' && internship.education === 'highschool') ||
    (formData.education === 'undergrad' && ['undergrad', 'grad'].includes(internship.education)) ||
    (formData.education === 'grad' && internship.education === 'grad')
  ) {
    score += 10;
    reasons.push(`Education level fits: ${formData.education}`);
  } else {
    reasons.push(`Education level mismatch`);
  }

  // Skill gap
  missingSkills = internship.skills.filter(
    skill => !formData.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
  );

  return {
    score,
    reasons,
    skillsMatched,
    missingSkills,
  };
};

const RecommendationPage = () => {
  const location = useLocation();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const formData = location.state?.formData;
    if (!formData) {
      setRecommendations([]);
      return;
    }

    // Calculate match scores for all internships
    const scored = internships.map(internship => {
      const { score, reasons, skillsMatched, missingSkills } = calculateMatchScore(internship, formData);
      return {
        ...internship,
        match: score,
        reasons,
        skillsMatched,
        missingSkills,
      };
    });

    // Sort by score descending and take top 3
    const top3 = scored.sort((a, b) => b.match - a.match).slice(0, 3);
    setRecommendations(top3);
  }, [location.state]);

  const handleAction = (action) => {
    alert(`${action} clicked! (Mock functionality)`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Your Top 3 Internship Matches</h2>
      {recommendations.length === 0 ? (
        <p className="text-center text-gray-600">Please fill the input form first.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold mb-4">{rec.title}</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Match Percentage</label>
                <Progress value={rec.match} className="w-full" />
                <span className="text-sm text-gray-600">{rec.match}%</span>
              </div>
              <p className="mb-2"><strong>Why this?</strong> {rec.reasons.join(' + ')}</p>
              <p className="mb-2"><strong>Skill Gap:</strong> {rec.skillGap}</p>
              <p className="mb-4"><strong>Career Path:</strong> {rec.careerPath}</p>
              <div className="mb-4">
                <strong>Explainability:</strong>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                  <li>✅ Skills matched: {rec.skillsMatched.join(', ') || 'None'}</li>
                  <li>⚠️ Missing skills: {rec.missingSkills.join(', ') || 'None'}</li>
                  <li>📍 Location fit: {rec.location === location.state?.formData.location ? 'Yes' : 'No'}</li>
                </ul>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAction('Apply')}
                  className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Apply
                </button>
                <button
                  onClick={() => handleAction('Save')}
                  className="bg-secondary text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => handleAction('Share')}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;
