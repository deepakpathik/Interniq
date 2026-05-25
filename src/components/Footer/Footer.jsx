import React from 'react';
import './Footer.css';

const Instagram = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Twitter = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Youtube = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;
const Linkedin = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;

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
