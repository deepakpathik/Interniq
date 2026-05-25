import React from 'react';
import { Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="is-footer">
      <div className="is-footer-container">
        <div className="is-footer-links-grid">
          {/* Column 1 */}
          <div className="is-footer-col">
            <h4 className="is-footer-heading">Internships by places</h4>
            <a href="#" className="is-footer-link">Internship in India</a>
            <a href="#" className="is-footer-link">Internship in Delhi</a>
            <a href="#" className="is-footer-link">Internship in Bangalore</a>
            <a href="#" className="is-footer-link">Internship in Hyderabad</a>
            <a href="#" className="is-footer-link">Internship in Mumbai</a>
            <a href="#" className="is-footer-link">Internship in Chennai</a>
            <a href="#" className="is-footer-link">Internship in Gurgaon</a>
            <a href="#" className="is-footer-link">Internship in Kolkata</a>
          </div>

          {/* Column 2 */}
          <div className="is-footer-col">
            <h4 className="is-footer-heading">Internship by Stream</h4>
            <a href="#" className="is-footer-link">Computer Science Internship</a>
            <a href="#" className="is-footer-link">Electronics Internship</a>
            <a href="#" className="is-footer-link">Mechanical Internship</a>
            <a href="#" className="is-footer-link">Civil Internship</a>
            <a href="#" className="is-footer-link">Marketing Internship</a>
            <a href="#" className="is-footer-link">Chemical Internship</a>
            <a href="#" className="is-footer-link">Finance Internship</a>
            <a href="#" className="is-footer-link">Summer Research Fellowship</a>
          </div>

          {/* Column 3 */}
          <div className="is-footer-col">
            <h4 className="is-footer-heading">
              Online Trainings <span className="is-footer-badge">OFFER</span>
            </h4>
            <a href="#" className="is-footer-link">Programming with Python</a>
            <a href="#" className="is-footer-link">Digital Marketing</a>
            <a href="#" className="is-footer-link">Web Development</a>
            <a href="#" className="is-footer-link">Machine Learning</a>
            <a href="#" className="is-footer-link">Advanced Excel</a>
            <a href="#" className="is-footer-link">Ethical Hacking</a>
            <a href="#" className="is-footer-link">AutoCAD</a>
            <a href="#" className="is-footer-link">Creative Writing</a>
          </div>

          {/* Column 4 */}
          <div className="is-footer-col">
            <h4 className="is-footer-heading">About Internshala</h4>
            <a href="#" className="is-footer-link">About us</a>
            <a href="#" className="is-footer-link">We're hiring</a>
            <a href="#" className="is-footer-link">Hire interns for your company</a>
            <a href="#" className="is-footer-link">Team Diary</a>
            <a href="#" className="is-footer-link">Blog</a>
            <a href="#" className="is-footer-link">Our Services</a>
            <a href="#" className="is-footer-link">Terms & Conditions</a>
            <a href="#" className="is-footer-link">Privacy</a>
            <a href="#" className="is-footer-link">Contact us</a>
          </div>
        </div>

        <div className="is-footer-bottom">
          <div className="is-footer-bottom-left">
            <a href="#" className="is-app-store-btn">
              <img src="/google_play_store.png" alt="Get it on Google Play" onError={(e) => e.target.style.display = 'none'} />
              <span>Get it on Google Play</span>
            </a>
            <a href="#" className="is-app-store-btn">
              <img src="/apple_app_store.png" alt="Download on the App Store" onError={(e) => e.target.style.display = 'none'} />
              <span>Download on the App Store</span>
            </a>
          </div>
          <div className="is-footer-bottom-right">
            <div className="is-footer-socials">
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={18} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
            <div className="is-footer-copyright">
              © Copyright {new Date().getFullYear()} Internshala
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
