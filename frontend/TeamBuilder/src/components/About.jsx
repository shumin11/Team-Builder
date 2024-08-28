import React from 'react';

const About = () => {
  return (
    <div className="content">
      <h1>About Us</h1>
      <p>Welcome! I'm a fourth-year Bachelor of Computer Science student with a passion for web development.
        This project, the Team Builder app, represents my journey into the world of software development.</p>
      <p>The Team Builder app is designed to streamline the process of managing team members in any project.
        Whether you're leading a student project, managing a community group, or running a small business, this tool will help you:</p>
      <ul>
        <li><strong>Add Members:</strong> Easily add members to your team with a user-friendly interface.</li>
        <li><strong>Remove Members:</strong> Remove members when they are no longer part of the team.</li>
        <li><strong>View Team:</strong> Get a quick overview of all the current members of your team.</li>
        <li><strong>Clear Form:</strong> Reset the input form with one click to start adding new members.</li>
      </ul>
      <p>This application was created as my first assignment for a course in Web Development.
        It aims to demonstrate fundamental web development skills including HTML, CSS, and JavaScript.</p>
      <p>Thank you for visiting the Team Builder app. I hope you enjoy using it as much as I enjoyed creating it!</p>
      <img
        src="https://images.unsplash.com/photo-1608389168343-ba8aa0cb3a63?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Thank You"
        style={{ width: '50%', height: 'auto', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      />
    </div>
  );
};

export default About;