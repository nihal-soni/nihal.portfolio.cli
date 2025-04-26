#!/usr/bin/env node

import chalk from "chalk"
import boxen from "boxen";
import gradient from "gradient-string";
import inquirer from "inquirer"
import ora from "ora";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
};

const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
};

const portfolio = {
  name: 'NIHAL SONI',
  role: 'Full Stack Developer | Open Source Contributor | Tech Enthusiast',
  status: '🚀 Open to Collaborations 🚀',
  location: '📍 Satna, Madhya Pradesh, India',
  time: getCurrentTime(),
  date: getCurrentDate(),
  skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'MongoDB', 'Next.js'],
  projects: [
    { name: 'Portfolio Website', description: 'Personal website built with React and Next.js' },
    { name: 'Open Source Contributions', description: 'Contributed to multiple GitHub repositories' }
  ],
  social: {
    github: '🔗 https://github.com/nihal-soni',
    linkedin: '💼 https://linkedin.com/in/nihalsoni23',
    twitter: '🐦 https://twitter.com/nihaldevv'
  }
};

const animateText = async (text, delay = 50) => {
  for (const char of text) {
    process.stdout.write(char);
    await sleep(delay);
  }
  process.stdout.write('\n');
};

const displayHeader = async () => {
  const spinner = ora('Loading your CLI Portfolio...').start();
  await sleep(2000);
  spinner.stop();

  const header = gradient.pastel(`
 _   _ _ _           _                   _ 
| \\ | (_) |         | |                 (_)
|  \\| |_| |__   __ _| |  ___  ___  _ __  _ 
| . \` | | '_ \\ / _\` | | / __|/ _ \\| '_ \\| |
| |\\  | | | | | (_| | | \\__ \\ (_) | | | | |
\\_| \\_/_|_| |_|\\__,_|_| |___/\\___/|_| |_|_|
                                           
`);


  console.log(header);
  await animateText(chalk.cyan('Welcome to Nihal Soni\'s CLI Portfolio! ✨'));
  await animateText(chalk.yellow(portfolio.status));
  await animateText(chalk.blue(`Current Time: ${portfolio.time}`));
  await animateText(chalk.blue(`Date: ${portfolio.date}`));
  await animateText(chalk.green(portfolio.location));
  await sleep(1000);
};

const displayInfo = async () => {
  const spinner = ora('Fetching your details...').start();
  await sleep(1500);
  spinner.stop();

  const info = boxen(
    `
${chalk.bold('Name:')} ${portfolio.name}
${chalk.bold('Role:')} ${portfolio.role}
${chalk.bold('Status:')} ${portfolio.status}
${chalk.bold('Location:')} ${portfolio.location}

${chalk.bold('Skills:')}
${portfolio.skills.map(skill => `  • ${skill}`).join('\n')}

${chalk.bold('Projects:')}
${portfolio.projects.map(p => `  • ${p.name}: ${p.description}`).join('\n')}

${chalk.bold('Social:')}
  • GitHub: ${portfolio.social.github}
  • LinkedIn: ${portfolio.social.linkedin}
  • Twitter: ${portfolio.social.twitter}
`,
    { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan' }
  );

  await animateText(info, 10);
};

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Choose an option:',
      choices: [
        'View Full Profile',
        'Skills',
        'Projects',
        'Social Links',
        'Current Time & Location',
        'Exit'
      ]
    }
  ]);

  const spinner = ora('Processing...').start();
  await sleep(1000);
  spinner.stop();

  switch (action) {
    case 'View Full Profile':
      await displayInfo();
      break;
    case 'Skills':
      console.log(boxen(
        portfolio.skills.map(skill => `  • ${skill}`).join('\n'),
        { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'green' }
      ));
      break;
    case 'Projects':
      console.log(boxen(
        portfolio.projects.map(p => `  • ${p.name}: ${p.description}`).join('\n'),
        { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'yellow' }
      ));
      break;
    case 'Social Links':
      console.log(boxen(
        `
${chalk.bold('GitHub:')} ${portfolio.social.github}
${chalk.bold('LinkedIn:')} ${portfolio.social.linkedin}
${chalk.bold('Twitter:')} ${portfolio.social.twitter}
`,
        { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'blue' }
      ));
      break;
    case 'Current Time & Location':
      console.log(boxen(
        `
${chalk.bold('Time:')} ${getCurrentTime()}
${chalk.bold('Date:')} ${getCurrentDate()}
${chalk.bold('Location:')} ${portfolio.location}
`,
        { padding: 1, margin: 1, borderStyle: 'round', borderColor: 'cyan' }
      ));
      break;
    case 'Exit':
      console.log(chalk.green('Thank you for visiting! 👋'));
      process.exit(0);
  }

  const { continueBrowsing } = await inquirer.prompt([
    { type: 'confirm', name: 'continueBrowsing', message: 'Want to continue?', default: true }
  ]);

  if (continueBrowsing) {
    await mainMenu();
  } else {
    console.log(chalk.green('Bye! Have a great day 🚀'));
    process.exit(0);
  }
};

const start = async () => {
  await displayHeader();
  await mainMenu();
};

start();

