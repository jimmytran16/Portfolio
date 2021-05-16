module.exports = {
    subPage: {
        '1': {
            description: "Worked as a contracted Full Stack Web Developer for the Environmental League of Massachusetts. This is a website that includes a search engine to find your local state legislators based on your address. This tool will allow you to make better judgement on who to vote for on your 2020 ballot based on the potential endorsements of 5 different environmental advocacy organizations. Based on the endorsements of the candidates (House Representative and Senate), you can determine which candidate aligns and supports enviromental laws and can choose who to vote for.",
            name: "Green Voter Guide MA",
            sub_headline: 'A congressional voters guide tool',
            image_path: '/images/gvg.png',
            design_path: '/images/gvgdesign.jpg',
            giphy_path:'/images/greenvotergif.gif',
            tech: [
                'HMTL5/CSS3',
                'Javascript',
                'Python/Django',
                'MySQL',
                'USGeocoder API',
                'Google Places API',
                'Heroku',
                'Digital Ocean'
            ],
            website: 'https://www.greenvoterguidema.com',
            repo: ''
        },
        '2': {
            description: "A fully responsive nail salon website made for a local small business. This website includes a landing page, contacts page, services page, and a google's reviews section. Integrated the JavaMail API to implement a Simple Mail Transfers Protocol (SMTP) to send out appoinment forms submitted by customers to the business email.",
            name: "Designer Nail Salon",
            sub_headline: 'A local nail salon web application',
            image_path: '/images/dns1.JPG',
            design_path: '',
            giphy_path:'/images/designergif.gif',
            tech: [
                'HTML5,CSS3',
                'Bootstrap',
                'Java Servlets',
                'Apache Tomcat',
                'Apache Maven',
                'JavaMail API',
                'Heroku'                             
            ],
            website: 'https://www.designernailsalon.com',
            repo: 'https://github.com/jimmytran16/designer-nail-salon'
        },
        '3': {
            description: "A social media full stack application which includes features such as register/login, posting tweets, and interacting with user’s tweets. Implemented a RESTful API using Express as a backend framework, and using JWT (Json Web Tokens) for stateless authentication. Technologies: React.js, Node.js/Express, MongoDB, Firebase Cloud Storage, Netlify (to host client), Heroku (to host server).",
            name: "Tweetir",
            sub_headline: 'A twitter clone',
            image_path: '/images/twitterclone.png',
            design_path: '/images/tweetirdesign.png',
            giphy_path:'/images/twitterclone6.png',
            tech: [
                'React.js',
                'Node/Express.js',
                'Firebase Cloud Storage',
                'MongoDB',
                'Heroku',               
                'Netlify',               
            ],
            website: 'https://tweetir.netlify.app/',
            repo: 'https://github.com/jimmytran16/twitter-clone'
        },
        '4': {
            description: "A full stack application made with React.js, Chart.js, Node.js/Express, and MongoDB. Used Netlify and Heroku for deployment. This website contains a survey which prompts participants to choose which programming language they most prefer, and will show a count in visual graphs of the overall votes in real time. This was my first full stack application implementing the MERN stack.",
            name: "Best Programming Language",
            sub_headline: 'Survey for most popular programming lanuage',
            image_path: '/images/bestprojlang.png',
            design_path: '/images/bestproglangdesign.png',
            giphy_path:'/images/bestprojlang.gif',
            tech: [
                'React.js',
                'Node/Express.js',
                'Chart.js',
                'MongoDB',
                'Heroku',               
                'Netlify',               
            ],
            website: 'https://programming-survey.netlify.app/',
            repo: 'https://github.com/jimmytran16/Programming-Survey'
        },
        '5': {
            description: "A RESTful API used to automate appointment confirmations",
            name: "Designer's Confirmation API",
            sub_headline: 'RESTful API for appointment confirmations',
            image_path: '/images/confirmapidesign.png',
            design_path: '/images/confirmapidesign.png',
            giphy_path:'/images/confirmapi_gif.gif',
            tech: [
                'Python/Flask',
                'Twilio',              
                'Heroku'               
            ],
            website:'https://www.designernailsalon.com/bookings',
            repo:'https://github.com/jimmytran16/DNSConfirmationAPI'
        },
        '6': {
            description: "Created a web scraper using Python and BeautifulSoup to extract COVID-19 data of all 50 states. I then decided to integrate that into a web application. This tool will send you real-time data on all 50 states in the United States in table format. Data includes total cases, new cases, total deaths, and new deaths.",
            name: "COVID-19 Tracker",
            sub_headline: 'A COVID-19 tracking tool',
            image_path: '/images/covid.png',
            design_path: '/images/coviddesign.jpg',
            giphy_path:'/images/covidgif.gif',
            tech: [
                'HTML5,CSS3',
                'Javascript',
                'Python/Flask',
                'BeautifulSoup',
                'AWS Elastic Beanstalk',                             
            ],
            website:'https://send-covid-data.herokuapp.com/',
            repo:'https://github.com/jimmytran16/send-covid-data-website'
        }
    },
    indexPage: [
        {
            name: "Green Voter Guide MA",
            image_path: '/images/gvg.png',
            description: 'A congressional voters guide tool',
            endpoint: '/project/1'
        },
        {
            name: "Designer Confirmation API",
            image_path: '/images/confirmapidesign.png',
            description: 'RESTful API for appointment confirmations',
            endpoint: '/project/5'
        },
        {
            name: "COVID-19 Tracker",
            image_path: '/images/covid.png',
            description: 'A COVID-19 tracking tool',
            endpoint: '/project/6'
        },
        {
            name: "Designer Nail Salon",
            image_path: '/images/dns1.JPG',
            description: 'A local nail salon web application',
            endpoint: '/project/2'
        },
        {
            name: "Tweetir",
            image_path: '/images/twitterclone.png',
            description: 'A twitter clone',
            endpoint: '/project/3'
        },
        {
            name: "Best Programming Language",
            image_path: '/images/bestprojlang.png',
            description: 'Survey for most popular programming lanuage',
            endpoint: '/project/4'
        },
    ]
}