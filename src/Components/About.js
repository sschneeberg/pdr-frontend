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
            
                <div className="container">

                <div className="about-section">
                    <div className="left-half">
                        <article>
                        <h1 style={{fontFamily: "bebas-neue"}}>Pest Damage Report</h1>
                        <br></br>
                        <p style={{fontFamily: "Helvetica"}}>The PDR (Pest Damage report) is a tool to not only keep track of reported bugs and promote team management, but it allows web developers to get bug reports from their users. Supply your website with our provided link.</p>
                       
                        <div className="codeblock"><code style={{color: "black"}}>&lt;a href='https://pestdamagereport.herokuapp.com/'&gt;&lt;/a&gt;</code></div>
                        <br></br>
                        <p style={{fontFamily: "Helvetica"}}>After you have added the link, your userbase will be able to report a "pest" and that will be immediately submitted to the company admins. From there, admins can assign bug tickets to their developers. If your user wishes to "track the pests" that they have submitted, they will be able to do so. Developers can comment on bugs for clarification from the user, and once the ticket is done, they will be notified!</p>
                        <p style={{fontFamily: "Helvetica"}}>A strong relationship with the user creates good bug reports and a better user-optimized product!. </p>
                        
                        </article>
                    </div>
                    <img src={sidePic} style={{maxHeight: "520px", borderRadius: "3%", border: "rgb(106,163,180, 0.6) solid 10px"}}/>
                </div>
                <div className="right-half">
                    <article>
                    <h1 style={{textAlign: "center", fontFamily: "bebas-neue"}}>Meet the Orcas</h1>
                    <div className="orca-lineup">
                    <div className="edrees-img">
                    <img src={edrees} id="orcas"/>
                    <p className="orca-names" >Edrees Husseini</p>
                    <p className="orca-jobs">Front-End Developer<br></br>Stylistic Mastermind</p>
                    <a href="https://github.com/edgerees" target="_blank" rel="noreferrer" className="gitIcon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg></a>
                    </div>
                    <div className="simone-img">
                    <img src={simone} id="orcas"/>
                    <p className="orca-names"> Simone Schneeberg</p>
                    <p className="orca-jobs">Fullstack Developer / Project Manager <br></br>Socket Whiz</p>
                    <a href="https://github.com/sschneeberg" target="_blank" rel="noreferrer"className="gitIcon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg></a>
                    </div>
                    <div className="jax-img">
                    <img src={jax} id="orcas"/>
                    <p className="orca-names">Jaxon Narramore</p>
                    <p className="orca-jobs">Fullstack Developer (Front-End Team)<br></br>Drag & Drop Machine</p>
                    <a href="https://github.com/JaxonNarramore" target="_blank" rel="noreferrer" className="gitIcon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg></a>
                    </div>
                    <div className="nicole-img">
                    <img src={nicole} id="orcas"/>
                    <p className="orca-names">Nicole Hamilton</p>
                    <p className="orca-jobs">Fullstack Developer (Back-End Team)<br></br>Database Dweller</p>
                    <a href="https://github.com/NikkiHmltn" target="_blank" rel="noreferrer" className="gitIcon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16" >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg></a>
                    </div>
                    </div>
                    </article>
                </div>
                </div>
          
        </div>
    );
}

export default About;
 
