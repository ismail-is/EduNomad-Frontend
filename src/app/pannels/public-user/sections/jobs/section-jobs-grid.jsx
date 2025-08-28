import JobZImage from "../../../../common/jobz-img";
import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import SectionPagination from "../common/section-pagination";

function SectionJobsGrid() {
  // Array of job items
  const jobsData = [
    {
      id: 1,
      logo: "images/client-logo2/instLogo.png",
      postDuration: "1 days ago",
      categoryLabel: "New",
      categoryClass: "twm-bg-green",
      title: "English Teacher",
      address: "Pune, Maharashtra",
      qualification: " B.A. in English + B.Ed",
      Experience: " Minimum 3 years",
      link: publicUser.jobs.DETAIL1,
    },
    {
      id: 2,
      logo: "images/client-logo2/instLogo.png",
      postDuration: "15 days ago",
      categoryLabel: "Intership",
      categoryClass: "twm-bg-brown",
      title: "Science Teacher (Physics Focus)",
      address: "Bengaluru, Karnataka",
      qualification: " M.Sc. in Physics + B.Ed",
      Experience: " Minimum 2 years",
      link: publicUser.jobs.DETAIL1,
    },
    {
      id: 3,
      logo: "images/client-logo2/instLogo.png",
      postDuration: "6 Month ago",
      categoryLabel: "Fulltime",
      categoryClass: "twm-bg-purple",
      title: "Mathematics Tutor (Online)",
      address: "Remote (based in India)",
      qualification: "  B.Sc. or M.Sc. in Mathematics",
      Experience: " 1+ year of online teaching ",
      link: publicUser.jobs.DETAIL1,
    },
    {
      id: 4,
      logo: "images/client-logo2/instLogo.png",
      postDuration: "2 days ago",
      categoryLabel: "Freelancer",
      categoryClass: "twm-bg-sky",
      title: "Art & Craft Teacher",
      address: " Jaipur, Rajasthan",
      qualification: " Diploma or Degree in Fine Arts",
      Experience: " Minimum 3 years",
      link: publicUser.jobs.DETAIL1,
    },
    {
      id: 5,
      logo: "images/client-logo2/instLogo.png",
      postDuration: "1 days ago",
      categoryLabel: "Temporary",
      categoryClass: "twm-bg-golden",
      title: "Physics Teacher",
      address: "Noida, Mumbai",
      qualification: " B.Sc in Physics",
      Experience: " 1 years",
      link: publicUser.jobs.DETAIL1,
    },
    {
      id: 6,
      logo: "images/client-logo2/instLogo.png",
      postDuration: "1 days ago",
      categoryLabel: "New",
      categoryClass: "twm-bg-green",
      title: "English Teacher",
      address: "Mangalore",
      qualification: " B.A. in English + B.Ed",
      Experience: " Minimum 3 years",
      link: publicUser.jobs.DETAIL1,
    },
    // {
    //   id: 7,
    //   logo: "images/client-logo2/instLogo.png",
    //   postDuration: "1 days ago",
    //   categoryLabel: "New",
    //   categoryClass: "twm-bg-green",
    //   title: "Senior Web Designer , Developer",
    //   address: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    //   qualification: " B.A. in English + B.Ed",
    //   Experience: " Minimum 3 years",
    //   link: publicUser.jobs.DETAIL1,
    // },
    // {
    //   id: 8,
    //   logo: "images/client-logo2/instLogo.png",
    //   postDuration: "15 days ago",
    //   categoryLabel: "Intership",
    //   categoryClass: "twm-bg-brown",
    //   title: "Senior Rolling Stock Technician",
    //   address: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    //   qualification: " B.A. in English + B.Ed",
    //   Experience: " Minimum 3 years",
    //   link: publicUser.jobs.DETAIL1,
    // },
    // {
    //   id: 9,
    //   logo: "images/client-logo2/instLogo.png",
    //   postDuration: "6 Month ago",
    //   categoryLabel: "Fulltime",
    //   categoryClass: "twm-bg-purple",
    //   title: "IT Department Manager",
    //   address: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    //   website: "https://thewebmax.com",
    //   amount: "$2500",
    //   period: "/ Month",
    //   link: publicUser.jobs.DETAIL1,
    // },
    // {
    //   id: 10,
    //   logo: "images/client-logo2/instLogo.png",
    //   postDuration: "2 days ago",
    //   categoryLabel: "Freelancer",
    //   categoryClass: "twm-bg-sky",
    //   title: "Art Production Specialist",
    //   address: "1363-1385 Sunset Blvd Los Angeles, CA 90026, USA",
    //   website: "https://thewebmax.com",
    //   amount: "$1800",
    //   period: "/ Month",
    //   link: publicUser.jobs.DETAIL1,
    // },
  ];

  return (
    <>
      <div className="row">
        {jobsData.map((job) => (
          <div
            key={job.id}
            className={`${
              job.id === 5 || job.id === 6
                ? "masonry-item "
                : ""
            }col-lg-6 col-md-12 m-b30`}
          >
            <div className="twm-jobs-grid-style1">
              <div className="twm-media">
                <JobZImage src={job.logo} alt="#" />
              </div>
              <span className="twm-job-post-duration">{job.postDuration}</span>
              <div className="twm-jobs-category green">
                <span className={job.categoryClass}>{job.categoryLabel}</span>
              </div>
              <div className="twm-mid-content">
                <NavLink to={job.link} className="twm-job-title">
                  <h4>{job.title}</h4>
                </NavLink>
                <p className="twm-job-address">{job.address}</p>
                {/* <a href={job.website} className="twm-job-websites site-text-primary"> */}
                  {job.qualification}
                {/* </a> */}
              </div>
              <div className="twm-right-content">
                <div className="twm-jobs-amount">
                  {job.Experience}
                </div>
                <NavLink to={job.link} className="twm-jobs-browse site-text-primary">
                  Apply now
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SectionPagination />
    </>
  );
}

export default SectionJobsGrid;
