import githubIcon from '../assets/github_white_icon.svg';

export default function Footer() {
  return (
    <footer className="w-full bg-black/50 backdrop-blur-[3px] border-t border-gray-800/50 py-12 mt-20">
      <div className="boundingBox mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0">
          
          <div className="flex flex-col items-center lg:items-start space-y-4">
            <div className="font-viga text-3xl text-white font-bold tracking-wider">
              EH
            </div>
            <p className="text-gray-400 text-sm max-w-xs text-center lg:text-left leading-relaxed">
              I hope you enjoyed your visit! If you have any questions or want to get in touch, feel free to reach out.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end space-y-4">
            <h3 className="text-white font-medium text-lg tracking-wide">Contact</h3>
            <div className="flex items-center space-x-4">
              <a 
                href="https://github.com/agedfinewine" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center transition-all duration-200 group"
              >
                <img src={githubIcon} alt="GitHub" className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              </a>
              <a 
                href="mailto:eh4359@rit.edu"
                className="w-8 h-8 flex items-center justify-center transition-all duration-200 group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center transition-all duration-200 group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; 2025 - All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
