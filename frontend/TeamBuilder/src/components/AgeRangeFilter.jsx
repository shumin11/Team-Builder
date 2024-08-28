import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembersByAgeRangeAsync } from '../features/thunks';

const AgeRangeFilter = () => {
    const dispatch = useDispatch();
    const currentAgeRange = useSelector((state) => state.members.ageRange);
    const [minAge, setMinAge] = useState(currentAgeRange[0]);
    const [maxAge, setMaxAge] = useState(currentAgeRange[1]);

    const handleMinAgeChange = (e) => {
      setMinAge(Number(e.target.value));
    };
  
    const handleMaxAgeChange = (e) => {
      setMaxAge(Number(e.target.value));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(getMembersByAgeRangeAsync({ minAge, maxAge }));
    };
  
    return (
      <form onSubmit={handleSubmit} className="age-range-form">
        <label htmlFor="minAge">Min Age:</label>
        <input
          type="number"
          id="minAge"
          name="minAge"
          value={minAge}
          onChange={handleMinAgeChange}
          min="0"
          max="100"
        />
        <label htmlFor="maxAge">Max Age:</label>
        <input
          type="number"
          id="maxAge"
          name="maxAge"
          value={maxAge}
          onChange={handleMaxAgeChange}
          min="0"
          max="100"
        />
        <button type="submit">Set Age Range</button>
      </form>
    );
  };
  
  export default AgeRangeFilter;