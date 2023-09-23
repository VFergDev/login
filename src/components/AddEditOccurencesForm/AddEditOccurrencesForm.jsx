import React, { useState } from 'react';
import './addEditOccurrencesForm.css';

const AddEditOccurrencesForm = () => {
  const [occurrences, setOccurrences] = useState([]);
  const [activities, setActivities] = useState([]);
  const [otherOccurrences, setOtherOccurrences] = useState('');
  const [otherActivities, setOtherActivities] = useState('');
  const [time, setTime] = useState(getCurrentTime());
  const [date, setDate] = useState(getCurrentDate());
  const [details, setDetails] = useState('');

  const occurrenceOptions = [
    'Shortness of Breath',
    'Heart racing',
    'Heart Skipping or pounding',
    'Neck, jaw, or arm tingling',
    'Loss of consciousness',
    'Chest pain or pressure',
    'Nausea',
    'Tired/Fatigue',
    'Anxiety',
    'Blood pressure drop',
    'Blood pressure increase',
    'Pass out',
  ];

  const activitiesOptions = [
    'Sitting',
    'Walking',
    'Taking medication',
    'Eating',
    'Standing',
    'Exercising',
    'Sleeping',
    // Add more activities here
  ];

  const handleOccurrenceChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setOccurrences((prevOccurrences) => [...prevOccurrences, value]);
    } else {
      setOccurrences((prevOccurrences) =>
        prevOccurrences.filter((item) => item !== value)
      );
    }
  };

  const handleActivitiesChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setActivities((prevActivities) => [...prevActivities, value]);
    } else {
      setActivities((prevActivities) =>
        prevActivities.filter((item) => item !== value)
      );
    }
  };

  const handleOtherOccurrenceChange = (event) => {
    setOtherOccurrences(event.target.value);
  };

  const handleOtherActivitiesChange = (event) => {
    setOtherActivities(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setDetails(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Collect the form data
    const formData = {
      occurrences,
      activities,
      otherOccurrences,
      otherActivities,
      time,
      date,
      details,
    };

    // Send formData to your server (replace '/your-server-endpoint' with your actual endpoint)
    fetch('http://localhost:3001/occurrences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch.
        console.error('Error:', error);
      });

    // Reset the form fields
    setOccurrences([]);
    setActivities([]);
    setOtherOccurrences('');
    setOtherActivities('');
    setTime(getCurrentTime());
    setDate(getCurrentDate());
    setDetails('');
  };

  // Helper function to get the current date in 'YYYY-MM-DD' format
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Helper function to get the current time in 'hh:mm' format
  function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  return (
    <div className='Add_Occurrences_container'>
      <form onSubmit={handleSubmit}>
        <div className='Occurrences_Activities_container'>
          <div className='Occurrences_container'>
            <label>Occurrences:</label>
            {occurrenceOptions.map((option) => (
              <div key={option} className='label-item'>
                <label>
                  <input
                    type='checkbox'
                    value={option}
                    checked={occurrences.includes(option)}
                    onChange={handleOccurrenceChange}
                  />
                  {option}
                </label>
              </div>
            ))}
            <div className='label-item'>
              <label>
                <input
                  type='checkbox'
                  value='Other'
                  checked={occurrences.includes('Other')}
                  onChange={handleOccurrenceChange}
                />
                Other:
                <input
                  type='text'
                  value={otherOccurrences}
                  onChange={handleOtherOccurrenceChange}
                />
              </label>
            </div>
          </div>
          <div className='Activities_container'>
            <label>Activities during occurrence:</label>
            {activitiesOptions.map((option) => (
              <div key={option} className='label-item'>
                <label>
                  <input
                    type='checkbox'
                    value={option}
                    checked={activities.includes(option)}
                    onChange={handleActivitiesChange}
                  />
                  {option}
                </label>
              </div>
            ))}
            <div className='label-item'>
              <label>
                <input
                  type='checkbox'
                  value='Other'
                  checked={activities.includes('Other')}
                  onChange={handleActivitiesChange}
                />
                Other:
                <input
                  type='text'
                  value={otherActivities}
                  onChange={handleOtherActivitiesChange}
                />
              </label>
            </div>
            <div className='label-item'>
              <label>Details: </label>
              <textarea
                type='textbox'
                value={details}
                onChange={handleDetailsChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div>
          <label>Time:</label>
          <input type='time' value={time} onChange={handleTimeChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type='date' value={date} onChange={handleDateChange} />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AddEditOccurrencesForm;
