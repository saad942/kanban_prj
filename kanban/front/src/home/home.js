// Home.js
import React from "react";
import NAV from './Nav.js';
import Footer from './footer.js';
import Signup from './signup.js';
import './home.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from "react-router-dom";
function Home() {
    const navigate=useNavigate()

    const data =[
        {
            img:'./images/1.png'
        },{
            img:'./images/2.png'
        },{
            img:'./images/3.png'
        },{
            img:'./images/4.png'
        }

    ]
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };
    return (
        <div >
            <NAV />
            <section id="1">
                    
            <div className="cnt" style={{marginTop:'150px'}}>
                <div ><Signup/></div>
                
                <div style={{
                    marginTop:'-180px',
                    marginLeft: '750px',
                    height: '550px',
                    width: '500px',
                    borderRadius: '50px', 
                    overflow: 'hidden' 
                }}>
                    <img className="Mimag"
                        src="./images/back.jpeg"
                        alt=""
                        style={{
                            
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover' 
                        }}
                    />
                </div>
            </div>
           
            </section>
            <section id="2">
            <div className="container ">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2>Task</h2>
                            <p>
                                Task, duty, job, chore, stint, assignment mean a piece of work to be done.
                                Task implies work imposed by a person in authority or an employer or by circumstance.
                                Charged with a variety.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2>Management</h2>
                            <p>
                            Management (or managing) is the administration of organizations, whether 
                            they are a busine a nonprofit organization, 
                            or a government body through business administration, nonprofit management,
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h2>Ranking</h2>
                            <p>
                            A ranking is a relationship between a set of items such that, for any two items, 
                            the first is either "ranked higher than",
                             "ranked lower than" or "ranked equal to" the second. In mathematics
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
        <section id="3">
        <Slider {...settings}   style={{
        width: '50%', 
        margin: 'auto', 
        height: '250px',
        marginTop:'200px' 
    }}>
    {data.map((d, index) => (
        <div key={index} >
            <img src={d.img} alt={`Slide ${index}`} />
        </div>
    ))}
</Slider>
</section>
              <Footer/>
            </div>
    );
}

export default Home;
