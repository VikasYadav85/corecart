import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    fetch('http://159.223.107.48/IIT/public/api/team-list')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.data.map((user) => ({
          name: user.title,
          image: `http://159.223.107.48/IIT/public/images/about_us/${user.image}`,
          position: user.discription,
        }));
        setTeamMembers(formattedData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <>
      {/* Background Section with overlay */}
      <div
        style={{
          position: 'relative',
          backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')`, // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          color: 'white',
          textAlign: 'center',
        }}
      >
        {/* Dark overlay for readability */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1,
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '700px' }}>
          <h1 className="fw-bold" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            About Us
          </h1>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
            We are a dedicated team of professionals working to simplify GST processes
            for businesses. Our team consists of talented individuals with expertise in
            technology, design, and marketing, aiming to deliver the best experience.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="container my-5">
        <div className="row justify-content-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-8 col-10 text-center mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-circle img-fluid mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <h3 className="text-dark">{member.name}</h3>
              <p className="text-muted">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
