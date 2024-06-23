import React, { useState,useEffect } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [formVisible, setFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Age must be a number greater than 0';
    }
    if (formData.attendingWithGuest === 'Yes' && !formData.guestName) {
      newErrors.guestName = 'Guest name is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmittedData(formData);
      alert('Form submitted successfully !')
      setFormVisible(false);
    }
  };
  useEffect(() => {
    if (formVisible) {
      setErrors({});
    }
  }, [formVisible]);

  return (
    <div className="app-container">
      {formVisible && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              {errors.name && <span className='error-message'>{errors.name}</span>}
            </div>
            <div>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
              {errors.email && <span className='error-message'>{errors.email}</span>}
            </div>
            <div>
              <label>
                Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
              </label>
              {errors.age && <span className='error-message'>{errors.age}</span>}
            </div>
            <div>
              <label>
                Are you attending with a guest?
                <select
                  name="attendingWithGuest"
                  value={formData.attendingWithGuest}
                  onChange={handleChange}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </label>
            </div>
            {formData.attendingWithGuest === 'Yes' && (
              <div>
                <label>
                  Guest Name:
                  <input
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                  />
                </label>
                {errors.guestName && <span>{errors.guestName}</span>}
              </div>
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {!formVisible && (
        <div className="summary-card">
          <h2>Registration Summary</h2>
          <p>
            <strong>Name:</strong> {submittedData.name}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Age:</strong> {submittedData.age}
          </p>
          <p>
            <strong>Attending with Guest:</strong> {submittedData.attendingWithGuest}
          </p>
          {submittedData.attendingWithGuest === 'Yes' && (
            <p>
              <strong>Guest Name:</strong> {submittedData.guestName}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
