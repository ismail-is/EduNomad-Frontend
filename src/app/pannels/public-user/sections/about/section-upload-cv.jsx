import { publicUrlFor } from "../../../../../globals/constants";
import JobZImage from "../../../../common/jobz-img";

function SectionUploadCV() {
    return (
        <>
            <div className="section-full p-t120 p-b120 twm-explore-area bg-cover " style={{ backgroundImage: `url(${publicUrlFor("images/background/abtbg.jpg")})` }}>
                <div className="container">
                    <div className="section-content">
                        <div className="row">
                            <div className="col-lg-4 col-md-12">
                                <div className="twm-explore-media-wrap">
                                    <div className="twm-media">
                                        <JobZImage src="images/background/gir-large.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                                <div className="twm-explore-content-outer">
                                    <div className="twm-explore-content">
                                        <div className="twm-l-line-1" />
                                        <div className="twm-l-line-2" />
                                        <div className="twm-r-circle-1" />
                                        <div className="twm-r-circle-2" />
                                        <div className="twm-title-large">
                                            <h2 style={{fontSize:'34px'}}>About Us</h2>
                                            <p>This platform was created to bridge the gap between talented teachers and the schools that need them, and between skilled tutors and families seeking quality education. Based in Lagos, Nigeria, we are especially committed to empowering African educators—helping them sharpen their skills, gain global exposure, and compete confidently for international roles. </p>
                                        <p>With 20 years of international teaching experience, our founder brings a deep insight and passion to the world of educational recruitment. From classrooms in the UK to schools across Egypt, Kenya, India, and Nigeria, this journey has shaped a mission: to connect exceptional educators with the opportunities they deserve.</p>
                                            <p>We strongly believe that world-class teaching talent can come from anywhere. It’s time the world recognized that the most inspiring educators aren't always found in the traditional places—and we are here to prove it.</p>
                                        </div>
                                        <div className="twm-upload-file">
                                            <button type="button" className="site-button">Upload Your Resume <i className="feather-upload" /></button>
                                        </div>
                                    </div>
                                    <div className="twm-bold-circle-right" />
                                    <div className="twm-bold-circle-left" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SectionUploadCV;