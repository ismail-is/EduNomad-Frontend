import { NavLink } from "react-router-dom";
import { publicUser } from "../../../../../globals/route-names";
import {
  Backpack,
  BookOpenText,
  Computer,
  GraduationCap,
  LaptopMinimal,
  NotepadText,
  Palette,
  Puzzle
} from "lucide-react";

function SectionJobCategories() {
  // Array of category items
  const categories = [
    {
      id: 1,
      Icon: Backpack,
      jobs: "9,185 Jobs",
      title: "Primary Education",
      description: "For foundational teaching roles in early grades"
    },
    {
      id: 2,
      Icon: GraduationCap,
      jobs: "3,205 Jobs",
      title: "Secondary & High School",
      description: "Subject-based teaching for older students"
    },
    {
      id: 3,
      Icon: Computer,
      jobs: "2,100 Jobs",
      title: "STEM Subjects",
      description: "Math, Science, Computer Science, etc."
    },
    {
      id: 4,
      Icon: BookOpenText,
      jobs: "1,500 Jobs",
      title: "Humanities & Languages",
      description: "English, History, Geography, Foreign Languages"
    },
    {
      id: 5,
      Icon: LaptopMinimal,
      jobs: "9,185 Jobs",
      title: "Online Tutoring",
      description: "Remote roles for private or group sessions"
    },
    {
      id: 6,
      Icon: Puzzle,
      jobs: "3,205 Jobs",
      title: "Special Education",
      description: "Roles tailored to students with special needs",
      bold: true
    },
    {
      id: 7,
      Icon: NotepadText,
      jobs: "2,100 Jobs",
      title: "Test Prep & Coaching",
      description: "SAT, GRE, IELTS, NEET, JEE, etc.",
      bold: true
    },
    {
      id: 8,
      Icon: Palette,
      jobs: "1,500 Jobs",
      title: "Arts & Creative Subjects",
      description: "Music, Visual Arts, Performing Arts",
      bold: true
    }
  ];

  return (
    <>
      <div className="section-full p-t120 p-b90 site-bg-gray twm-job-categories-area2">
        {/* title START */}
        <div className="section-head center wt-small-separator-outer">
          <div className="wt-small-separator site-text-primary">
            <div>Jobs by Categories</div>
          </div>
          <h2 className="wt-title">Choose Your Desire Category</h2>
        </div>
        {/* title END */}
        <div className="container">
          <div className="twm-job-categories-section-2 m-b30">
            <div className="job-categories-style1 m-b30">
              <div className="row">
                {categories.map((cat) => (
                  <div key={cat.id} className="col-lg-3 col-md-6">
                    <div className="job-categories-block-2 m-b30">
                      <div className="twm-media">
                        <cat.Icon
                          style={{
                            height: '50px',
                            width: '50px',
                            color: '#D6CB00'
                          }}
                        />
                      </div>
                      <div className="twm-content">
                        <div className="twm-jobs-available">{cat.jobs}</div>
                        <NavLink >
                        <b>{cat.title}</b>
                        </NavLink>
                        <p>{cat.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="text-center job-categories-btn">
              <NavLink to={publicUser.jobs.GRID} className="site-button">
                All Categories
              </NavLink>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionJobCategories;
