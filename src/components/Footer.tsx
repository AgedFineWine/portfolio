import githubIcon from "../assets/github_white_icon.svg";

export default function Footer() {
  return (
    <footer className="mt-35 w-full border-t border-gray-800/50 bg-black/50 py-12 backdrop-blur-[3px]">
      <div className="boundingBox mx-auto px-6">
        <div className="flex flex-col items-center justify-between space-y-8 lg:flex-row lg:space-y-0">
          <div className="flex flex-col items-center space-y-4 lg:items-start">
            <div className="font-viga text-3xl font-bold tracking-wider text-white">
              EH
            </div>
            <p className="max-w-xs text-center text-sm leading-relaxed text-gray-400 lg:text-left">
              I hope you enjoyed your visit! If you have any questions or want
              to get in touch, feel free to reach out. 💛
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 lg:items-end">
            <h3 className="text-lg font-medium tracking-wide text-white">
              Contact
            </h3>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/agedfinewine"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-8 w-8 items-center justify-center transition-all duration-200"
              >
                <img
                  src={githubIcon}
                  alt="GitHub"
                  className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                />
              </a>
              <a
                href="mailto:eh4359@rit.edu"
                className="group flex h-8 w-8 items-center justify-center transition-all duration-200"
              >
                <svg
                  className="h-4 w-4 text-gray-400 transition-colors duration-200 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-8 w-8 items-center justify-center transition-all duration-200"
              >
                <svg
                  className="h-4 w-4 text-gray-400 transition-colors duration-200 group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
            <p className="text-sm text-gray-500">
              &copy; 2025 - All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
