import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import JobZImage from "../../../../common/jobz-img";
import SectionRecordsFilter from "../../sections/common/section-records-filter";
import SectionJobsSidebar1 from "../../sections/jobs/sidebar/section-jobs-sidebar1";
import SectionPagination from "../../sections/common/section-pagination";
import { useEffect } from "react";
import { loadScript } from "../../../../../globals/constants";

function EmployersListPage() {
    const _filterConfig = {
        prefix: "Showing",
        type: "Result",
        total: "10",
        showRange: true,
        showingUpto: "8"
    }

    // Employer data array
const employersData = [
  {
    id: 1,
    name: "Priya Mehta",
    location: "Mumbai, Maharashtra",
    education: "M.A. in English Literature",
    experience: "5 years",
    subjects: ["English", "Creative Writing"],
    logo: "images/Candidt/pic1.jpg"
  },
  {
    id: 2,
    name: "Ramesh Iyer",
    location: "Chennai, Tamil Nadu",
    education: "B.Sc. in Mathematics, B.Ed.",
    experience: "6 years",
    subjects: ["Mathematics", "Algebra", "Geometry"],
    logo: "images/Candidt/pic2.jpg"
  },
  {
    id: 3,
    name: "Ayesha Khan",
    location: "Lucknow, Uttar Pradesh",
    education: "M.Sc. in Physics",
    experience: "4 years",
    subjects: ["Physics", "Science (Grades 9–12)"],
    logo: "images/Candidt/pic3.jpg"
  },
  {
    id: 4,
    name: "Nikhil Sharma",
    location: "Jaipur, Rajasthan",
    education: "B.Com., Diploma in Accountancy",
    experience: "3 years",
    subjects: ["Commerce", "Accounting", "Business Studies"],
    logo: "images/Candidt/pic4.jpg"
  },
  {
    id: 5,
    name: "Sneha Roy",
    location: "Kolkata, West Bengal",
    education: "M.A. in History, B.Ed.",
    experience: "7 years",
    subjects: ["History", "Politics", "Social Science"],
    logo: "images/Candidt/pic5.jpg"
  },
  {
    id: 6,
    name: "Arjun Patel",
    location: "Ahmedabad, Gujarat",
    education: "B.Tech. in Computer Science",
    experience: "2 years",
    subjects: ["Computer Science", "Coding (Python, Java)"],
    logo: "images/Candidt/pic6.jpg"
  },
  {
    id: 7,
    name: "Priya Mehta",
    location: "Mumbai, Maharashtra",
    education: "M.A. in English Literature",
    experience: "5 years",
    subjects: ["English", "Creative Writing"],
    logo: "images/Candidt/pic3.jpg"
  },
  {
    id: 8,
    name: "Ramesh Iyer",
    location: "Chennai, Tamil Nadu",
    education: "B.Sc. in Mathematics, B.Ed.",
    experience: "6 years",
    subjects: ["Mathematics", "Algebra", "Geometry"],
    logo: "images/Candidt/pic2.jpg"
  },
  {
    id: 9,
    name: "Ayesha Khan",
    location: "Lucknow, Uttar Pradesh",
    education: "M.Sc. in Physics",
    experience: "4 years",
    subjects: ["Physics", "Science (Grades 9–12)"],
    logo: "images/Candidt/pic1.jpg"
  },
];


    useEffect(() => {
        loadScript("js/custom.js")
    })

    return (
        <>
            <div className="section-full p-t120  p-b90 site-bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 rightSidebar">
                            <SectionJobsSidebar1 /> 
                        </div>
                        <div className="col-lg-8 col-md-12">
                            {/*Filter Short By*/}
                            <SectionRecordsFilter _config={_filterConfig} />

                            <div className="twm-employer-list-wrap">
                                <ul>
                                    {employersData.map((employer) => (
                                        <li key={employer.id}>
                                            <div className="twm-employer-list-style1 mb-5">
                                                <div className="twm-media">
                                                    <JobZImage src={employer.logo} alt="#" />
                                                </div>
                                                <div className="twm-mid-content">
                                                    <NavLink to={publicUser.employer.DETAIL1} className="twm-job-title">
                                                        <h4>{employer.name}</h4>
                                                    </NavLink>
                                                    <p className="twm-job-address">{employer.location}</p>
                                                    <NavLink to={publicUser.employer.DETAIL1} className="twm-job-websites site-text-primary">
                                                        {employer.education}
                                                    </NavLink>
                                                </div>
                                                <div className="twm-right-content">
                                                    <div className="twm-jobs-vacancies">
                                                        <span>{employer.experience}</span>Vacancies
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <SectionPagination />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployersListPage;
