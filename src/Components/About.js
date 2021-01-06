import React from 'react';
import edrees from './imgs/edreesbug.jpg'
import simone from './imgs/simonebug.jpg'
import nicole from './imgs/nikkibug.jpg'
import jax from './imgs/jaxbug.jpg'
import sidePic from './imgs/aboutuspic.jpeg'

function About() {
    return (
        <div className="about">
            <h1 className="about-us">About Us</h1>
            <section className="container">
                <div className="container-about">
                <div className="left-half">
                    <article>
                    <h1 style={{fontFamily: "bebas-neue"}}>Pest Damage Report</h1>
                    <br></br>
                    <p style={{fontFamily: "Helvetica"}}>The PDR (Pest Damage report) is a tool to not only keep track of reported bugs and promote team management, but it allows web developers to get bug reports from their users. Supply your website with our provided link.</p>
                   
                    <div className="codeblock"><code style={{color: "black"}}>code link thing goes here</code></div>
                    <br></br>
                    <p style={{fontFamily: "Helvetica"}}>After you have added the link, your userbase will be able to report a "pest" and that will be immediately submitted to the company admins. From there, admins can assign bug tickets to their developers. If your user wishes to "track the pests" that they have submitted, they will be able to do so. Developers can comment on bugs for clarification from the user, and once the ticket is done, they will be notified!</p>
                    <p style={{fontFamily: "Helvetica"}}>A strong relationship with the user creates good bug reports and a better user-optimized product!. </p>
                    
                    </article>
                </div>
                <img src={sidePic} style={{float: "right", maxHeight: "520px", borderRadius: "3%", border: "rgb(106,163,180, 0.6) solid 10px"}}/>
                <div className="right-half">
                    <article>
                    <h1 style={{textAlign: "center", fontFamily: "bebas-neue"}}>Meet the Orcas</h1>
                    <div className="orca-lineup">
                    <div className="edrees-img">
                    <img src={edrees} id="orcas"/>
                    <p className="orca-names" >Edrees Husseini</p>
                    <p className="orca-jobs">Front-End Developer<br></br>Stylistic Mastermind</p>
                    </div>
                    <div className="simone-img">
                    <img src={simone} id="orcas"/>
                    <p className="orca-names"> Simone Schneeberg</p>
                    <p className="orca-jobs">Fullstack Developer / Project Manager <br></br>Socket Whiz</p>
                    </div>
                    <div className="jax-img">
                    <img src={jax} id="orcas"/>
                    <p className="orca-names">Jaxon Narramore</p>
                    <p className="orca-jobs">Fullstack Developer (Front-End Team)<br></br>Drag & Drop Machine</p>
                    </div>
                    <div className="nicole-img">
                    <img src={nicole} id="orcas"/>
                    <p className="orca-names">Nicole Hamilton</p>
                    <p className="orca-jobs">Fullstack Developer (Back-End Team)<br></br>Database Dweller</p>
                    </div>
                    </div>
                    </article>
                </div>
                </div>
            </section>
        </div>
    );
}

export default About;
 