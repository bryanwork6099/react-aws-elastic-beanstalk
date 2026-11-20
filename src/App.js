
import './App.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="brand">
            <span className="brand-icon">☁</span>
            Cloud Deployment
          </div>
          <span className="nav-status">
            <span className="status-dot"></span>
            Application Online
          </span>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <span className="eyebrow">AWS CLOUD DEPLOYMENT PROJECT</span>

            <h1>
              Welcome to My
              <span> Cloud Application.</span>
            </h1>

            <p className="hero-description">
              A React web application deployed on AWS Elastic Beanstalk,
              powered by Node.js and Express.js.
            </p>

            <div className="hero-buttons">
              <a href="#technologies" className="primary-button">
                Explore Technologies →
              </a>
              <span className="deployment-label">
                Deployed on AWS
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="cloud-icon">☁</div>
            <div className="visual-caption">
              <span className="status-dot"></span>
              Successfully Deployed
            </div>
          </div>
        </section>

        <section className="content-section" id="technologies">
          <div className="section-heading">
            <span className="eyebrow">TECHNOLOGY STACK</span>
            <h2>Built with Modern Technologies</h2>
            <p>
              This application combines frontend and backend technologies
              with AWS cloud infrastructure.
            </p>
          </div>

          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon react-icon">⚛</div>
              <h3>React.js</h3>
              <p>
                Builds the interactive and responsive user interface
                of the application.
              </p>
              <span className="tech-category">Frontend</span>
            </div>

            <div className="tech-card">
              <div className="tech-icon node-icon">JS</div>
              <h3>Node.js</h3>
              <p>
                Provides the JavaScript runtime environment for
                the application.
              </p>
              <span className="tech-category">Runtime</span>
            </div>

            <div className="tech-card">
              <div className="tech-icon express-icon">EX</div>
              <h3>Express.js</h3>
              <p>
                Serves the React production files through a
                lightweight web server.
              </p>
              <span className="tech-category">Backend</span>
            </div>

            <div className="tech-card">
              <div className="tech-icon aws-icon">☁</div>
              <h3>AWS Elastic Beanstalk</h3>
              <p>
                Manages application deployment and hosting
                on AWS infrastructure.
              </p>
              <span className="tech-category">Cloud Hosting</span>
            </div>
          </div>
        </section>

        <section className="deployment-section">
          <div className="deployment-card">
            <div>
              <span className="eyebrow">DEPLOYMENT INFORMATION</span>
              <h2>Hosted on AWS Cloud</h2>
              <p>
                The application is deployed using AWS Elastic Beanstalk
                on an Amazon EC2 instance.
              </p>
            </div>

            <div className="deployment-details">
              <div className="detail-row">
                <span>Cloud Platform</span>
                <strong>Amazon Web Services</strong>
              </div>
              <div className="detail-row">
                <span>Deployment Service</span>
                <strong>Elastic Beanstalk</strong>
              </div>
              <div className="detail-row">
                <span>Application Server</span>
                <strong>Node.js / Express.js</strong>
              </div>
              <div className="detail-row">
                <span>Frontend</span>
                <strong>React.js</strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Designed & Developed by <strong>Bryan Lim</strong>
        </p>
        <span>React.js · Node.js · AWS Elastic Beanstalk</span>
      </footer>
    </div>
  );
}

export default App;
