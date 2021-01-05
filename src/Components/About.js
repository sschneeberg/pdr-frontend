import React from 'react';

function About() {
    return (
        <div className="about">
            <h1 style={{textAlign: "center"}}>About Us</h1>
            <section className="container">
                <div className="container-about">
                <div className="left-half">
                    <article>
                    <h1>Left Half</h1>
                    <p>Weekends don't count unless you spend them doing something completely pointless.</p>
                    </article>
                </div>
                <div className="right-half">
                    <article>
                    <h1 style={{textAlign: "right"}}>Right Half</h1>
                    <p>If your knees aren't green by the end of the day, you ought to seriously re-examine your life.</p>
                    </article>
                </div>
                </div>
            </section>
        </div>
    );
}

export default About;
 