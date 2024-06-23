import React, { useState ,useEffect} from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    applyingForPosition: '',
    relevantExperience: '',
    portfolioURL: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
      Java: false,
      Ruby: false,
      Other: false,
    },
    preferredInterviewTime: '',
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    setErrors({});
  }, [formData, formVisible]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, additionalSkills: { ...formData.additionalSkills, [name]: checked } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (formData.phoneNumber.length < 10 || isNaN(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be a valid number';
    }
    if (!formData.applyingForPosition) {
      newErrors.applyingForPosition = 'Applying for Position is required';
    }
    if (formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') {
      if (!formData.relevantExperience) {
        newErrors.relevantExperience = 'Relevant Experience is required';
      } else if (isNaN(formData.relevantExperience) || formData.relevantExperience <= 0) {
        newErrors.relevantExperience = 'Relevant Experience must be a number greater than 0';
      }
    }
    if (formData.applyingForPosition === 'Designer') {
      if (!formData.portfolioURL) {
        newErrors.portfolioURL = 'Portfolio URL is required';
      } else if (!isValidUrl(formData.portfolioURL)) {
        newErrors.portfolioURL = 'Portfolio URL is not valid';
      }
    }
    if (formData.applyingForPosition === 'Manager') {
      if (!formData.managementExperience) {
        newErrors.managementExperience = 'Management Experience is required';
      }
    }
    if (!Object.values(formData.additionalSkills).some((skill) => skill === true)) {
      newErrors.additionalSkills = 'At least one additional skill must be selected';
    }
    if (!formData.preferredInterviewTime) {
      newErrors.preferredInterviewTime = 'Preferred Interview Time is required';
    } else if (!isValidDateTime(formData.preferredInterviewTime)) {
      newErrors.preferredInterviewTime = 'Preferred Interview Time is not valid';
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
      alert('Form submitted successfully!')
      setFormVisible(false);
    }
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return !isNaN(dateTime.getTime());
  };

  return (
    <div className="app-container">
      {formVisible && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Full Name:
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
              </label>
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>
            <div>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div>
              <label>
                Phone Number:
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </label>
              {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
            </div>
            <div>
              <label>
                Applying for Position:
                <select
                  name="applyingForPosition"
                  value={formData.applyingForPosition}
                  onChange={handleChange}
                >
                  <option value="">Select Position</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
              </label>
              {errors.applyingForPosition && <span className="error-message">{errors.applyingForPosition}</span>}
            </div>
            {(formData.applyingForPosition === 'Developer' || formData.applyingForPosition === 'Designer') && (
              <div>
                <label>
                  Relevant Experience (years):
                  <input
                    type="number"
                    name="relevantExperience"
                    value={formData.relevantExperience}
                    onChange={handleChange}
                  />
                </label>
                {errors.relevantExperience && <span className="error-message">{errors.relevantExperience}</span>}
              </div>
            )}
            {formData.applyingForPosition === 'Designer' && (
              <div>
                <label>
                  Portfolio URL:
                  <input
                    type="text"
                    name="portfolioURL"
                    value={formData.portfolioURL}
                    onChange={handleChange}
                  />
                </label>
                {errors.portfolioURL && <span className="error-message">{errors.portfolioURL}</span>}
              </div>
            )}
            {formData.applyingForPosition === 'Manager' && (
              <div>
                <label>
                  Management Experience:
                  <input
                    type="text"
                    name="managementExperience"
                    value={formData.managementExperience}
                    onChange={handleChange}
                  />
                </label>
                {errors.managementExperience && <span className="error-message">{errors.managementExperience}</span>}
              </div>
            )}
            <div>
              <label>
                Additional Skills:
                <div className="skills-container">
                  {Object.keys(formData.additionalSkills).map((skill) => (
                    <label key={skill}>
                      <input
                        type="checkbox"
                        name={skill}
                        checked={formData.additionalSkills[skill]}
                        onChange={handleChange}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
                {errors.additionalSkills && <span className="error-message">{errors.additionalSkills}</span>}
              </label>
            </div>
            <div>
              <label>
                Preferred Interview Time:
                <input
                  type="datetime-local"
                  name="preferredInterviewTime"
                  value={formData.preferredInterviewTime}
                  onChange={handleChange}
                />
              </label>
              {errors.preferredInterviewTime && <span className="error-message">{errors.preferredInterviewTime}</span>}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      {!formVisible && (
        <div className="summary-card">
          <h2>Job Application Summary</h2>
          <p>
            <strong>Full Name:</strong> {submittedData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Phone Number:</strong> {submittedData.phoneNumber}
          </p>
          <p>
            <strong>Applying for Position:</strong> {submittedData.applyingForPosition}
          </p>
          {(submittedData.applyingForPosition === 'Developer' || submittedData.applyingForPosition === 'Designer') && (
            <p>
              <strong>Relevant Experience:</strong> {submittedData.relevantExperience} years
            </p>
          )}
          {submittedData.applyingForPosition === 'Designer' && (
            <p>
              <strong>Portfolio URL:</strong> {submittedData.portfolioURL}
            </p>
          )}
          {submittedData.applyingForPosition === 'Manager' && (
            <p>
              <strong>Management Experience:</strong> {submittedData.managementExperience}
            </p>
          )}
          <p>
            <strong>Additional Skills:</strong>{' '}
            {Object.keys(submittedData.additionalSkills)
              .filter((skill) => submittedData.additionalSkills[skill])
              .join(', ')}
          </p>
          <p>
            <strong>Preferred Interview Time:</strong> {submittedData.preferredInterviewTime}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
