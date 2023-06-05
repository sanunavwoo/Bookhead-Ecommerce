import "./FooterComponent.css";

export function FooterComponent(){
    return(
        
<footer>
                <h1>bookHead</h1>
                <h2>Come in, and lose yourself in a book</h2>
                <div className="footer-div">
                    <section className="about-bookhead-section">
                            
                            <p>About Us</p>
                            <p>Careers</p>
                            <p>Privacy</p>
                    </section>
                    <section className="social-links-section">
                        
                            
                        <p><a className= "links" href="https://www.linkedin.com/in/sanunavo-dey" target="_blank">LinkedIn</a></p>
                        <p><a className= "links" href="https://www.instagram.com/sanunavodey_/?hl=en" target="_blank">Instagram</a></p>    
                        <p><a className= "links" href="https://github.com/sanunavwoo" target="_blank">Github</a></p>
                            
                    </section>
                </div>    
                
</footer>
    );
}