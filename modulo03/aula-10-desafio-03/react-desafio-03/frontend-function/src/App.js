import React, { useState, useEffect } from 'react';

import ApiService from './services/ApiService';

import Title from './components/Title';
import Candidates from './components/Candidates';

export default function App() {
  const [candidates, setCandidates] = useState([]);
    
  useEffect(() => {
      const interval = setInterval(async () => {
      const api = new ApiService('http://localhost:8080');
      const voteData = await api.getVotes();
      const { candidates } = voteData;
      
      const newCandidates = handleCandidates(candidates);
      setCandidates(newCandidates);
    }, 500);
    return () => {
      clearInterval(interval);
    }
  }, [candidates]);

  const handleCandidates = (candidates) => {

    return candidates.map((candidate) => {
      const { id } = candidate;
      const previousCandidate = candidates.find((item) => item.id === id);

      return {
        ...candidate,
        previousVotes: !!previousCandidate ? previousCandidate.votes : 0,
        previousPercentage: !!previousCandidate
          ? previousCandidate.percentage
          : 0,
      };
    });
  }

  return (
    <>
      <Title>Votação</Title>
      <Candidates candidates={candidates} />
    </>
  );
}
