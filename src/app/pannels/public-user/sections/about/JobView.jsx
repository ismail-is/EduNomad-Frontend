import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import JobZImage from "../../../../common/jobz-img";
import axios from 'axios';

export default function JobView() {
  const [showComponent, setShowComponent] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role !== "parent" && user.role !== "tutor") {
        setShowComponent(true);
        fetchJobs();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:7001/api/jobview');
      
      // Ensure we're working with an array
      let jobsData = response.data;
      
      // If the response is an object, check if it has a data property
      if (jobsData && typeof jobsData === 'object' && !Array.isArray(jobsData)) {
        // Try to extract an array from common response structures
        if (Array.isArray(jobsData.data)) {
          jobsData = jobsData.data;
        } else if (Array.isArray(jobsData.jobs)) {
          jobsData = jobsData.jobs;
        } else if (Array.isArray(jobsData.items)) {
          jobsData = jobsData.items;
        } else {
          // Convert object to array if it's a single job
          jobsData = [jobsData];
        }
      }
      
      // If it's still not an array, set to empty array
      if (!Array.isArray(jobsData)) {
        console.error('API response is not an array:', jobsData);
        setJobs([]);
      } else {
        setJobs(jobsData);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Failed to load jobs');
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getDaysAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 30) return `${diffDays} days ago`;
      if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months !== 1 ? 's' : ''} ago`;
      }
      
      const years = Math.floor(diffDays / 365);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    } catch (error) {
      return 'Some time ago';
    }
  };

  const getEmploymentTypeClass = (type) => {
    const typeMap = {
      'Full-time': 'twm-bg-purple',
      'Part-time': 'twm-bg-green',
      'Internship': 'twm-bg-brown',
      'Temporary': 'twm-bg-golden'
    };
    return typeMap[type] || 'twm-bg-green';
  };

  if (!showComponent) {
    return null;
  }

  if (loading) {
    return (
      <div className="section-full p-t120 p-b90 site-bg-gray">
        <div className="container">
          <div className="text-center">Loading jobs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-full p-t120 p-b90 site-bg-gray">
        <div className="container">
          <div className="text-center text-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-full p-t120 p-b90 site-bg-gray twm-bg-ring-wrap2">
      <div className="twm-bg-ring-right"></div>
      <div className="twm-bg-ring-left"></div>
      <div className="container">
        <div className="wt-separator-two-part">
          <div className="row wt-separator-two-part-row">
            <div className="col-xl-6 col-lg-6 col-md-12 wt-separator-two-part-left">
              <div className="section-head left wt-small-separator-outer">
                <div className="wt-small-separator site-text-primary">
                  <div>All Jobs Post</div>
                </div>
                <h2 className="wt-title">Find Your Career You Deserve it</h2>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-12 wt-separator-two-part-right text-right">
              <NavLink to={publicUser.jobs.LIST} className="site-button">Browse All Jobs</NavLink>
            </div>
          </div>
        </div>
        <div className="section-content">
          {jobs.length === 0 ? (
            <div className="text-center">
              <p>No jobs available at the moment.</p>
            </div>
          ) : (
            <div className="twm-jobs-grid-wrap">
              <div className="row">
                {jobs.map((job) => (
                  <div className="col-lg-6 col-md-6" key={job._id}>
                    <div className="twm-jobs-grid-style1 m-b30">
                      <div className="twm-media">
                        <JobZImage src="images/client-logo2/instLogo.png" alt="Company Logo" />
                      </div>
                      <span className="twm-job-post-duration">{getDaysAgo(job.createdAt)}</span>
                      <div className="twm-jobs-category green">
                        <span className={getEmploymentTypeClass(job.employmentType)}>
                          {job.employmentType}
                        </span>
                      </div>
                      <div className="twm-mid-content">
                        <NavLink to={`${publicUser.jobs.DETAIL1}/${job._id}`} className="twm-job-title">
                          <h4>{job.titel || job.title || 'No Title'}</h4>
                        </NavLink>
                        <p className="twm-job-address">{job.location || 'Location not specified'}</p>
                        <p>Department: {job.department || 'Not specified'}</p>
                        <p>Employment Type: {job.employmentType || 'Not specified'}</p>
                      </div>
                      <div className="twm-right-content">
                        <div className="twm-jobs-amount">
                          Apply Before: <span>{formatDate(job.lastdate)}</span>
                        </div>
                        <NavLink to={`/apply/${job._id}`} className="twm-jobs-browse site-text-primary">
                          Apply Now
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}